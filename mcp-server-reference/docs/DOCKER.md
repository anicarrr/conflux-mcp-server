# Docker Images Reference

> **All Docker Images Used in Seiling Buidlbox**

## Table of Contents

- [Overview](#overview)
- [Image List](#image-list)
- [Custom Builds](#custom-builds)
- [Image Requirements](#image-requirements)
- [Common Commands](#common-commands)

## Overview

Seiling Buidlbox uses **12 Docker images** - mix of official images, third-party images, and one custom build.

## Image List

### User Interface Services
| Service | Image | Registry | Purpose |
|---------|-------|----------|---------|
| OpenWebUI | `ghcr.io/open-webui/open-webui:main` | GitHub Container Registry | Primary chat interface |
| n8n | `n8nio/n8n:latest` | Docker Hub (Official) | Workflow automation |
| Flowise | `flowiseai/flowise:latest` | Docker Hub | Visual agent builder |

### AI Agent Services
| Service | Image | Registry | Purpose |
|---------|-------|----------|---------|
| ElizaOS | `0xn1c0/eliza:multi` | Docker Hub | Conversational AI framework |
| Sei MCP | `0xn1c0/sei-mcp-server:latest` | Docker Hub | Blockchain integration |
| Cambrian | `0xn1c0/cambrian-agent-launcher:latest` | Docker Hub | Multi-modal agents |

### Database Services
| Service | Image | Registry | Purpose |
|---------|-------|----------|---------|
| PostgreSQL | `postgres:16-alpine` | Docker Hub (Official) | Primary database |
| Redis | `redis:7-alpine` | Docker Hub (Official) | Cache & sessions |
| Qdrant | `qdrant/qdrant:latest` | Docker Hub (Official) | Vector database |
| Neo4j | `neo4j:5-community` | Docker Hub (Official) | Graph database |

### Infrastructure Services
| Service | Image | Registry | Purpose |
|---------|-------|----------|---------|
| Traefik | `traefik:v3.0` | Docker Hub (Official) | Reverse proxy & SSL |
| Ollama | `ollama/ollama:latest` | Docker Hub (Official) | Local LLM server |


## Image Requirements

### Resource Heavy Images
- **Ollama**: 8GB+ RAM, 20GB+ storage (disabled by default)
- **ElizaOS**: 2GB RAM, requires OpenAI API key
- **Neo4j**: 1GB RAM

### Lightweight Images  
- **Alpine-based**: PostgreSQL, Redis (minimal overhead)
- **OpenWebUI**: 512MB RAM
- **Traefik**: 256MB RAM

### External Dependencies
- **ElizaOS**: Requires OpenAI API key
- **Sei MCP**: Requires Sei private key
- **Traefik**: Requires domain for production

## Common Commands

### View Running Images
```bash
docker images
docker ps
```

### Update Images
```bash
docker-compose pull
docker-compose up -d
```

### Check Image Sizes
```bash
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

### Clean Up
```bash
# Remove unused images
docker image prune

# Remove all unused containers, networks, images
docker system prune -a
```

### Logs and Debug
```bash
# View logs for specific image
docker logs seiling-<service-name>

# View all service logs
docker-compose logs
``` 