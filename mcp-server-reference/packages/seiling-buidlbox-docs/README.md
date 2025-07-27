# GitBook Documentation Package

This package provides GitBook documentation for the Seiling Buidlbox project.

## 📚 Overview

- **Purpose**: Centralized documentation using GitBook
- **Status**: Development needed
- **Deployment**: Static site generation
- **Integration**: GitHub Pages or custom domain

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- GitBook CLI (optional)
- GitHub account for hosting

### Installation

1. **Install GitBook CLI** (optional):
   ```bash
   npm install -g gitbook-cli
   ```

2. **Initialize GitBook**:
   ```bash
   cd packages/gitbook-docs
   gitbook init
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

## 📁 Structure

```
gitbook-docs/
├── README.md                 # This file
├── book.json                 # GitBook configuration
├── SUMMARY.md               # Table of contents
├── docs/                    # Documentation source
│   ├── README.md           # Homepage
│   ├── getting-started/    # Getting started guides
│   ├── packages/           # Package documentation
│   ├── api/                # API documentation
│   └── deployment/         # Deployment guides
├── assets/                 # Images and static files
├── scripts/                # Build and deployment scripts
└── package.json            # Node.js dependencies
```

## 🔧 Configuration

### book.json
```json
{
  "title": "Seiling Buidlbox Documentation",
  "description": "Complete documentation for Seiling Buidlbox AI agent development toolkit",
  "author": "Your Name",
  "language": "en",
  "structure": {
    "readme": "README.md",
    "summary": "SUMMARY.md"
  },
  "plugins": [
    "expandable-chapters",
    "search",
    "github",
    "theme-default"
  ],
  "pluginsConfig": {
    "github": {
      "url": "https://github.com/your-username/seiling-buidlbox"
    }
  }
}
```

### SUMMARY.md
```markdown
# Summary

* [Introduction](README.md)
* [Getting Started](docs/getting-started/README.md)
  * [Quick Start](docs/getting-started/quick-start.md)
  * [Installation](docs/getting-started/installation.md)
* [Packages](docs/packages/README.md)
  * [n8n-nodes-sei](docs/packages/n8n-nodes-sei.md)
  * [sei-mcp-server](docs/packages/sei-mcp-server.md)
  * [cambrian-agent](docs/packages/cambrian-agent.md)
  * [sei-eliza-agent](docs/packages/sei-eliza-agent.md)
* [API Reference](docs/api/README.md)
* [Deployment](docs/deployment/README.md)
```

## 🛠️ Development

### Local Development
```bash
# Start GitBook server
gitbook serve

# Build static site
gitbook build
```

### Integration with Main Project
```bash
# From project root
cd packages/gitbook-docs
npm run dev
```

## 📦 Package Integration

### Docker Integration
Add to `docker-compose.yml`:
```yaml
gitbook-docs:
  build:
    context: ../packages/gitbook-docs
    dockerfile: Dockerfile
  container_name: seiling-gitbook-docs
  restart: unless-stopped
  ports:
    - "${GITBOOK_PORT:-4000}:4000"
  volumes:
    - ../packages/gitbook-docs/docs:/app/docs
  networks:
    - seiling_network
```

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install GitBook CLI
RUN npm install -g gitbook-cli

# Copy package files
COPY package*.json ./
RUN npm install

# Copy documentation
COPY . .

# Expose port
EXPOSE 4000

# Start GitBook server
CMD ["gitbook", "serve", "--port", "4000"]
```

## 🔄 CI/CD Integration

### GitHub Actions Workflow
```yaml
name: Deploy GitBook Documentation

on:
  push:
    branches: [main]
    paths: ['packages/gitbook-docs/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install GitBook CLI
        run: npm install -g gitbook-cli
        
      - name: Build Documentation
        run: |
          cd packages/gitbook-docs
          gitbook build
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/gitbook-docs/_book
```

## 📋 Checklist

- [ ] Initialize GitBook structure
- [ ] Create book.json configuration
- [ ] Set up SUMMARY.md with navigation
- [ ] Migrate existing documentation
- [ ] Add Docker integration
- [ ] Set up CI/CD pipeline
- [ ] Configure custom domain (optional)
- [ ] Add search functionality
- [ ] Test local development
- [ ] Deploy to production

## 🔗 Links

- **Local Development**: http://localhost:4000
- **Production**: https://your-domain.com
- **GitHub Repository**: https://github.com/your-username/seiling-buidlbox

## 📝 Contributing

1. Edit documentation in `docs/` directory
2. Update `SUMMARY.md` for navigation changes
3. Test locally with `gitbook serve`
4. Commit and push changes
5. Documentation will auto-deploy via CI/CD

---

**GitBook Documentation Package** - Centralized documentation for Seiling Buidlbox 