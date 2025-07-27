# User Guide

> **How to Use Seiling Buidlbox**

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
- **Access**: http://localhost:5004
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

## Workflow Examples

### Simple API Integration
1. **Trigger**: HTTP Request node
2. **Process**: Function node to transform data
3. **Action**: Database node to store results

### Scheduled Data Sync
1. **Trigger**: Cron trigger (every hour)
2. **Fetch**: HTTP Request to external API
3. **Transform**: Function node to process data
4. **Store**: PostgreSQL node to save data

### Agent Coordination
1. **Trigger**: Webhook from external system
2. **Agent Call**: HTTP Request to ElizaOS
3. **Process**: Function node to handle response
4. **Notify**: Email or Slack notification

## Agent Configuration

### OpenAI Integration
```javascript
// In n8n Function node
const response = await $http.request({
  method: 'POST',
  url: 'https://api.openai.com/v1/chat/completions',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: {
    model: 'gpt-4',
    messages: [
      { role: 'user', content: 'Hello from n8n!' }
    ]
  }
});

return { response: response.data };
```

### Sei MCP Integration
```javascript
// In n8n Function node
const seiResponse = await $http.request({
  method: 'POST',
  url: 'http://sei-mcp-server:3333/api/wallet/balance',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    address: 'sei1...'
  }
});

return { balance: seiResponse.data };
```

## Best Practices

### Security
- Change default passwords in production
- Use environment variables for API keys
- Regularly update services
- Monitor access logs

### Performance
- Use database connections efficiently
- Implement caching where appropriate
- Monitor resource usage
- Scale services based on load

### Development
- Test workflows in development first
- Use version control for configurations
- Document custom functions
- Create reusable templates

## Troubleshooting

### Service Not Responding
```bash
# Check service status
docker ps --filter "name=seiling-"

# View service logs
docker logs seiling-<service-name>

# Restart service
docker restart seiling-<service-name>
```

### API Key Issues
```bash
# Check environment variables
docker exec seiling-<service> env | grep API_KEY

# Update .env file
nano .env

# Restart affected services
docker compose restart
```

### Database Connection Issues
```bash
# Test database connection
docker exec seiling-postgres pg_isready -U postgres

# Check database logs
docker logs seiling-postgres

# Restart database
docker restart seiling-postgres
```

### Workflow Errors
1. Check n8n execution logs
2. Verify node configurations
3. Test individual nodes
4. Check network connectivity
5. Validate API credentials

## Getting Help

### Documentation
- Check service-specific documentation
- Review error logs for details
- Consult n8n and Flowise documentation

### Community Support
- GitHub Issues for bug reports
- GitHub Discussions for questions
- Discord community (if available)

### Self-Help Tools
```bash
# Health check all services
bash scripts/bootstrap/health_check.sh quick

# Run diagnostics
bash scripts/bootstrap/troubleshoot.sh

# View system status
docker stats
``` 