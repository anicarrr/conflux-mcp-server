# User Guide

> **How to Use Seiling Buidlbox**

## Table of Contents

- [Getting Started](#getting-started)
- [Main Interfaces](#main-interfaces)
- [Creating Your First Agent](#creating-your-first-agent)
- [Building Workflows](#building-workflows)
- [Sei Network Integration](#sei-network-integration)
- [Common Tasks](#common-tasks)

## Getting Started

After running `./bootstrap.sh`, access these main interfaces:

- **OpenWebUI** (http://localhost:5002): Primary chat interface
- **n8n** (http://localhost:5001): Workflow builder
- **Flowise** (http://localhost:5003): Visual agent builder
- **ElizaOS** (http://localhost:5005): AI framework

## Main Interfaces

### OpenWebUI - Primary Interface
- **Purpose**: Chat with AI agents
- **Login**: No authentication required (default)
- **Features**: Model selection, chat history, custom extensions

### n8n - Workflow Builder
- **Purpose**: Create automated workflows
- **First Login**: Create admin account
- **Features**: Visual workflows, 500+ integrations, scheduling

### Flowise - Agent Builder  
- **Purpose**: Build conversational AI agents
- **Login**: admin / seiling123
- **Features**: Drag-drop agent design, LLM integration

### ElizaOS - AI Framework
- **Purpose**: Advanced conversational AI
- **Features**: Sei Network integration, multi-modal interactions

## Creating Your First Agent

### Using Flowise
1. Open http://localhost:5003
2. Login with admin / seiling123
3. Create new chatflow
4. Add LLM node (OpenAI)
5. Configure with your API key
6. Test and deploy

### Using ElizaOS
1. Access http://localhost:5005
2. ElizaOS comes pre-configured with Sei integration
3. Chat directly or integrate with other services

## Building Workflows

### Using n8n
1. Open http://localhost:5001
2. Create new workflow
3. Add trigger (webhook, schedule, etc.)
4. Add action nodes (database, API calls, etc.)
5. Connect and test
6. Activate workflow

### Common Workflow Patterns
- **API Integration**: Webhook → Process → Database
- **Scheduled Tasks**: Cron → Process → Notification
- **Agent Coordination**: Trigger → Agent Call → Response

## Sei Network Integration

### Sei MCP Server
- **Access**: http://localhost:3333
- **Purpose**: Blockchain operations via Model Context Protocol
- **Features**: Wallet operations, smart contracts, DeFi

### Required Setup
1. Set SEI_PRIVATE_KEY in .env
2. MCP Server auto-starts with blockchain integration
3. Use in n8n workflows or agent calls

### Common Blockchain Operations
- Check wallet balance
- Send transactions
- Interact with smart contracts
- DeFi protocol operations

## Common Tasks

### Add OpenAI API Key
1. Edit .env file: `OPENAI_API_KEY=sk-proj-your_key`
2. Restart ElizaOS: `docker restart seiling-eliza`

### Create Database Connection
1. Use these default settings:
   - Host: postgres
   - Port: 5432
   - User: postgres
   - Password: seiling123

### Enable/Disable Services
1. Edit .env: `ENABLE_SERVICE=yes/no`
2. Restart: `docker-compose restart`

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker logs seiling-<service-name>
```

### Backup Data
```bash
# Database backup
docker exec seiling-postgres pg_dump -U postgres seiling > backup.sql

# Complete backup
docker-compose down
cp -r . ../seiling-backup/
``` 