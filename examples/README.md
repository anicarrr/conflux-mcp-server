# Conflux MCP Server - Configuration Examples

This directory contains configuration examples and setup instructions for running the Conflux MCP Server in different modes.

## 📚 **Documentation Files**

- **`cursor-config-stdio.json`** - Stdio mode configuration with environment variables
- **`cursor-config-http.json`** - HTTP mode configuration with environment variables  
- **`cursor-config-windows.json`** - Windows-specific configuration example
- **`environment-variables-guide.md`** - Comprehensive environment variables guide
- **`mcp-server-config-examples.json`** - Complete reference with all options

## 🚀 **Quick Start**

### 1. Stdio Mode (Recommended for Development)

Copy `cursor-config-stdio.json` to your project root as `.cursor-config.json`:

```bash
cp examples/cursor-config-stdio.json .cursor-config.json
```

Then edit the `cwd` path and add your `PRIVATE_KEY` if needed.

### 2. HTTP Mode (Recommended for Production)

Copy `cursor-config-http.json` to your project root as `.cursor-config.json`:

```bash
cp examples/cursor-config-http.json .cursor-config.json
```

## 🔧 **Environment Variables**

**Important**: Add your Conflux private key to enable transfer tools:

```json
"env": {
  "NODE_ENV": "development",
  "LOG_LEVEL": "debug",
  "PRIVATE_KEY": "your_actual_private_key_here"
}
```

**See `environment-variables-guide.md` for complete configuration details.**

## Configuration Options

### Stdio Mode
- **Best for**: Local development, single user, maximum performance
- **Communication**: Direct process communication via stdin/stdout
- **Setup**: Simple, just update the `cwd` path and add environment variables
- **Performance**: Fastest possible communication

### HTTP Mode
- **Best for**: Multiple clients, remote access, production deployments
- **Communication**: HTTP REST API endpoints
- **Setup**: Requires port configuration and environment variables
- **Performance**: Network overhead but more flexible

## Setup Instructions

### Prerequisites
1. Install dependencies: `bun install`
2. Build the project: `bun run build`
3. Ensure you have Node.js or Bun installed

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Environment mode |
| `LOG_LEVEL` | `info` | Logging verbosity |
| `PORT` | `3000` | HTTP server port (HTTP mode only) |
| `PRIVATE_KEY` | - | Your Conflux private key (required for transfers) |

### Log Levels
- `error`: Only error messages
- `warn`: Warnings and errors
- `info`: General information (default)
- `debug`: Verbose debugging information

## Manual Server Startup

### Stdio Mode
```bash
# Build and run
bun run build
node ./build/index.js

# Or with Bun (faster)
bun run build
bun ./build/index.js

# Or run TypeScript directly (development)
bun ./src/index.ts
```

### HTTP Mode
```bash
# Build and run
bun run build
node ./build/server/http-server.js

# Or with Bun
bun run build
bun ./build/server/http-server.js
```

## NPM Publishing (for npx usage)

**Current Status**: The package is not published to npm yet.

To enable `npx` usage:

1. Update `package.json` with proper name and version
2. Run `npm login` to authenticate
3. Run `npm publish` to publish to npm registry
4. Users can then run: `npx @your-org/conflux-mcp-server`

**Alternative**: Use local build or HTTP server mode instead.

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Build failed | Run `bun install` first, then `bun run build` |
| Path not found | Update `cwd` in config to match your actual project path |
| Permission denied | Ensure build files have execute permissions |
| Port in use | Change PORT environment variable or kill existing process |
| Private key not found | Add PRIVATE_KEY to env section and restart Cursor |

### Debug Mode
Set `LOG_LEVEL=debug` for verbose logging to help troubleshoot connection issues.

## Network Support

The server supports both Conflux networks:
- **Mainnet**: `conflux` (Chain ID: 1030)
- **Testnet**: `conflux-testnet` (Chain ID: 71)

## Available Tools

The MCP server provides 27 tools for interacting with the Conflux blockchain:

- **Network Info**: Chain info, supported networks
- **Blocks**: Latest block, block by number
- **Transactions**: Transaction details, receipts
- **Balances**: Native token and ERC20 balances
- **Tokens**: Token information, transfers, approvals
- **NFTs**: NFT operations and metadata
- **Contracts**: Read/write contract interactions
- **Transfers**: Native token and token transfers
- **Utilities**: Address derivation, gas estimation

## Examples

### Basic Usage with Private Key
```json
{
  "mcpServers": {
    "conflux-mcp-server": {
      "command": "node",
      "args": ["./build/index.js"],
      "cwd": "C:\\Users\\username\\Desktop\\conflux-mcp-server-main",
      "env": {
        "NODE_ENV": "development",
        "LOG_LEVEL": "debug",
        "PRIVATE_KEY": "your_private_key_here"
      }
    }
  }
}
```

### HTTP Mode with Custom Port
```json
{
  "mcpServers": {
    "conflux-mcp-server": {
      "command": "node",
      "args": ["./build/server/http-server.js"],
      "cwd": "C:\\Users\\username\\Desktop\\conflux-mcp-server-main",
      "env": {
        "NODE_ENV": "development",
        "LOG_LEVEL": "debug",
        "PORT": "8080",
        "PRIVATE_KEY": "your_private_key_here"
      }
    }
  }
}
```

## Security Notes

- **Never commit private keys** to version control
- **Add `.cursor-config.json` to `.gitignore`**
- **Use environment variables** for sensitive configuration
- **HTTP mode** should be secured in production environments
- **Stdio mode** is more secure for local development

## Performance Tips

- **Stdio mode** is fastest for single-user development
- **HTTP mode** is better for multiple clients
- **Use Bun** for faster builds and execution
- **Set appropriate log levels** to avoid performance overhead

## 🔐 **Environment Variables Setup**

For detailed environment variables configuration, see:
- **`environment-variables-guide.md`** - Complete guide with examples
- **`cursor-config-*.json`** - Ready-to-use configuration templates
- **Security best practices** and troubleshooting tips