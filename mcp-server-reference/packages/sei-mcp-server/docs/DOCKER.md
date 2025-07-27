# Docker Deployment Guide for SEI MCP Server

## 🐳 Overview

This guide covers deploying the SEI MCP Server using Docker with **Server-Sent Events (SSE)** transport for any MCP client that supports URL-based connections.

## 🎯 Key Features

- **HTTP/SSE Transport**: Optimized for URL-based MCP connections
- **Multi-stage Build**: Efficient Docker image with minimal size
- **Environment Configuration**: Flexible private key management
- **Production Ready**: Proper logging, health checks, and restart policies

## 🏗️ Docker Architecture

```
┌─────────────────┐    HTTP/SSE     ┌──────────────────┐    RPC     ┌─────────────┐
│   MCP Client    │ ──────────────> │  Docker Container │ ────────> │ SEI Network │
│   (Any IDE)     │    Port 3002    │   (MCP Server)   │           │             │
└─────────────────┘                 └──────────────────┘           └─────────────┘
```

## 📋 Prerequisites

- Docker 20.10+
- Docker Compose 2.0+ (optional)
- Private key for SEI operations
- Network access to SEI RPC endpoints

## 🐳 Dockerfile

The Dockerfile uses multi-stage builds for optimization:

### Stage 1: Build
- Uses Node.js Alpine image
- Installs dependencies
- Builds TypeScript to JavaScript
- Creates optimized bundle

### Stage 2: Runtime
- Minimal Node.js Alpine image
- Copies only built files
- Exposes port 3002
- Runs HTTP server

## 🐳 Available Images

### Pre-built Images on Docker Hub

| Tag | Description | Use Case |
|-----|-------------|----------|
| `0xn1c0/sei-mcp-server:latest` | Latest stable version | Production, general use |
| `0xn1c0/sei-mcp-server:v1.0.0-latest` | Latest v1.0.0 series | Version-specific deployments |
| `0xn1c0/sei-mcp-server:v1.0.0-1b17345` | Specific commit version | Exact version pinning |
| `0xn1c0/sei-mcp-server:v0.1.0` | Previous stable version | Rollback/compatibility |

```bash
# Pull the latest version
docker pull 0xn1c0/sei-mcp-server:latest

# Pull a specific version
docker pull 0xn1c0/sei-mcp-server:v1.0.0-1b17345
```

## 🚀 Quick Start

### 1. Use Pre-built Image (Recommended)

```bash
# Pull the latest image
docker pull 0xn1c0/sei-mcp-server:latest

# Verify the image
docker images | grep 0xn1c0/sei-mcp-server
```

### 2. Build Docker Image (Optional)

```bash
# Build the image
docker build -t 0xn1c0/sei-mcp-server:latest .

# Verify the build
docker images | grep 0xn1c0/sei-mcp-server
```

### 3. Run Container

```bash
# Basic run (no private key required at startup)
docker run -d \
  --name sei-mcp-server \
  -p 3002:3002 \
  0xn1c0/sei-mcp-server:latest

# Run with volume for logs
docker run -d \
  --name sei-mcp-server \
  -p 3002:3002 \
  -v $(pwd)/logs:/app/logs \
  0xn1c0/sei-mcp-server:latest
```

### 4. Configure MCP Client

Add to your MCP client configuration (examples for common clients):

#### Cursor IDE
```json
{
  "mcpServers": {
    "sei-mcp-server": {
      "url": "http://localhost:3002/sse",
      "headers": {
        "X-Private-Key": "0x..."
      }
    }
  }
}
```

#### Claude Desktop
```json
{
  "mcpServers": {
    "sei-mcp-server": {
      "url": "http://localhost:3002/sse",
      "headers": {
        "X-Private-Key": "0x..."
      }
    }
  }
}
```

#### Generic MCP Client
```javascript
const client = new MCPClient({
  serverUrl: "http://localhost:3002/sse",
  headers: {
    "X-Private-Key": "0x..."
  }
});
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 3002 | No |
| `HOST` | Bind address | 0.0.0.0 | No |
| `PRIVATE_KEY` | SEI private key | None | No* |
| `LOG_LEVEL` | Logging level | info | No |

*Private key should be provided by MCP client via `X-Private-Key` header for security

### Port Mapping

- **Container Port**: 3002 (internal)
- **Host Port**: 3002 (or any available port)
- **Protocol**: HTTP with SSE upgrade

### Volume Mounts

```bash
# Logs directory
-v /host/logs:/app/logs

# Configuration directory (if using config files)
-v /host/config:/app/config
```

## 🛠️ Docker Compose Setup

### Basic Composition

```yaml
# docker-compose.yml
version: '3.8'

services:
  sei-mcp-server:
    image: 0xn1c0/sei-mcp-server:latest
    ports:
      - "3002:3002"
    environment:
      - LOG_LEVEL=info
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3002/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Advanced Composition with Reverse Proxy

```yaml
version: '3.8'

services:
  sei-mcp-server:
    image: 0xn1c0/sei-mcp-server:latest
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    networks:
      - mcp-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - sei-mcp-server
    networks:
      - mcp-network

networks:
  mcp-network:
    driver: bridge
```

## 🔒 Security Considerations

### Private Key Management

**Recommended: Client Headers (Secure)**
```json
{
  "url": "http://localhost:3002/sse",
  "headers": {
    "X-Private-Key": "0x..."
  }
}
```

**Alternative: Environment Variable (Less Secure)**
```bash
docker run -e PRIVATE_KEY="0x..." sei-mcp-server
```

**Production: Docker Secrets (If needed)**
```yaml
services:
  sei-mcp-server:
    secrets:
      - private_key
    environment:
      - PRIVATE_KEY_FILE=/run/secrets/private_key

secrets:
  private_key:
    external: true
```

**Why Client Headers are Recommended:**
- ✅ No private keys stored in server environment
- ✅ Each client can use different private keys
- ✅ Better security isolation
- ✅ Private keys remain in client configuration only

### Network Security

- Use HTTPS with reverse proxy for production
- Restrict container network access
- Use non-root user in container
- Regular security updates

## 📊 Monitoring & Health Checks

### Health Check Endpoint

```bash
# Check server health
curl http://localhost:3002/health

# Expected response
{
  "status": "healthy",
  "timestamp": "2025-01-xx...",
  "uptime": 3600,
  "connections": 2
}
```

### Docker Health Check

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3002/health || exit 1
```

### Logging

```bash
# View container logs
docker logs sei-mcp-server

# Follow logs
docker logs -f sei-mcp-server

# With timestamps
docker logs -t sei-mcp-server
```

## 🚧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Change host port
   docker run -p 3003:3002 0xn1c0/sei-mcp-server:latest
   ```

2. **SSE Connection Fails**
   - Check CORS headers
   - Verify port mapping
   - Check firewall rules

3. **Private Key Issues**
   - Verify key format (0x prefix)
   - Check environment variable
   - Test with client headers

4. **Build Failures**
   ```bash
   # Clean build
   docker build --no-cache -t sei-mcp-server .
   ```

### Debug Mode

```bash
# Run with debug logging
docker run -e LOG_LEVEL=debug 0xn1c0/sei-mcp-server:latest

# Interactive mode
docker run -it 0xn1c0/sei-mcp-server:latest /bin/sh
```

## 🔄 Updates & Maintenance

### Updating Container

```bash
# Stop current container
docker stop sei-mcp-server

# Remove old container
docker rm sei-mcp-server

# Pull latest image
docker pull 0xn1c0/sei-mcp-server:latest

# Start new container
docker run -d --name sei-mcp-server -p 3002:3002 0xn1c0/sei-mcp-server:latest
```

### Backup Configuration

```bash
# Export container config
docker inspect sei-mcp-server > sei-mcp-config.json

# Backup volumes
docker run --rm -v sei-logs:/data -v $(pwd):/backup alpine tar czf /backup/logs-backup.tar.gz -C /data .
```

## 🌐 Production Deployment

### Cloud Deployment (AWS/GCP/Azure)

```bash
# Tag for registry (if needed)
docker tag 0xn1c0/sei-mcp-server:latest your-registry/sei-mcp-server:latest

# Push to registry
docker push your-registry/sei-mcp-server:latest

# Deploy with cloud service
# (ECS, Cloud Run, ACI, etc.)
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sei-mcp-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: sei-mcp-server
  template:
    metadata:
      labels:
        app: sei-mcp-server
    spec:
      containers:
      - name: sei-mcp-server
        image: 0xn1c0/sei-mcp-server:latest
        ports:
        - containerPort: 3002
        env:
        - name: PRIVATE_KEY
          valueFrom:
            secretKeyRef:
              name: sei-secrets
              key: private-key
---
apiVersion: v1
kind: Service
metadata:
  name: sei-mcp-service
spec:
  selector:
    app: sei-mcp-server
  ports:
  - port: 3002
    targetPort: 3002
  type: LoadBalancer
```

## 📝 Best Practices

1. **Use multi-stage builds** for smaller images
2. **Run as non-root user** for security
3. **Implement health checks** for reliability
4. **Use secrets management** for private keys
5. **Enable logging** for debugging
6. **Set resource limits** for stability
7. **Use restart policies** for resilience
8. **Regular updates** for security

## 🎊 Result

A production-ready Docker deployment that:
- ✅ Supports HTTP/SSE transport for Cursor
- ✅ Handles real SEI blockchain operations
- ✅ Provides secure private key management
- ✅ Includes monitoring and health checks
- ✅ Scales for production workloads 