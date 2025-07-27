# Seiling Buidlbox 🚀

> **No-Code Sei Network Multi-Agent System Development Toolkit**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Required-blue.svg)](https://www.docker.com/)
[![Sei Network](https://img.shields.io/badge/Sei%20Network-Compatible-green.svg)](https://sei.io/)

## Overview

**Seiling Buidlbox** is a no-code toolkit for building AI agents on Sei Network. Built for the **Sei Network Hackathon**, it combines multiple frameworks into one easy deployment.

### 🎯 Goals
- **One-Command Setup**: `./bootstrap.sh` deploys everything
- **No-Code Development**: Visual interfaces for AI agents
- **Sei Network Ready**: Built-in blockchain integration

## Features

- **🤖 AI Agent Frameworks**: ElizaOS, Cambrian, Flowise
- **🔄 Workflow Builder**: n8n for automation
- **💬 Chat Interface**: OpenWebUI for interaction
- **🗄️ Complete Data Stack**: PostgreSQL, Redis, Qdrant, Neo4j
- **🔗 Sei Integration**: MCP Server for blockchain ops
- **⚡ One-Click Deploy**: Bootstrap script handles everything

## Services

| Service | Port | Purpose |
|---------|------|---------|
| OpenWebUI | 5002 | Primary chat interface |
| n8n | 5001 | Workflow automation |
| Flowise | 5003 | Visual agent builder |
| ElizaOS | 5005 | Conversational AI framework |
| Cambrian | 5006 | Multi-modal agents |
| Sei MCP | 5004 | Blockchain integration |
| PostgreSQL | 5432 | Database backend |
| Redis | 6379 | Queue & cache |
| Qdrant | 6333 | Vector database |
| Neo4j | 7474 | Graph database |
| Traefik | 8080 | Reverse proxy (prod) |
| Ollama | 11434 | Local LLM inference |

## Quick Start

### One-Line Install (Remote)
```bash
curl -sSL https://raw.githubusercontent.com/nicoware-dev/seiling-buidlbox/main/bootstrap.sh | bash
```

### Local Install
```bash
# Clone and run
git clone https://github.com/nicoware-dev/seiling-buidlbox.git
cd seiling-buidlbox
./bootstrap.sh

# Select "default" for fastest setup with all defaults
```

### Prerequisites
- Docker & Docker Compose
- Git
- 4GB+ RAM

### Profiles
- **default**: Quick start with all defaults (recommended)
- **local-dev**: Quick local setup 
- **remote**: Production with domain
- **custom**: Full customization

### Required Credentials
You'll need:
- **OpenAI API Key**: For ElizaOS (required)
- **Sei Private Key**: For blockchain operations (required)

### Wallet Generation
```bash
# Generate a new Sei Network wallet anytime
bash scripts/bootstrap/generate_wallet.sh
```

### Health Monitoring
```bash
# Quick health check for all services
bash scripts/bootstrap/health_check.sh quick

# Full health check with retries
bash scripts/bootstrap/health_check.sh full
```

### Troubleshooting
If services fail to start:
```bash
# Run diagnostic script
bash scripts/bootstrap/troubleshoot.sh

# Common fixes:
docker compose restart
docker logs seiling-<service-name>
docker compose down -v && ./bootstrap.sh  # Reset everything
```

## Access URLs

After deployment:
- **OpenWebUI**: http://localhost:5002
- **n8n**: http://localhost:5001  
- **Flowise**: http://localhost:5003
- **ElizaOS**: http://localhost:5005
- **Cambrian**: http://localhost:5006
- **Sei MCP**: http://localhost:5004

## Documentation

- **[Quick Start](./QUICK_START.md)**: Get running in 5 minutes
- **[Services](./SERVICES.md)**: Service details and requirements
- **[Environment](./ENVIRONMENT.md)**: Configuration variables
- **[Scripts](./SCRIPTS.md)**: Bootstrap system documentation
- **[Docker Images](./DOCKER.md)**: Image inventory
- **[User Guide](./USER_GUIDE.md)**: How to use the platform

---

**Built for Sei Network Hackathon** 🏆 