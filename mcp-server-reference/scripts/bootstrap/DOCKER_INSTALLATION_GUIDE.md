# Docker Installation Guide for Seiling Buidlbox

This guide explains how Docker is automatically installed and managed by the Seiling Buidlbox bootstrap system across different environments.

## 🚀 **Automatic Installation Overview**

The bootstrap system automatically detects your environment and installs the appropriate Docker variant:

- **VPS/Linux Servers**: Docker Engine (daemon only, no GUI)
- **macOS Local Development**: Docker Desktop (with GUI and management tools)
- **Windows Local Development**: Docker Desktop (manual installation required)
- **WSL (Windows Subsystem for Linux)**: Docker Engine

## 🖥️ **Environment-Specific Installation**

### **VPS/Linux Server Environments**

#### **Ubuntu/Debian**
```bash
# What the bootstrap script does automatically:
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Enable and start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Add user to docker group (no sudo needed for docker commands)
sudo usermod -aG docker $USER
```

#### **CentOS/RHEL/Fedora**
```bash
# What the bootstrap script does automatically:
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Enable and start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Add user to docker group
sudo usermod -aG docker $USER
```

#### **Key Benefits for VPS:**
- ✅ **Official Docker repositories** (latest stable versions)
- ✅ **Docker Engine only** (no unnecessary GUI components)
- ✅ **Automatic service startup** on boot
- ✅ **User permission management** (no sudo required for docker commands)
- ✅ **Docker Compose plugin** included

### **macOS Local Development**

#### **Installation Process**
```bash
# What the bootstrap script does automatically:
brew install --cask docker

# Start Docker Desktop
open /Applications/Docker.app

# Wait for Docker Desktop to be ready (up to 120 seconds)
```

#### **Key Benefits for macOS:**
- ✅ **Docker Desktop** with GUI management
- ✅ **Automatic daemon management**
- ✅ **Built-in Docker Compose**
- ✅ **Kubernetes support** (optional)
- ✅ **File sharing** between macOS and containers

### **Windows Local Development**

#### **Manual Installation Required**
The bootstrap script detects Windows environments but requires manual Docker Desktop installation:

1. **Download Docker Desktop for Windows** from https://www.docker.com/products/docker-desktop
2. **Install and start Docker Desktop**
3. **Enable WSL 2 backend** (recommended)
4. **Run the bootstrap script** from Git Bash or WSL

#### **Validation**
The script validates that Docker Desktop is properly installed and running.

## 🔧 **Automatic Docker Daemon Management**

### **Daemon Startup Detection**
The bootstrap system automatically:

1. **Detects if Docker daemon is running**
2. **Attempts to start daemon if not running**:
   - **macOS**: Opens Docker Desktop application
   - **Linux**: Uses `systemctl start docker`
3. **Waits for daemon to be ready** (with timeout)
4. **Validates Docker Compose availability**

### **Startup Timeouts**
- **Linux Docker Engine**: 30 seconds timeout
- **macOS Docker Desktop**: 120 seconds timeout (slower startup)
- **Retry logic**: Up to 3 attempts with 5-second delays

### **Error Handling**
If Docker cannot be started automatically:
- **Clear error messages** with suggested manual steps
- **Environment-specific guidance**
- **Exit with helpful troubleshooting information**

## 🛠️ **Docker Compose Detection**

The system automatically detects and uses the correct Docker Compose variant:

### **Standalone docker-compose**
```bash
# Legacy standalone installation
docker-compose --version
```

### **Docker Compose Plugin**
```bash
# Modern plugin (included with Docker Engine/Desktop)
docker compose version
```

### **Automatic Selection**
The bootstrap scripts automatically use whichever variant is available, preferring the standalone version for compatibility.

## 🚨 **Troubleshooting**

### **Common Issues and Solutions**

#### **"Docker daemon not running" on Linux**
```bash
# Manual fixes:
sudo systemctl start docker
sudo systemctl enable docker  # Start on boot

# Check status:
sudo systemctl status docker
```

#### **"Permission denied" errors on Linux**
```bash
# Add user to docker group:
sudo usermod -aG docker $USER

# Apply group changes:
newgrp docker
# OR log out and back in
```

#### **Docker Desktop won't start on macOS**
```bash
# Manual start:
open /Applications/Docker.app

# Reset Docker Desktop:
# Go to Docker Desktop > Troubleshoot > Reset to factory defaults
```

#### **Port conflicts**
```bash
# Check what's using a port:
netstat -an | grep :5432  # Example for PostgreSQL port

# Kill process using port:
sudo lsof -ti:5432 | xargs kill -9
```

### **Validation Commands**

#### **Check Docker Installation**
```bash
# Basic Docker check
docker --version
docker info

# Docker Compose check
docker-compose --version  # OR
docker compose version

# Service status (Linux)
sudo systemctl status docker
```

#### **Test Docker Functionality**
```bash
# Run test container
docker run --rm hello-world

# Check Docker Compose
docker compose version
```

## 📋 **Manual Installation (If Needed)**

### **Ubuntu/Debian (if automatic fails)**
```bash
# Remove old versions
sudo apt-get remove docker docker-engine docker.io containerd runc

# Install using convenience script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
```

### **CentOS/RHEL (if automatic fails)**
```bash
# Remove old versions
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine

# Install using convenience script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
```

### **macOS (if Homebrew fails)**
1. Download Docker Desktop from https://www.docker.com/products/docker-desktop
2. Install the .dmg file
3. Start Docker Desktop from Applications

## 🔍 **Verification**

After installation, the bootstrap system verifies:

- ✅ **Docker command availability**
- ✅ **Docker daemon accessibility**
- ✅ **Docker Compose functionality**
- ✅ **Container run capabilities**
- ✅ **Network and volume operations**

## 📚 **Additional Resources**

- [Official Docker Installation Guide](https://docs.docker.com/get-docker/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/)
- [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/)
- [Docker Engine on Linux](https://docs.docker.com/engine/install/)

---

**Note**: The Seiling Buidlbox bootstrap system handles all of this automatically. This guide is provided for reference and troubleshooting purposes. 