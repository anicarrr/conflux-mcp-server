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

---

**The bootstrap script handles all this automatically!** 

Just run `./bootstrap.sh` and select "default" for the easiest setup. 