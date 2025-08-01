import {
  createPublicClient,
  createWalletClient,
  formatUnits,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
  type IAgentRuntime,
  type Provider,
  type Memory,
  type State,
  elizaLogger,
} from "@elizaos/core";
import type {
  Address,
  WalletClient,
  PublicClient,
  Chain,
  HttpTransport,
  Account,
  PrivateKeyAccount,
  TestClient,
} from "viem";
import * as viemChains from "viem/chains";
import NodeCache from "node-cache";
import * as path from "node:path";

import type { ChainWithName } from "../types";

export const seiChains = {
  mainnet: viemChains.sei,
  testnet: viemChains.seiTestnet,
  devnet: viemChains.seiDevnet,
};

export class WalletProvider {
  private cache: NodeCache;
  // private cacheKey: string = "evm/wallet";
  private cacheKey = "evm/wallet"; // Remove explicit type annotation
  private currentChain!: ChainWithName;
  private CACHE_EXPIRY_SEC = 5;
  account!: PrivateKeyAccount;

  constructor(
    accountOrPrivateKey: PrivateKeyAccount | `0x${string}`,
    chain: ChainWithName
  ) {
    this.setAccount(accountOrPrivateKey);

    this.setCurrentChain(chain);

    this.cache = new NodeCache({ stdTTL: this.CACHE_EXPIRY_SEC });
  }

  getAddress(): Address {
    return this.account.address;
  }

  getCurrentChain(): ChainWithName {
    return this.currentChain;
  }

  getPublicClient(): PublicClient<HttpTransport, Chain, Account | undefined> {
    const transport = this.createHttpTransport();

    const publicClient = createPublicClient({
      chain: this.currentChain.chain,
      transport,
    });

    return publicClient;
  }

  getEvmWalletClient(): WalletClient {
    const transport = this.createHttpTransport();

    const walletClient = createWalletClient({
      chain: this.currentChain.chain,
      transport,
      account: this.account,
    });

    return walletClient;
  }

  getEvmPublicClient(): PublicClient<HttpTransport, Chain> {
    const transport = this.createHttpTransport();

    const publicClient = createPublicClient({
      chain: this.currentChain.chain,
      transport: transport,
    });

    return publicClient;
  }

  async getWalletBalance(): Promise<string | null> {
    const cacheKey = `seiWalletBalance_${this.currentChain.name}`; // Fix: Use template literal
    const cachedData = await this.getCachedData<string>(cacheKey);
    if (cachedData) {
      elizaLogger.log(
        `Returning cached wallet balance for sei chain: ${this.currentChain.name}` // Fix: Use template literal
      );
      return cachedData;
    }

    try {
      const client = this.getPublicClient();
      const balance = await client.getBalance({
        address: this.account.address,
      });
      const balanceFormatted = formatUnits(balance, 18);
      this.setCachedData<string>(cacheKey, balanceFormatted);
      elizaLogger.log(
        "Wallet balance cached for chain: ",
        this.currentChain.name
      );
      return balanceFormatted;
    } catch (error) {
      console.error("Error getting wallet balance:", error);
      return null;
    }
  }

  private async readFromCache<T>(key: string): Promise<T | null> {
    // Using in-memory cache only
    const cached = this.cache.get<T>(key);
    return cached || null;
  }

  // private async readFromCache<T>(key: string): Promise<T | null> {
  //     const cached = await this.cacheManager.get<T>(
  //         path.join(this.cacheKey, key)
  //     );
  //     return cached;
  // }

  private async writeToCache<T>(key: string, data: T): Promise<void> {
    // Using in-memory cache only
    this.cache.set(key, data);
  }

  private async getCachedData<T>(key: string): Promise<T | null> {
    // Only use in-memory cache
    const cachedData = this.cache.get<T>(key);
    return cachedData || null;
  }

  private async setCachedData<T>(cacheKey: string, data: T): Promise<void> {
    // Only set in-memory cache
    this.cache.set(cacheKey, data);
  }

  private setAccount = (
    accountOrPrivateKey: PrivateKeyAccount | `0x${string}`
  ) => {
    if (typeof accountOrPrivateKey === "string") {
      this.account = privateKeyToAccount(accountOrPrivateKey);
    } else {
      this.account = accountOrPrivateKey;
    }
  };

  private setCurrentChain = (chain: ChainWithName) => {
    this.currentChain = chain;
  };

  private createHttpTransport = (): HttpTransport => {
    const chain = this.currentChain.chain;

    if (chain.rpcUrls.custom) {
      return http(chain.rpcUrls.custom.http[0]);
    }
    return http(chain.rpcUrls.default.http[0]);
  };

  static genSeiChainFromName(
    chainName: string,
    customRpcUrl?: string | null
  ): Chain {
    if (!Object.prototype.hasOwnProperty.call(seiChains, chainName)) {
      throw new Error(`Invalid chain name: ${chainName}`);
    }
    const baseChain = seiChains[chainName as keyof typeof seiChains];

    if (!baseChain?.id) {
      throw new Error("Invalid chain name");
    }

    const seiChain: Chain = customRpcUrl
      ? {
          ...baseChain,
          rpcUrls: {
            ...baseChain.rpcUrls,
            custom: {
              http: [customRpcUrl],
            },
          },
          blockExplorers:
            baseChain.blockExplorers ??
            ({
              default: {
                name: "Seitrace",
                url: "https://seitrace.com",
                apiUrl: "https://seitrace.com/pacific-1/api",
              },
            } as const),
          contracts: baseChain.contracts,
        }
      : baseChain;

    return seiChain;
  }
}
const genChainFromRuntime = (runtime: IAgentRuntime): ChainWithName => {
  const sei_network = runtime.getSetting("SEI_NETWORK");
  if (typeof sei_network !== "string") {
    // Fix: Ensure sei_network is a string
    throw new Error("SEI_NETWORK must be a string");
  }

  const validChains = Object.keys(seiChains);
  if (!validChains.includes(sei_network)) {
    throw new Error(
      `Invalid SEI_NETWORK ${sei_network}. Must be one of ${validChains.join(", ")}`
    );
  }
  if (!Object.prototype.hasOwnProperty.call(seiChains, sei_network)) {
    throw new Error(`Invalid SEI_NETWORK: ${sei_network}`);
  }
  let chain = seiChains[sei_network as keyof typeof seiChains];
  const rpcurl = runtime.getSetting("SEI_RPC_URL");
  if (typeof rpcurl === "string") {
    // Fix: Ensure rpcurl is a string
    chain = WalletProvider.genSeiChainFromName(sei_network, rpcurl);
  }

  return { name: sei_network, chain: chain }; // Fix: Ensure name is always a string
};

// const genChainFromRuntime = (
//     runtime: IAgentRuntime
// ): ChainWithName => {
//     const sei_network = runtime.getSetting("SEI_NETWORK");
//     const validChains = Object.keys(seiChains)
//     if (!validChains.includes(sei_network)) {
//         // throw new Error("Invalid SEI_NETWORK " + sei_network + " Must be one of " + validChains.join(", "));
//         throw new Error(`Invalid SEI_NETWORK ${sei_network}. Must be one of ${validChains.join(", ")}`);
//     }

//     let chain = seiChains[sei_network]
//     const rpcurl = runtime.getSetting("SEI_RPC_URL");
//     if (rpcurl) {
//         chain = WalletProvider.genSeiChainFromName(
//             sei_network,
//             rpcurl
//         );
//     }

//     return {name: sei_network, chain: chain};
// };

export const initWalletProvider = async (runtime: IAgentRuntime) => {
  const chainData = genChainFromRuntime(runtime);
  const privateKey = runtime.getSetting("SEI_PRIVATE_KEY") as `0x${string}`;
  if (!privateKey) {
    throw new Error("SEI_PRIVATE_KEY is missing");
  }
  return new WalletProvider(privateKey, chainData);
};

export function validateWalletQuery(
  _runtime: IAgentRuntime,
  message: Memory
): boolean {
  const text = message.content?.text?.toLowerCase() || "";
  elizaLogger.log("[Sei Wallet Provider] Validate called with text:", text);
  return (
    text.includes("wallet address") ||
    text.includes("wallet balance") ||
    text.includes("my wallet") ||
    text.includes("your wallet")
  );
}

export const evmWalletProvider: Provider = {
  name: "seiWalletProvider",
  description: "Provides Sei wallet information including address and balance",
  async get(runtime: IAgentRuntime, _message: Memory, state: State) {
    try {
      elizaLogger.log("[Sei Wallet Provider] Initializing wallet provider...");
      const walletProvider = await initWalletProvider(runtime);
      const address = walletProvider.getAddress();
      elizaLogger.log("[Sei Wallet Provider] Got address:", address);
      const balance = await walletProvider.getWalletBalance();
      elizaLogger.log("[Sei Wallet Provider] Got balance:", balance);
      const chain = walletProvider.getCurrentChain().chain;
      const agentName = state?.agentName || "The agent";
      const text = `${agentName}'s Sei Wallet Address: ${address}\nBalance: ${balance} ${chain.nativeCurrency.symbol}\nChain ID: ${chain.id}, Name: ${chain.name}`;
      return {
        text,
        data: {
          address,
          balance,
          chainId: chain.id,
          chainName: chain.name,
        },
      };
    } catch (error) {
      elizaLogger.error("[Sei Wallet Provider] Error:", error);
      return {
        text: `Error retrieving wallet information: ${error instanceof Error ? error.message : String(error)}`,
        data: { error: error instanceof Error ? error.message : String(error) },
      };
    }
  },
};
