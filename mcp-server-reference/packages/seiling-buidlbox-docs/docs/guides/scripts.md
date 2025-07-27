# Bootstrap Scripts Documentation

> **Simple Bootstrap System for Seiling Buidlbox**

## Overview

The bootstrap system uses one main script (`bootstrap.sh`) that calls modular sub-scripts to handle deployment automatically.

**One Command Setup**: `./bootstrap.sh`

## Main Script

### bootstrap.sh
**Purpose**: Main orchestration script that runs all setup steps:

1. **OS Detection** (`detect_os.sh`) - Detect OS and package manager
2. **Install Dependencies** (`install_deps.sh`) - Install Docker, Git, Python
3. **Project Setup** (`project_setup.sh`) - Clone repo and setup directories  
4. **Environment Config** (`configure_env.sh`) - Create .env file
5. **Deploy Services** (`deploy_services.sh`) - Start Docker Compose services

**Usage**:
```bash
./bootstrap.sh
# Follow prompts to select profile and enter credentials
```

## Configuration Profiles

### Available Profiles

#### default (Recommended)
- Uses all default settings
- No interactive prompts
- Sets up local development environment  
- **Use this for quickest setup**

#### local-dev
- Local development setup
- No domain configuration needed
- Lightweight (no Ollama, no Traefik)

#### remote
- Production setup with domain
- Includes Traefik for SSL
- Requires domain name

#### custom
- Interactive prompts for all settings
- Choose individual services
- Custom configuration options

### Profile Comparison

| Feature | default | local-dev | remote | custom |
|---------|---------|-----------|--------|--------|
| Prompts | None | Few | Some | All |
| Domain | localhost | localhost | Required | Optional |
| SSL | No | No | Yes | Optional |
| Ollama | No | No | Optional | Choice |
| Best for | Quick start | Development | Production | Power users |

## Key Scripts

### configure_env.sh
**Purpose**: Creates `.env` file based on selected profile

**Features**:
- **Profile-based configuration**: Different setups for different use cases
- **Non-interactive wallet generation**: Prevents hanging during setup
- **Port configuration**: All services support custom ports
- **Credential management**: Handles API keys and private keys

### deploy_services.sh
**Purpose**: Deploy and manage Docker services

**Features**:
- **Service management menu**: Interactive options for operations
- **Health monitoring**: Integrated health checks
- **Flexible composition**: Only starts enabled services
- **Management options**:
  1. Start Services
  2. Stop Services
  3. Check Health
  4. Show Logs
  5. Troubleshoot Issues

### health_check.sh
**Purpose**: Comprehensive service health monitoring

```bash
# Quick health check (2 retries, faster)
./scripts/bootstrap/health_check.sh quick

# Full health check (3 retries, comprehensive)
./scripts/bootstrap/health_check.sh full

# Show help
./scripts/bootstrap/health_check.sh help
```

**Features**:
- **Two modes**: Quick for menus, Full for deployment
- **Smart detection**: Only checks enabled services
- **Comprehensive coverage**: HTTP services, databases, special cases
- **Consistent output**: Unified formatting across all scripts

### generate_wallet.sh
**Purpose**: Generate Sei Network wallets

```bash
# Interactive wallet generation
bash scripts/bootstrap/generate_wallet.sh

# Non-interactive (for automation)
bash scripts/bootstrap/generate_wallet.sh --non-interactive
```

**Features**:
- **Multiple methods**: Node.js, Python, OpenSSL fallbacks
- **Non-interactive mode**: For automated setups
- **Validation**: Private key format verification
- **Cross-platform**: Works on Linux, macOS, Windows

### troubleshoot.sh
**Purpose**: Diagnostic and repair tools

**Features**:
- **Integrated health checks**: Uses health_check.sh
- **Container diagnostics**: Shows detailed container status
- **Automated log collection**: For failed services
- **System validation**: Checks Docker requirements
- **Repair options**: Common fixes and resets

## Environment Variables

### Core Configuration
```bash
# Profile selection
PROFILE=default

# Domain (for production)
BASE_DOMAIN_NAME=localhost

# Required credentials
OPENAI_API_KEY=sk-proj-your_key
SEI_PRIVATE_KEY=0xyour_private_key
```

### Service Control
```bash
# Enable/disable services
ENABLE_N8N=yes
ENABLE_OPENWEBUI=yes
ENABLE_ELIZA=yes
ENABLE_CAMBRIAN=yes
ENABLE_FLOWISE=yes
ENABLE_SEI_MCP=yes
ENABLE_POSTGRES=yes
ENABLE_REDIS=yes
ENABLE_QDRANT=yes
ENABLE_NEO4J=yes
ENABLE_TRAEFIK=no     # Production only
ENABLE_OLLAMA=no      # Heavy resource usage
```

### Port Configuration
```bash
# Default ports (configurable)
N8N_PORT=5001
OPENWEBUI_PORT=5002
FLOWISE_PORT=5003
MCP_SERVER_PORT=5004
ELIZA_PORT=5005
CAMBRIAN_AGENT_PORT=5006
```

## Script Dependencies

```
bootstrap.sh
├── detect_os.sh
├── install_deps.sh
├── project_setup.sh
├── configure_env.sh
│   └── generate_wallet.sh (--non-interactive)
└── deploy_services.sh
    ├── health_check.sh (full mode)
    └── troubleshoot.sh
        └── health_check.sh (quick mode)
```

## Common Usage

### Quick Start
```bash
./bootstrap.sh
# Select "default" profile for fastest setup
```

### Health Monitoring
```bash
# Check all services quickly
bash scripts/bootstrap/health_check.sh quick

# Comprehensive health check
bash scripts/bootstrap/health_check.sh full
```

### Troubleshooting
```bash
# Run diagnostics
bash scripts/bootstrap/troubleshoot.sh

# Generate new wallet
bash scripts/bootstrap/generate_wallet.sh

# Check service logs
docker logs seiling-<service-name>
```

### Management
```bash
# Service management menu
bash scripts/bootstrap/deploy_services.sh

# Restart all services
docker compose restart

# View all logs
docker compose logs
```

## Troubleshooting

### Common Issues

#### Scripts Won't Run
```bash
# Fix permissions
chmod +x bootstrap.sh
chmod +x scripts/bootstrap/*.sh
```

#### Wallet Generation Hangs
```bash
# Use non-interactive mode
bash scripts/bootstrap/generate_wallet.sh --non-interactive
```

#### Health Checks Fail
```bash
# Wait for services to start
sleep 30

# Check individual service
docker logs seiling-<service-name>

# Restart if needed
docker restart seiling-<service-name>
```

#### Docker Issues
```bash
# Start Docker daemon
sudo systemctl start docker   # Linux
# or restart Docker Desktop    # Windows/Mac

# Verify Docker is working
docker info
```

### Manual Recovery
```bash
# Reset environment
rm .env
./bootstrap.sh

# Reset everything (nuclear option)
docker compose down -v
docker system prune -f
./bootstrap.sh
```

## Script Features

### Reliability
- **Error handling**: Scripts fail fast on errors
- **Health checks**: Verify services are working
- **Retries**: Multiple attempts for network operations
- **Validation**: Check requirements before proceeding

### Usability
- **Color output**: Clear visual feedback
- **Progress indicators**: Show what's happening
- **Error messages**: Clear problem descriptions
- **Help options**: Documentation and examples

### Automation
- **Non-interactive modes**: For CI/CD and automation
- **Smart defaults**: Sensible configuration out of the box
- **Profile-based setup**: Different configs for different needs
- **Idempotent**: Safe to run multiple times

---

**The modular design ensures each script has a single responsibility while maintaining seamless integration.** 