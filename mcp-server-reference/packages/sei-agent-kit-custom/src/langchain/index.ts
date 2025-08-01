export * from './sei-erc20';
export * from './sei-erc721';
export * from './symphony';
export * from './dexscreener';
export * from './silo';
export * from './takara';
export * from './twitter';
export * from './citrex';

import type { SeiAgentKit } from "../agent";
import {
  CarbonCreateDisposableStrategyTool,
  CarbonCreateRecurringStrategyTool,
  CarbonCreateOverlappingStrategyTool,
  CarbonDeleteStrategyTool,
  CarbonGetUserStrategiesTool,
} from "./carbon";
import {
  SeiERC20BalanceTool,
  SeiERC20TransferTool,
  SeiERC721BalanceTool,
  SeiERC721TransferTool,
  SeiERC721MintTool,
  SeiGetTokenAddressTool,
  SeiStakeTool,
  SeiUnstakeTool,
  SeiSwapTool,
  SeiMintTakaraTool,
  SeiBorrowTakaraTool,
  SeiRepayTakaraTool,
  SeiRedeemTakaraTool,
  SeiGetRedeemableAmountTool,
  SeiGetBorrowBalanceTool,
  SeiCitrexDepositTool,
  SeiCitrexWithdrawTool,
  SeiCitrexGetProductsTool,
  SeiCitrexGetOrderBookTool,
  SeiCitrexGetAccountHealthTool,
  SeiCitrexGetTickersTool,
  SeiCitrexCalculateMarginRequirementTool,
  SeiCitrexGetKlinesTool,
  SeiCitrexGetProductTool,
  SeiCitrexGetServerTimeTool,
  SeiCitrexGetTradeHistoryTool,
  SeiCitrexCancelAndReplaceOrderTool,
  SeiCitrexCancelOpenOrdersForProductTool,
  SeiCitrexCancelOrderTool,
  SeiCitrexCancelOrdersTool,
  SeiCitrexListBalancesTool,
  SeiCitrexListOpenOrdersTool,
  SeiCitrexListPositionsTool,
  SeiCitrexPlaceOrderTool,
  SeiCitrexPlaceOrdersTool,
  SeiPostTweetTool,
  SeiGetAccountDetailsTool,
  SeiGetAccountMentionsTool,
  SeiPostTweetReplyTool,
} from './index';

import {
  SeiSupplyYeiTool,
  SeiBorrowYeiTool,
  SeiRepayYeiTool,
  SeiWithdrawYeiTool,
  SeiWrapSeiTool,
  SeiUnwrapSeiTool,
  SeiGetYeiHealthFactorTool,
} from './yei';

export function createSeiTools(seiKit: SeiAgentKit) {
  return [
    new SeiERC20BalanceTool(seiKit),
    new SeiERC20TransferTool(seiKit),
    new SeiERC721BalanceTool(seiKit),
    new SeiERC721TransferTool(seiKit),
    new SeiERC721MintTool(seiKit),
    new SeiGetTokenAddressTool(seiKit),
    new SeiStakeTool(seiKit),
    new SeiUnstakeTool(seiKit),
    new SeiSwapTool(seiKit),
    new SeiMintTakaraTool(seiKit),
    new SeiBorrowTakaraTool(seiKit),
    new SeiRepayTakaraTool(seiKit),
    new SeiRedeemTakaraTool(seiKit),
    new SeiGetRedeemableAmountTool(seiKit),
    new SeiGetBorrowBalanceTool(seiKit),
    new CarbonCreateDisposableStrategyTool(seiKit),
    new CarbonCreateRecurringStrategyTool(seiKit),
    new CarbonCreateOverlappingStrategyTool(seiKit),
    new CarbonDeleteStrategyTool(seiKit),
    new CarbonGetUserStrategiesTool(seiKit),
    new SeiPostTweetTool(seiKit),
    new SeiGetAccountDetailsTool(seiKit),
    new SeiGetAccountMentionsTool(seiKit),
    new SeiPostTweetReplyTool(seiKit),
    new SeiCitrexDepositTool(seiKit),
    new SeiCitrexWithdrawTool(seiKit),
    new SeiCitrexGetProductsTool(seiKit),
    new SeiCitrexGetOrderBookTool(seiKit),
    new SeiCitrexGetAccountHealthTool(seiKit),
    new SeiCitrexGetTickersTool(seiKit),
    new SeiCitrexCalculateMarginRequirementTool(seiKit),
    new SeiCitrexGetKlinesTool(seiKit),
    new SeiCitrexGetProductTool(seiKit),
    new SeiCitrexGetServerTimeTool(seiKit),
    new SeiCitrexGetTradeHistoryTool(seiKit),
    new SeiCitrexCancelAndReplaceOrderTool(seiKit),
    new SeiCitrexCancelOpenOrdersForProductTool(seiKit),
    new SeiCitrexCancelOrderTool(seiKit),
    new SeiCitrexCancelOrdersTool(seiKit),
    new SeiCitrexListBalancesTool(seiKit),
    new SeiCitrexListOpenOrdersTool(seiKit),
    new SeiCitrexListPositionsTool(seiKit),
    new SeiCitrexPlaceOrderTool(seiKit),
    new SeiCitrexPlaceOrdersTool(seiKit),
    new SeiSupplyYeiTool(seiKit),
    new SeiBorrowYeiTool(seiKit),
    new SeiRepayYeiTool(seiKit),
    new SeiWithdrawYeiTool(seiKit),
    new SeiWrapSeiTool(seiKit),
    new SeiUnwrapSeiTool(seiKit),
    new SeiGetYeiHealthFactorTool(seiKit),
  ];
}
