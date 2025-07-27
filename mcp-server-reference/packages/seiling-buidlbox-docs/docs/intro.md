---
id: intro
title: Introduction
sidebar_label: Introduction
---

# Seiling Buidlbox

> **No-Code Sei Multi-Agent System Development Toolkit**

Welcome to Seiling Buidlbox - a comprehensive no-code toolkit that democratizes AI agent development on the Sei Network. This developer-focused, containerized solution combines multiple best-in-class frameworks (n8n, ElizaOS, Cambrian) into a unified development environment.

## 🌟 Overview

**Seiling Buidlbox** enables developers of all skill levels to create sophisticated multi-agent systems without extensive blockchain or AI expertise.

### 🎯 Vision
To become the definitive toolkit for no-code AI agent development on Sei Network, enabling developers to rapidly build, deploy, and manage sophisticated blockchain automation systems.

### 🚀 Key Features

- **🔧 Standard n8n Interface**: Native n8n web interface for workflow automation and agent coordination
- **🤖 Multi-Framework Integration**: ElizaOS, Cambrian, and Flowise for comprehensive agent development
- **⚡ One-Click Deployment**: Complete system setup with Docker Compose orchestration
- **🔗 Sei Network Native**: Built-in Sei MCP Server for blockchain integration
- **📊 OpenWebUI Custom Extensions**: ChatGPT-like interface with custom dashboard and analytics
- **🔄 11 Specialized Agents**: Orchestrator, Research, Analytics, Portfolio, Trading, and more
- **⚙️ 6 Automation Engines**: DCA, Rebalancing, Limit Orders, Payments, Research, Compounding

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   n8n Standard  │    │  Flowise Agent  │    │   OpenWebUI     │
│    Interface    │    │    Builder      │    │  Custom Ext.    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ElizaOS       │    │   Cambrian      │    │   Sei MCP       │
│   Runtime       │    │   Framework     │    │   Server        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### One-Line Install (Recommended)
```bash
curl -sSL https://raw.githubusercontent.com/nicoware-dev/seiling-buidlbox/main/bootstrap.sh | bash
```

### Manual Setup
```bash
git clone https://github.com/nicoware-dev/seiling-buidlbox.git
cd seiling-buidlbox
./bootstrap.sh
```

### Prerequisites
- **Docker & Docker Compose** (latest version)
- **Git**
- **4GB+ RAM** minimum
- **10GB+ Storage** for all services
- **OpenAI API key** (for AI agents)
- **Sei Network private key** (for blockchain integration)

## 📦 Core Services

| Service | Port | Purpose |
|---------|------|---------|
| **OpenWebUI** | 3000 | Primary chat interface |
| **n8n** | 5678 | Workflow automation |
| **Flowise** | 3001 | Agent builder |
| **ElizaOS** | 3010 | AI framework |
| **Cambrian** | 3004 | Multi-modal agents |
| **Sei MCP** | 3333 | Blockchain integration |

## 🎯 Target Users

1. **No-Code Developer** - Create automated trading bots without programming
2. **Blockchain Developer** - Rapidly prototype AI agent solutions for clients  
3. **DeFi Enthusiast** - Automate DeFi strategies and portfolio management
4. **Indie Developer** - Create and deploy multi-agent systems quickly

Ready to get started? Check out our [Quick Start Guide](./getting-started/quick-start.md)! 