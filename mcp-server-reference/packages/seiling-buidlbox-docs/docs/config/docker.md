# Docker Images Reference

> **All Docker Images Used in Seiling Buidlbox**

## Overview

Seiling Buidlbox uses **12 Docker images** - mix of official images, third-party images, and custom builds.

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
| ElizaOS | `0xn1c0/eliza-develop:v1.2.1` | Docker Hub | Conversational AI framework |
| Sei MCP | `0xn1c0/sei-mcp-server:latest` | Docker Hub | Blockchain integration |
| Cambrian | `0xn1c0/cambrian-agent-launcher:latest` | Docker Hub | Multi-modal agents |

### Database Services
| Service | Image | Registry | Purpose |
|---------|-------|----------|---------|
| PostgreSQL | `postgres:16-alpine` | Docker Hub (Official) | Primary database |
| Redis | `redis:7-alpine` | Docker Hub (Official) | Cache & sessions |
| Qdrant | `qdrant/qdrant:latest` | Docker Hub (Official) | Vector database |
| Neo4j | `neo4j:5.15-community` | Docker Hub (Official) | Graph database |

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

## Docker Compose Structure

### Service Organization
```yaml
services:
  # User Interface Services
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    
  n8n:
    image: n8nio/n8n:latest
    
  flowise:
    image: flowiseai/flowise:latest

  # AI Agent Services
  eliza:
    image: 0xn1c0/eliza-develop:v1.2.1
    
  cambrian:
    image: 0xn1c0/cambrian-agent-launcher:latest
    
  sei-mcp-server:
    image: 0xn1c0/sei-mcp-server:latest

  # Database Services
  postgres:
    image: postgres:16-alpine
    
  redis:
    image: redis:7-alpine
    
  qdrant:
    image: qdrant/qdrant:latest
    
  neo4j:
    image: neo4j:5.15-community

  # Infrastructure Services
  traefik:
    image: traefik:v3.0
    condition: ${ENABLE_TRAEFIK:-no}
    
  ollama:
    image: ollama/ollama:latest
    condition: ${ENABLE_OLLAMA:-no}
```

### Service Dependencies
```yaml
# AI Agents depend on databases
eliza:
  depends_on:
    postgres:
      condition: service_healthy
    redis:
      condition: service_healthy

# Workflow automation depends on database
n8n:
  depends_on:
    postgres:
      condition: service_healthy
```

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

## Custom Images

### ElizaOS (`0xn1c0/eliza-develop:v1.2.1`)
- **Base**: Node.js 23+
- **Features**: Sei plugin integration, conversational AI
- **Size**: ~2GB
- **Health Check**: `/health` endpoint

### Sei MCP Server (`0xn1c0/sei-mcp-server:latest`)
- **Base**: Node.js 18+
- **Features**: 27 blockchain tools, HTTP/SSE transport
- **Size**: ~500MB
- **Health Check**: `/health` endpoint

### Cambrian Agent (`0xn1c0/cambrian-agent-launcher:latest`)
- **Base**: Next.js application
- **Features**: Multi-modal AI, Yei Finance integration
- **Size**: ~800MB
- **Port**: 3000 internal

## Image Configuration

### Environment Variables
```bash
# Image-specific configurations
ELIZA_IMAGE_TAG=v1.2.1
SEI_MCP_IMAGE_TAG=latest
CAMBRIAN_IMAGE_TAG=latest

# Resource limits (optional)
POSTGRES_MEMORY_LIMIT=1g
REDIS_MEMORY_LIMIT=512m
NEO4J_MEMORY_LIMIT=1g
```

### Volume Mounts
```bash
# Persistent data volumes
postgres_data:/var/lib/postgresql/data
redis_data:/data
neo4j_data:/data
qdrant_data:/qdrant/storage
n8n_data:/home/node/.n8n
```

## Troubleshooting

### Image Pull Issues
```bash
# Check Docker registry connectivity
docker pull hello-world

# Pull specific image manually
docker pull 0xn1c0/sei-mcp-server:latest

# Check image availability
docker search 0xn1c0/sei-mcp-server
```

### Container Resource Issues
```bash
# Check container resource usage
docker stats

# View container configuration
docker inspect seiling-<service-name>

# Check available system resources
free -h
df -h
```

### Image Build Issues (Custom Images)
```bash
# Check build logs
docker logs seiling-<service-name>

# Rebuild with no cache
docker-compose build --no-cache <service-name>

# Check Dockerfile syntax
docker build --dry-run .
```

## Security Considerations

### Image Security
- All official images are maintained by their respective organizations
- Custom images are built from verified base images
- Regular security updates via image updates

### Registry Security
- Official Docker Hub images are signed and verified
- GitHub Container Registry images use GitHub's security features
- Custom images are hosted on Docker Hub with security scanning

### Best Practices
```bash
# Always use specific versions in production
image: postgres:16-alpine  # ✅ Good
image: postgres:latest     # ❌ Avoid in production

# Regularly update images
docker-compose pull
docker-compose up -d

# Remove unused images periodically
docker image prune -a
``` 