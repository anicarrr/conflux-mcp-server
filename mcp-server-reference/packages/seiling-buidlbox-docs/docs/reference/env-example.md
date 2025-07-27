# Environment Configuration Example

> **Copy and rename this file to `.env` and update values as needed**

The bootstrap script creates this file automatically based on your selected profile.

## Quick Setup

For most users, run `./bootstrap.sh` and select "default" profile. This will create a working `.env` file with all necessary defaults.

## Manual Configuration

If you need to manually edit the `.env` file:

### Profile & Domain
```bash
PROFILE=default
# Only needed for production with custom domain:
# BASE_DOMAIN_NAME=your-domain.com
```

### Required API Keys
```bash
# REQUIRED: For ElizaOS and Cambrian agents
OPENAI_API_KEY=sk-proj-your_openai_key

# REQUIRED: For blockchain operations  
SEI_PRIVATE_KEY=0xyour_sei_private_key

# OPTIONAL: Additional AI services
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
```

### Service Control
```bash
# Core services (usually enabled)
ENABLE_OPENWEBUI=yes
ENABLE_N8N=yes
ENABLE_FLOWISE=yes
ENABLE_ELIZA=yes
ENABLE_CAMBRIAN=yes
ENABLE_SEI_MCP=yes

# Database services (usually enabled)
ENABLE_POSTGRES=yes
ENABLE_REDIS=yes
ENABLE_QDRANT=yes
ENABLE_NEO4J=yes

# Infrastructure (production only)
ENABLE_TRAEFIK=no    # Use 'yes' for production with domain
ENABLE_OLLAMA=no     # Use 'yes' if you have 8GB+ RAM
```

### Port Configuration
```bash
# Default ports (only change if conflicts)
OPENWEBUI_PORT=5002
N8N_PORT=5001
FLOWISE_PORT=5003
ELIZA_PORT=5005
CAMBRIAN_AGENT_PORT=5006
MCP_SERVER_PORT=5004
```

### Database Settings
```bash
# Default passwords (CHANGE IN PRODUCTION!)
POSTGRES_PASSWORD=seiling123
POSTGRES_USER=postgres
POSTGRES_DB=seiling
REDIS_PASSWORD=seiling123
NEO4J_AUTH=neo4j/seiling123
```

### Security Keys
```bash
# Default keys (CHANGE IN PRODUCTION!)
N8N_ENCRYPTION_KEY=seiling-encryption-key
N8N_USER_MANAGEMENT_JWT_SECRET=seiling-jwt-secret
WEBUI_SECRET_KEY=seiling-webui-secret
FLOWISE_PASSWORD=seiling123
```

### Production Settings (Optional)
```bash
# Only needed for production deployment with custom domain
BASE_DOMAIN_NAME=your-domain.com
TRAEFIK_EMAIL=your-email@domain.com

# Optional custom subdomains (defaults to service.domain.com)
N8N_SUBDOMAIN=n8n
OPENWEBUI_SUBDOMAIN=chat
FLOWISE_SUBDOMAIN=flowise
ELIZA_SUBDOMAIN=eliza
CAMBRIAN_SUBDOMAIN=cambrian
SEI_MCP_SUBDOMAIN=mcp
```

## Profiles Explained

### default (Recommended)
- All services enabled except Traefik and Ollama
- localhost domain
- Default passwords
- Fastest setup

### local-dev
- Same as default
- Lightweight development setup
- No domain configuration needed

### remote
- All services including Traefik enabled
- Requires custom domain
- SSL certificates via Let's Encrypt
- Production ready

### custom
- Interactive configuration for all options
- Choose individual services
- Custom passwords and domains

## Security Notes

### For Development
- Default passwords are fine for local development
- Use localhost for domain

### For Production
**CHANGE THESE:**
```bash
# Generate secure keys:
openssl rand -hex 32  # For encryption keys
openssl rand -base64 32  # For passwords

# Or use Python:
python -c "import secrets; print(secrets.token_hex(32))"
```

**Required for production:**
- Strong, unique passwords
- Custom domain name
- Valid email for SSL certificates
- Firewall configuration (ports 80, 443 only)

## Complete Example Files

### Development Environment
```bash
# .env file for local development
PROFILE=local-dev
BASE_DOMAIN_NAME=localhost

# Required Credentials
OPENAI_API_KEY=sk-proj-your_openai_key_here
SEI_PRIVATE_KEY=0xyour_sei_private_key_here

# Core Services
ENABLE_OPENWEBUI=yes
ENABLE_N8N=yes
ENABLE_FLOWISE=yes
ENABLE_ELIZA=yes
ENABLE_CAMBRIAN=yes
ENABLE_SEI_MCP=yes

# Databases
ENABLE_POSTGRES=yes
ENABLE_REDIS=yes
ENABLE_QDRANT=yes
ENABLE_NEO4J=yes

# Infrastructure (disabled for local)
ENABLE_TRAEFIK=no
ENABLE_OLLAMA=no

# Default Ports
OPENWEBUI_PORT=3000
N8N_PORT=5678
FLOWISE_PORT=3001
ELIZA_PORT=3010
CAMBRIAN_AGENT_PORT=3004
MCP_SERVER_PORT=3333

# Default Security (OK for development)
POSTGRES_PASSWORD=seiling123
REDIS_PASSWORD=seiling123
NEO4J_AUTH=neo4j/seiling123
N8N_ENCRYPTION_KEY=seiling-encryption-key
N8N_USER_MANAGEMENT_JWT_SECRET=seiling-jwt-secret
WEBUI_SECRET_KEY=seiling-webui-secret
FLOWISE_PASSWORD=seiling123
```

### Production Environment
```bash
# .env file for production
PROFILE=remote
BASE_DOMAIN_NAME=your-domain.com
TRAEFIK_EMAIL=admin@your-domain.com

# Required Credentials
OPENAI_API_KEY=sk-proj-your_production_openai_key
SEI_PRIVATE_KEY=0xyour_production_sei_private_key

# All Services Enabled
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
ENABLE_OLLAMA=yes

# Production Ports (standard)
OPENWEBUI_PORT=3000
N8N_PORT=5678
FLOWISE_PORT=3001
ELIZA_PORT=3010
CAMBRIAN_AGENT_PORT=3004
MCP_SERVER_PORT=3333

# Strong Security Keys (CHANGE THESE!)
POSTGRES_PASSWORD=your_strong_db_password_32_chars
REDIS_PASSWORD=your_strong_redis_password_here
NEO4J_AUTH=neo4j/your_strong_neo4j_password
N8N_ENCRYPTION_KEY=your_strong_encryption_key_32_chars
N8N_USER_MANAGEMENT_JWT_SECRET=your_strong_jwt_secret_64_chars
WEBUI_SECRET_KEY=your_strong_webui_secret_key_here
FLOWISE_PASSWORD=your_strong_flowise_password

# Custom Subdomains (optional)
N8N_SUBDOMAIN=automation
OPENWEBUI_SUBDOMAIN=chat
FLOWISE_SUBDOMAIN=agents
ELIZA_SUBDOMAIN=ai
CAMBRIAN_SUBDOMAIN=assistant
SEI_MCP_SUBDOMAIN=blockchain
```

## Troubleshooting

### Missing Variables
If services fail to start, check that required variables are set:
```bash
# Check if keys are set
grep -E "(OPENAI_API_KEY|SEI_PRIVATE_KEY)" .env

# Regenerate configuration
rm .env
./bootstrap.sh
```

### Port Conflicts
If ports are in use, change them in .env:
```bash
# Example: Change OpenWebUI port
OPENWEBUI_PORT=3001

# Restart services
docker compose restart
```

### Invalid Keys
```bash
# OpenAI key format: sk-proj-...
# Sei private key format: 0x... (64 hex characters)

# Generate new Sei wallet:
bash scripts/bootstrap/generate_wallet.sh
```

### Environment Validation
```bash
# Validate environment variables
bash scripts/bootstrap/health_check.sh quick

# Check service status
docker compose ps

# View environment in container
docker exec seiling-n8n env | grep -E "(API_KEY|PRIVATE_KEY)"
```

---

**The bootstrap script handles all this automatically!** 

Just run `./bootstrap.sh` and select "default" for the easiest setup. 