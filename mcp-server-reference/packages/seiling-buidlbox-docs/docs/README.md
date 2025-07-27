# Seiling Buidlbox Documentation

Welcome to the comprehensive documentation for **Seiling Buidlbox**, an AI agent development toolkit designed for building intelligent applications on the Sei Network.

## 🎯 What is Seiling Buidlbox?

Seiling Buidlbox is a complete toolkit for developing, deploying, and managing AI agents that integrate with blockchain networks, particularly the Sei Network. It provides a modular architecture that allows developers to build sophisticated AI applications with ease.

### Key Features

- **🤖 Multi-Agent Framework**: Build and orchestrate multiple AI agents
- **🔗 Blockchain Integration**: Native support for Sei Network and other blockchains
- **📦 Modular Architecture**: Plug-and-play components for rapid development
- **🚀 Production Ready**: Docker containers and deployment automation
- **🔧 Developer Friendly**: Comprehensive APIs and documentation

## 📦 Core Packages

| Package | Status | Purpose |
|---------|--------|---------|
| **n8n-nodes-sei** | ✅ Available | Custom n8n nodes for Sei Network integration |
| **sei-mcp-server** | ✅ Available | Model Context Protocol server for Sei |
| **cambrian-agent** | 🔄 Development | Multi-modal agent framework |
| **sei-eliza-agent** | 🔄 Development | Conversational AI agent with Sei integration |
| **gitbook-docs** | 🔄 Development | This documentation package |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/seiling-buidlbox.git
   cd seiling-buidlbox
   ```

2. **Set up environment**:
   ```bash
   cp docker/env.example docker/.env
   # Edit docker/.env with your configuration
   ```

3. **Start the services**:
   ```bash
   cd docker
   docker-compose up -d
   ```

4. **Verify installation**:
   ```bash
   python ../scripts/deploy.py health
   ```

## 📚 Documentation Structure

This documentation is organized into several sections:

### 🚀 Getting Started
- **Quick Start Guide**: Get up and running in minutes
- **Installation**: Detailed setup instructions
- **Project Overview**: Understanding the architecture
- **Development Setup**: Local development environment

### 📦 Packages
- **Package Overview**: Understanding the modular architecture
- **Individual Package Docs**: Detailed documentation for each package
- **Integration Guides**: How packages work together

### 🔧 Development
- **Development Guide**: Contributing to the project
- **Architecture Overview**: System design and patterns
- **Testing**: Testing strategies and best practices
- **Code Quality**: Standards and guidelines

### 📚 API Reference
- **REST API**: HTTP endpoints and usage
- **WebSocket API**: Real-time communication
- **Plugin API**: Extending the system

### 🚀 Deployment
- **Docker Setup**: Containerized deployment
- **Environment Configuration**: Production settings
- **Production Checklist**: Deployment best practices

## 🎯 Use Cases

### For Developers
- Build AI agents that interact with blockchain networks
- Create automated trading bots with Sei Network
- Develop conversational AI applications
- Integrate AI capabilities into existing applications

### For Organizations
- Deploy AI agents in production environments
- Scale AI applications with containerized architecture
- Monitor and manage AI agent performance
- Integrate with existing blockchain infrastructure

## 🔗 Quick Links

- **[Quick Start Guide](docs/getting-started/quick-start.md)** - Get started in 5 minutes
- **[Package Overview](docs/packages/README.md)** - Understand the architecture
- **[API Reference](docs/api/README.md)** - Complete API documentation
- **[Deployment Guide](docs/deployment/README.md)** - Production deployment
- **[Contributing](docs/development/contributing.md)** - How to contribute

## 🤝 Community

- **GitHub**: [seiling-buidlbox](https://github.com/your-username/seiling-buidlbox)
- **Issues**: [Report bugs or request features](https://github.com/your-username/seiling-buidlbox/issues)
- **Discussions**: [Join the community](https://github.com/your-username/seiling-buidlbox/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

**Ready to build the future of AI agents?** Start with our [Quick Start Guide](docs/getting-started/quick-start.md)! 