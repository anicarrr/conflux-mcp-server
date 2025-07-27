# Seiling Buidlbox - Packages

This directory contains the core packages and custom agents for Seiling Buidlbox.

## 📦 Package Overview

### Core Packages

#### 1. `n8n-nodes-sei/`
- **Status**: ✅ Available on npmjs
- **Purpose**: Custom n8n nodes for Sei blockchain integration
- **Features**: Transaction building/execution, blockchain exploration, contract deployment/compilation
- **Installation**: Available as npm package, no Docker needed
- **Usage**: Install in n8n via npm or community nodes

#### 2. `sei-mcp-server/`
- **Status**: ✅ Available as Docker image `0xn1c0/sei-mcp-server`
- **Purpose**: Model Context Protocol (MCP) server for SEI blockchain networks
- **Features**: 27 blockchain tools, multi-network support, HTTP/SSE transport
- **Deployment**: Uses pre-built Docker image
- **Configuration**: Supports STDIO and HTTP/SSE modes

#### 3. `cambrian-agent-launcher/`
- **Status**: ✅ Production ready with Docker image
- **Purpose**: Chat interface for AI assistant with Sei blockchain interaction
- **Features**: Yei Finance integration, DeFi operations, Docker support
- **Deployment**: Available as `0xn1c0/cambrian-agent-launcher:latest`
- **Port**: 3000

#### 4. `eliza-develop/`
- **Status**: ✅ Full-featured framework
- **Purpose**: Multi-agent development and deployment framework
- **Features**: Discord/Telegram/Farcaster connectors, multi-model support, modern UI
- **Deployment**: Custom build with CLI tools
- **Requirements**: Node.js 23+, bun

#### 5. `sei-agent-kit-custom/`
- **Status**: ✅ Production ready with API server
- **Purpose**: Specialized SEI Agent Kit with Yei Finance integration and built-in API
- **Features**: Complete DeFi operations, API server, Docker deployment
- **Deployment**: Available as `0xn1c0/sei-agent:latest`
- **Port**: 9000

#### 6. `seiling-buidlbox-docs/`
- **Status**: 🚧 Development needed
- **Purpose**: GitBook documentation for centralized project documentation
- **Features**: Static site generation, GitHub Pages integration
- **Deployment**: Node.js 18+, GitBook CLI
- **Port**: 4000

## 🚀 Quick Start

### Using Pre-built Docker Images

```bash
# Cambrian Agent Launcher (Chat interface)
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your_key \
  -e SEI_PRIVATE_KEY=your_key \
  0xn1c0/cambrian-agent-launcher:latest

# SEI Agent Kit (API server)
docker run -p 9000:9000 \
  --env-file .env \
  -e DISABLE_CLI=true \
  0xn1c0/sei-agent:latest

# SEI MCP Server
docker run -d -p 3333:3333 0xn1c0/sei-mcp-server:latest
```

### Environment Setup

Create a `.env` file with required variables:

```bash
# Required for all agents
OPENAI_API_KEY=your_openai_api_key
SEI_PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://evm-rpc.sei-apis.com

# Optional ports
CAMBRIAN_PORT=3000
SEI_AGENT_PORT=9000
MCP_SERVER_PORT=3333
GITBOOK_PORT=4000
```

## 🔧 Package Development

### Development Status

| Package | Status | Docker Image | Port | Purpose |
|---------|--------|--------------|------|---------|
| n8n-nodes-sei | ✅ Published | N/A | N/A | n8n blockchain nodes |
| sei-mcp-server | ✅ Ready | `0xn1c0/sei-mcp-server` | 3333 | MCP blockchain server |
| cambrian-agent-launcher | ✅ Ready | `0xn1c0/cambrian-agent-launcher` | 3000 | Chat interface |
| eliza-develop | ✅ Ready | Custom build | Various | Multi-agent framework |
| sei-agent-kit-custom | ✅ Ready | `0xn1c0/sei-agent` | 9000 | API server |
| seiling-buidlbox-docs | 🚧 Development | Custom build | 4000 | Documentation |

### Adding to Docker Compose

```yaml
# Add to your docker-compose.yml
services:
  cambrian-agent:
    image: 0xn1c0/cambrian-agent-launcher:latest
    container_name: seiling-cambrian-agent
    restart: unless-stopped
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - SEI_PRIVATE_KEY=${SEI_PRIVATE_KEY}
      - RPC_URL=${RPC_URL}
    ports:
      - "${CAMBRIAN_PORT:-3000}:3000"
    networks:
      - seiling_network

  sei-agent-api:
    image: 0xn1c0/sei-agent:latest
    container_name: seiling-sei-agent
    restart: unless-stopped
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - SEI_PRIVATE_KEY=${SEI_PRIVATE_KEY}
      - RPC_URL=${RPC_URL}
      - DISABLE_CLI=true
    ports:
      - "${SEI_AGENT_PORT:-9000}:9000"
    networks:
      - seiling_network

  sei-mcp-server:
    image: 0xn1c0/sei-mcp-server:latest
    container_name: seiling-sei-mcp-server
    restart: unless-stopped
    ports:
      - "${MCP_SERVER_PORT:-3333}:3333"
    networks:
      - seiling_network
```

## 📚 Package Documentation

### Individual Package Guides

- **[n8n-nodes-sei](./n8n-nodes-sei/README.md)** - Custom n8n nodes for Sei blockchain
- **[sei-mcp-server](./sei-mcp-server/README.md)** - MCP server with 27 blockchain tools
- **[cambrian-agent-launcher](./cambrian-agent-launcher/README.md)** - AI chat interface with Yei Finance
- **[eliza-develop](./eliza-develop/README.md)** - Multi-agent development framework
- **[sei-agent-kit-custom](./sei-agent-kit-custom/README.md)** - SEI agent kit with API server
- **[seiling-buidlbox-docs](./seiling-buidlbox-docs/README.md)** - GitBook documentation

### API Endpoints

| Service | Endpoint | Purpose |
|---------|----------|---------|
| Cambrian Agent | `http://localhost:5006` | Chat interface |
| SEI Agent API | `http://localhost:9000/api/message` | Agent API |
| SEI Agent Health | `http://localhost:9000/health` | Health check |
| MCP Server | `http://localhost:5004/sse` | MCP communication |
| MCP Health | `http://localhost:5004/health` | Health check |
| GitBook Docs | `http://localhost:4000` | Documentation |

## 🧪 Testing

### Health Checks

```bash
# Check all services
curl http://localhost:5006                    # Cambrian Agent
curl http://localhost:9000/health             # SEI Agent API
curl http://localhost:5004/health             # MCP Server
curl http://localhost:4000                    # GitBook (when running)
```

### Package Testing

```bash
# Test individual packages
cd packages/cambrian-agent-launcher && npm test
cd packages/eliza-develop && bun test
cd packages/sei-agent-kit-custom && npm test
```

## 🔍 Package Features Comparison

### DeFi Integration

| Package | Yei Finance | Swaps | Staking | Lending | Trading |
|---------|-------------|-------|---------|---------|---------|
| cambrian-agent-launcher | ✅ | ✅ | ✅ | ✅ | ✅ |
| sei-agent-kit-custom | ✅ | ✅ | ✅ | ✅ | ✅ |
| n8n-nodes-sei | ❌ | ❌ | ❌ | ❌ | ❌ |
| sei-mcp-server | ✅ | ✅ | ✅ | ✅ | ✅ |

### Deployment Options

| Package | Docker Ready | npm Package | Custom Build |
|---------|--------------|-------------|--------------|
| n8n-nodes-sei | N/A | ✅ | ❌ |
| sei-mcp-server | ✅ | ❌ | ✅ |
| cambrian-agent-launcher | ✅ | ✅ | ✅ |
| eliza-develop | ✅ | ✅ | ✅ |
| sei-agent-kit-custom | ✅ | ✅ | ✅ |
| seiling-buidlbox-docs | 🚧 | ❌ | ✅ |

## 🔄 Updates and Maintenance

### Package Updates

```bash
# Update Docker images
docker pull 0xn1c0/cambrian-agent-launcher:latest
docker pull 0xn1c0/sei-agent:latest
docker pull 0xn1c0/sei-mcp-server:latest

# Update npm packages
npm update n8n-nodes-sei
```

### Version Management

- All Docker images use semantic versioning
- Check individual package README files for specific versions
- Use `:latest` for development, specific versions for production

---

**Seiling Buidlbox Packages** - Production-ready AI agent development toolkit for SEI blockchain 