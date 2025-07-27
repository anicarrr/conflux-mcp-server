# Services Documentation

> **Essential Services in Seiling Buidlbox**

## Overview

Seiling Buidlbox includes **12 services** that work together. Each can be enabled/disabled via environment variables using `ENABLE_<SERVICE>=yes/no`.

## User Interface Services

### OpenWebUI (Primary Interface)
- **Purpose**: ChatGPT-like interface for AI interaction
- **Port**: 5002 (external) → 8080 (internal)
- **Image**: `ghcr.io/open-webui/open-webui:main`
- **URL**: http://localhost:5002
- **Use Cases**: Chat with agents, model management

### n8n (Workflow Builder)
- **Purpose**: Visual workflow automation
- **Port**: 5001
- **Image**: `n8nio/n8n:latest`
- **Database**: SQLite (default)
- **URL**: http://localhost:5001
- **Health Check**: `/healthz`
- **Use Cases**: Agent orchestration, data pipelines, Sei blockchain workflows

### Flowise (Agent Builder)
- **Purpose**: Visual AI agent creation
- **Port**: 5003
- **Image**: `flowiseai/flowise:latest`
- **URL**: http://localhost:5003
- **Default Login**: admin / seiling123
- **Use Cases**: Build conversational agents, LLM flows

## AI Agent Services

### ElizaOS (Conversational AI)
- **Purpose**: Advanced conversational AI with Sei integration
- **Port**: 5005 (external) → 3000 (internal)
- **Image**: `0xn1c0/eliza-develop:v1.2.1`
- **URL**: http://localhost:5005
- **Requires**: OpenAI API key, Sei private key
- **Database**: PGLite (embedded)
- **Health Check**: `/health`
- **Use Cases**: Blockchain chatbots, DeFi agents

### Cambrian (Multi-Modal Agents)
- **Purpose**: Advanced agent orchestration
- **Port**: 5006 (external) → 3000 (internal)
- **Image**: `0xn1c0/cambrian-agent-launcher:latest`
- **URL**: http://localhost:5006
- **Requires**: OpenAI API key, Sei private key
- **Use Cases**: Multi-modal AI interactions, Sei DeFi Agents

### Sei MCP Server (Blockchain Integration)
- **Purpose**: Sei Network operations via Model Context Protocol
- **Port**: 5004
- **Image**: `0xn1c0/sei-mcp-server:latest`
- **URL**: http://localhost:5004
- **Requires**: Sei private key
- **Health Check**: `/health`
- **Use Cases**: Wallet operations, smart contracts, DeFi

## Database Services

### PostgreSQL (Primary Database)
- **Port**: 5432
- **Image**: `postgres:16-alpine`
- **Default Credentials**: `postgres/seiling123`
- **Database**: `seiling`
- **Health Check**: `pg_isready`

### Redis (Cache & Sessions)
- **Port**: 6379
- **Image**: `redis:7-alpine`
- **Default Password**: `seiling123`
- **Health Check**: `redis-cli ping`

### Qdrant (Vector Database)
- **Port**: 6333 (HTTP), 6334 (gRPC)
- **Image**: `qdrant/qdrant:latest`
- **URL**: http://localhost:6333
- **Use Cases**: Embeddings, semantic search

### Neo4j (Graph Database)
- **Port**: 7474 (HTTP), 7687 (Bolt)
- **Image**: `neo4j:5.15-community`
- **URL**: http://localhost:7474
- **Default Credentials**: `neo4j/seiling123`
- **Health Check**: `/browser/` endpoint

## Infrastructure Services

### Traefik (Reverse Proxy)
- **Ports**: 80, 443, 8080 (dashboard)
- **Image**: `traefik:v3.0`
- **Purpose**: SSL certificates, subdomain routing
- **For**: Production deployments only
- **Dashboard**: http://localhost:8080 (when enabled)

### Ollama (Local LLM)
- **Port**: 11434
- **Image**: `ollama/ollama:latest`
- **Purpose**: Local AI model inference
- **Requires**: 8GB+ RAM
- **Health Check**: `/api/tags`
- **Default**: Disabled (enable with `ENABLE_OLLAMA=yes`)

## Service Control

### Enable/Disable Services
```bash
# Required services (always enabled)
ENABLE_POSTGRES=yes
ENABLE_REDIS=yes

# Core UI services (usually enabled)
ENABLE_OPENWEBUI=yes
ENABLE_N8N=yes
ENABLE_FLOWISE=yes

# AI Agent services (optional)
ENABLE_ELIZA=yes
ENABLE_CAMBRIAN=yes
ENABLE_SEI_MCP=yes

# Database services (optional)
ENABLE_QDRANT=yes
ENABLE_NEO4J=yes

# Infrastructure (production only)
ENABLE_TRAEFIK=no    # Local development
ENABLE_OLLAMA=no     # Heavy resource usage
```

## Required Credentials

### Essential (Required)
- **OpenAI API Key**: For ElizaOS and Cambrian agents
- **Sei Private Key**: For blockchain operations

### Optional
- **Anthropic API Key**: For Claude models
- **Google AI API Key**: For Gemini models
- **Flowise Password**: Default `seiling123`

## Health Monitoring

### Built-in Health Checks
All services include Docker health checks. Use the dedicated health check script:

```bash
# Quick health check (2 retries)
bash scripts/bootstrap/health_check.sh quick

# Full health check (3 retries)
bash scripts/bootstrap/health_check.sh full
```

### Service URLs Summary

| Service | Local URL | Purpose |
|---------|-----------|---------|
| OpenWebUI | http://localhost:5002 | Primary interface |
| n8n | http://localhost:5001 | Workflows |
| Flowise | http://localhost:5003 | Agent builder |
| ElizaOS | http://localhost:5005 | AI framework |
| Cambrian | http://localhost:5006 | Multi-modal agents |
| Sei MCP | http://localhost:5004 | Blockchain ops |
| Neo4j | http://localhost:7474 | Graph database |
| Qdrant | http://localhost:6333 | Vector database |

## Default Passwords

**Change these in production!**

- PostgreSQL: `postgres/seiling123`
- Redis: `seiling123`
- Neo4j: `neo4j/seiling123`
- Flowise: `admin/seiling123`

## Resource Requirements

### Lightweight Setup (Local Development)
- **RAM**: 4GB minimum
- **Storage**: 10GB
- **Services**: Core UI + Databases (no Ollama, no Traefik)

### Full Setup (Production)
- **RAM**: 8GB+ (with Ollama)
- **Storage**: 20GB+
- **Services**: All services enabled including Traefik and Ollama

### Resource Heavy Services
- **Ollama**: 8GB+ RAM, 20GB+ storage (disabled by default)
- **ElizaOS**: 2GB RAM, requires OpenAI API key
- **Neo4j**: 1GB RAM

## Troubleshooting

### Common Service Issues

#### Check Service Status
```bash
# View all running services
docker compose ps

# Check specific service logs
docker logs seiling-<service-name>

# Restart specific service  
docker restart seiling-<service-name>
```

#### Health Check Issues
```bash
# Run automated health checks
bash scripts/bootstrap/health_check.sh quick

# Check individual service health
curl http://localhost:5002  # OpenWebUI
curl http://localhost:5001/healthz  # n8n
curl http://localhost:5004/health  # Sei MCP Server
```

#### Database Connection Issues
```bash
# PostgreSQL
docker exec seiling-postgres pg_isready -U postgres

# Redis
docker exec seiling-redis redis-cli ping

# Neo4j
curl http://localhost:7474/browser/
``` 