# Environment Configuration

> **Essential Environment Variables for Seiling Buidlbox**

## Table of Contents

- [Overview](#overview)
- [Service Control](#service-control)
- [Required Credentials](#required-credentials)
- [Service Configuration](#service-configuration)
- [Deployment Profiles](#deployment-profiles)
- [Example Configuration](#example-configuration)

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

## n8n Service Configuration

> **Essential Environment Variables for n8n Integration**

### Enable n8n Service
```bash
ENABLE_N8N=yes
N8N_PORT=5678
```

### Security Keys
```bash
N8N_ENCRYPTION_KEY=your-strong-encryption-key
N8N_USER_MANAGEMENT_JWT_SECRET=your-jwt-secret
```

### Database Configuration (choose one)
# SQLite (default, recommended for most setups)
```bash
DB_TYPE=sqlite
DB_SQLITE_DATABASE=/home/node/.n8n/database.sqlite
DB_SQLITE_POOL_SIZE=10
DB_SQLITE_VACUUM_ON_STARTUP=true
```
# OR PostgreSQL (advanced users, production with heavy workloads)
```bash
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=postgres
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=seiling
DB_POSTGRESDB_USER=postgres
DB_POSTGRESDB_PASSWORD=seiling123
# DB_POSTGRESDB_SCHEMA=public
```

### Redis for Queue Mode
```bash
QUEUE_BULL_REDIS_HOST=redis
QUEUE_BULL_REDIS_PORT=6379
QUEUE_BULL_REDIS_PASSWORD=seiling123
```

### Execution Data Saving
```bash
EXECUTIONS_DATA_SAVE_ON_SUCCESS=all
EXECUTIONS_DATA_SAVE_ON_ERROR=all
EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=true
```

### Queue Mode & Workers
```bash
EXECUTIONS_PROCESS=queue
# Number of workers can be set via docker-compose scale or service config
```

### Webhook & Tunnel
```bash
WEBHOOK_URL=https://your-public-url.com/
# Tunnel (for local development)
N8N_TUNNEL_SUBDOMAIN=yourcustomsubdomain
N8N_TUNNEL_AUTH_USER=youruser
N8N_TUNNEL_AUTH_PASSWORD=yourpassword
```

### Community Nodes
```bash
N8N_ENABLE_COMMUNITY_NODES=true
```

### Other Useful Settings
```bash
# Enable metrics endpoint (optional)
N8N_METRICS=true
# Allow external modules in Code node (optional)
NODE_FUNCTION_ALLOW_EXTERNAL=*
```

> **Note**: SQLite is now the default database for n8n in Seiling Buidlbox, providing better reliability and simpler setup compared to PostgreSQL. PostgreSQL can still be used for advanced production deployments with heavy workloads.
> 
> For more details, see the [n8n environment variables documentation](https://docs.n8n.io/hosting/configuration/environment-variables/)

## Domain, Subdomain, and Advanced Service Configuration

### Domain & Subdomain Settings (Production Only)
```bash
# Base domain (REQUIRED only for remote/production deployments with Traefik)
BASE_DOMAIN_NAME=your-domain.com

# Optional custom subdomains (if not set, defaults to service.your-domain.com)
# Only needed if you want to override the default subdomain pattern
N8N_SUBDOMAIN=n8n                    # Results in: n8n.your-domain.com
OPENWEBUI_SUBDOMAIN=chat              # Results in: chat.your-domain.com  
FLOWISE_SUBDOMAIN=flowise             # Results in: flowise.your-domain.com
OLLAMA_SUBDOMAIN=ollama               # Results in: ollama.your-domain.com
SEI_MCP_SUBDOMAIN=mcp                 # Results in: mcp.your-domain.com
QDRANT_SUBDOMAIN=qdrant               # Results in: qdrant.your-domain.com
NEO4J_SUBDOMAIN=neo4j                 # Results in: neo4j.your-domain.com
ELIZA_SUBDOMAIN=eliza                 # Results in: eliza.your-domain.com
CAMBRIAN_SUBDOMAIN=cambrian           # Results in: cambrian.your-domain.com

# Note: For local development (local-dev, full-local profiles), 
# all services use localhost and these domain settings are ignored.
```

### SSL & Traefik Settings
```bash
TRAEFIK_EMAIL=your-email@domain.com
SSL_ENABLED=true
SSL_EMAIL=your-email@domain.com
SSL_RESOLVER=letsencrypt
```

### Logging & Debugging
```bash
LOG_LEVEL=info
DEBUG=false
ENVIRONMENT=development
```

### LLM & Agent Integration
```bash
RPC_URL=https://evm-rpc.sei-apis.com
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:3b
```

## Troubleshooting

### Common Service Issues

#### Container Startup Failures
```bash
# Check container status
docker ps --filter "name=seiling-"

# Check service logs
docker logs seiling-n8n
docker logs seiling-flowise
docker logs seiling-openwebui
docker logs seiling-sei-mcp-server

# Restart specific service
docker restart seiling-<service-name>
```

#### Database Connection Issues
```bash
# Check if PostgreSQL is running (if using PostgreSQL)
docker logs seiling-postgres

# For n8n with SQLite (default setup)
docker logs seiling-n8n
# SQLite database is automatically created in container

# Verify database connection (PostgreSQL only)
docker exec seiling-postgres pg_isready -U postgres

# Reset n8n database (WARNING: loses data)
docker compose down
docker volume rm seiling-buidlbox_n8n_storage
docker compose up -d

# Reset PostgreSQL (WARNING: loses data)
docker compose down
docker volume rm seiling-buidlbox_postgres_data
docker compose up -d
```

#### Permission Issues
```bash
# Fix file permissions (Linux/macOS)
sudo chown -R $USER:$USER .
chmod +x bootstrap.sh
chmod +x scripts/bootstrap/*.sh

# Fix line endings (Windows)
dos2unix .env
dos2unix scripts/bootstrap/*.sh
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

### Service-Specific Troubleshooting

#### n8n Issues
- **Database connection failed**: 
  - **SQLite (default)**: Check container logs with `docker logs seiling-n8n`
  - **PostgreSQL**: Ensure PostgreSQL is running and credentials match
- **Permission denied**: Check `N8N_ENCRYPTION_KEY` is set
- **Webhooks not working**: Verify `WEBHOOK_URL` points to correct domain
- **SQLite performance**: For heavy workloads, consider switching to PostgreSQL

#### Flowise Issues  
- **npm start failed**: Container entrypoint issue, restart service
- **Package.json not found**: Working directory problem in container

#### OpenWebUI Issues
- **start.sh not found**: Entrypoint script missing, restart service
- **Authentication failed**: Check `WEBUI_SECRET_KEY` is set

#### Sei MCP Server Issues
- **Module not found**: Ensure `SEI_PRIVATE_KEY` is set correctly
- **dist/index.js missing**: Build artifacts not available in container

### Quick Fixes

#### Restart All Services
```bash
docker compose down
docker compose up -d
```

#### Reset Everything (Nuclear Option)
```bash
docker compose down -v
docker system prune -f
./bootstrap.sh
```

#### Update API Keys
```bash
# Edit .env file
nano .env

# Restart affected services
docker compose restart
``` 