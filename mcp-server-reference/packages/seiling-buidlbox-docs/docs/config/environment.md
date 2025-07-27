# Environment Configuration

> **Essential Environment Variables for Seiling Buidlbox**

## Overview

All services are controlled via environment variables in `.env` file. The bootstrap script creates this automatically based on your selected profile.

## Service Control

### Enable/Disable Services
```bash
ENABLE_OPENWEBUI=yes
ENABLE_N8N=yes
ENABLE_FLOWISE=yes
ENABLE_ELIZA=yes
ENABLE_CAMBRIAN=yes
ENABLE_SEI_MCP=yes
ENABLE_POSTGRES=yes
ENABLE_REDIS=yes
ENABLE_QDRANT=yes
ENABLE_NEO4J=yes
ENABLE_TRAEFIK=yes
ENABLE_OLLAMA=no  # Heavy resource usage
```

### Port Configuration
```bash
OPENWEBUI_PORT=5002
N8N_PORT=5001
FLOWISE_PORT=5003
ELIZA_PORT=5005
CAMBRIAN_AGENT_PORT=5006
MCP_SERVER_PORT=5004
```

## Required Credentials

### AI Services (Required)
```bash
OPENAI_API_KEY=sk-proj-your_key_here  # Required for ElizaOS & Cambrian
```

### Blockchain (Required)
```bash
SEI_PRIVATE_KEY=0xyour_private_key_here  # Required for blockchain ops
PRIVATE_KEY=0xyour_private_key_here      # Alternative name
```

### Optional AI APIs
```bash
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
```

## Service Configuration

### Database Settings
```bash
POSTGRES_PASSWORD=seiling123
POSTGRES_USER=postgres
POSTGRES_DB=seiling
REDIS_PASSWORD=seiling123
NEO4J_AUTH=neo4j/seiling123
```

### Security Keys
```bash
N8N_ENCRYPTION_KEY=seiling-encryption-key
N8N_USER_MANAGEMENT_JWT_SECRET=seiling-jwt-secret
WEBUI_SECRET_KEY=seiling-webui-secret
FLOWISE_PASSWORD=seiling123
```

### Domain Settings (Production)
```bash
BASE_DOMAIN_NAME=your-domain.com
TRAEFIK_EMAIL=your-email@domain.com
```

## Deployment Profiles

### Local Development (Default)
- All services except Traefik and Ollama
- localhost domain
- Default passwords
- Lightweight setup

### Remote Production
- All services including Traefik
- Custom domain required
- SSL certificates via Let's Encrypt
- Full feature set

### Full Local
- All services including Ollama
- localhost domain
- Local LLM inference
- High resource usage

### Custom
- Interactive configuration
- Choose individual services
- Custom settings for all options

## Example Configuration

### Minimal Setup (.env)
```bash
# Profile
PROFILE=local-dev
BASE_DOMAIN_NAME=localhost

# Required API Keys
OPENAI_API_KEY=sk-proj-your_openai_key
SEI_PRIVATE_KEY=0xyour_sei_private_key

# Service Control
ENABLE_OPENWEBUI=yes
ENABLE_N8N=yes
ENABLE_FLOWISE=yes
ENABLE_ELIZA=yes
ENABLE_CAMBRIAN=yes
ENABLE_SEI_MCP=yes
ENABLE_POSTGRES=yes
ENABLE_REDIS=yes
ENABLE_QDRANT=yes
ENABLE_NEO4J=yes
ENABLE_TRAEFIK=no
ENABLE_OLLAMA=no

# Default Passwords
POSTGRES_PASSWORD=seiling123
N8N_ENCRYPTION_KEY=seiling-encryption-key
WEBUI_SECRET_KEY=seiling-webui-secret
FLOWISE_PASSWORD=seiling123
```

### Production Setup
```bash
# Profile
PROFILE=remote
BASE_DOMAIN_NAME=your-domain.com
TRAEFIK_EMAIL=admin@your-domain.com

# All services enabled
ENABLE_TRAEFIK=yes
ENABLE_OLLAMA=yes

# Custom security keys (recommended)
N8N_ENCRYPTION_KEY=your-strong-encryption-key
WEBUI_SECRET_KEY=your-strong-webui-secret
POSTGRES_PASSWORD=your-strong-db-password
```

## Domain & Subdomain Settings

### Production Only
```bash
# Base domain (REQUIRED only for remote/production deployments)
BASE_DOMAIN_NAME=your-domain.com

# Optional custom subdomains
N8N_SUBDOMAIN=n8n                    # Results in: n8n.your-domain.com
OPENWEBUI_SUBDOMAIN=chat              # Results in: chat.your-domain.com  
FLOWISE_SUBDOMAIN=flowise             # Results in: flowise.your-domain.com
OLLAMA_SUBDOMAIN=ollama               # Results in: ollama.your-domain.com
SEI_MCP_SUBDOMAIN=mcp                 # Results in: mcp.your-domain.com
```

### SSL & Traefik Settings
```bash
TRAEFIK_EMAIL=your-email@domain.com
SSL_ENABLED=true
SSL_EMAIL=your-email@domain.com
SSL_RESOLVER=letsencrypt
```

## Troubleshooting

### Common Issues

#### Container Startup Failures
```bash
# Check container status
docker ps --filter "name=seiling-"

# Check service logs
docker logs seiling-n8n
docker logs seiling-flowise
docker logs seiling-openwebui

# Restart specific service
docker restart seiling-<service-name>
```

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker logs seiling-postgres

# Verify database connection
docker exec seiling-postgres pg_isready -U postgres

# Reset database (WARNING: loses data)
docker compose down
docker volume rm seiling-buidlbox_postgres_data
docker compose up -d
```

#### Port Conflicts
```bash
# Check what's using ports
netstat -tulpn | grep :3000
netstat -tulpn | grep :5678

# Change ports in .env
OPENWEBUI_PORT=3001
N8N_PORT=5679
```

### Quick Fixes

#### Update API Keys
```bash
# Edit .env file
nano .env

# Restart affected services
docker compose restart
```

#### Reset Everything
```bash
docker compose down -v
docker system prune -f
./bootstrap.sh
``` 