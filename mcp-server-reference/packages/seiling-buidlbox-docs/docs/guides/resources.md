# Resources & Templates

> **Essential Templates and Examples for Seiling Buidlbox**

## Overview

Ready-to-use templates and examples to get started quickly with Seiling Buidlbox.

## n8n Workflow Templates

### Basic Agent Workflow
- **Purpose**: Simple agent orchestration
- **Trigger**: HTTP webhook
- **Actions**: Call AI agent, process response, store result
- **Use Case**: Basic chatbot automation

### DeFi Price Monitor
- **Purpose**: Monitor token prices and alert
- **Trigger**: Schedule (every 5 minutes)  
- **Actions**: Get price data, check thresholds, send alerts
- **Use Case**: Trading automation alerts

### Data Processing Pipeline
- **Purpose**: Process incoming data through multiple steps
- **Trigger**: Webhook or file upload
- **Actions**: Validate → Transform → Store → Notify
- **Use Case**: Data ingestion automation

### Blockchain Transaction Monitor
- **Purpose**: Monitor wallet transactions
- **Trigger**: Schedule (every minute)
- **Actions**: Check wallet, analyze transactions, update database
- **Use Case**: Portfolio tracking

## Flowise Agent Templates

### Basic Chatbot
- **Components**: OpenAI LLM + Conversation Memory
- **Features**: Simple Q&A with memory
- **Use Case**: Customer support, general assistance

### RAG Knowledge Agent
- **Components**: OpenAI LLM + Vector Store + Document Loader
- **Features**: Question answering from documents
- **Use Case**: Documentation assistant, knowledge base

### DeFi Assistant Agent
- **Components**: OpenAI LLM + Sei MCP Tool + Memory
- **Features**: Blockchain queries, wallet operations
- **Use Case**: DeFi portfolio management, blockchain queries

### Research Agent
- **Components**: OpenAI LLM + Web Scraper + Vector Store
- **Features**: Research topics, gather information, provide summaries
- **Use Case**: Market research, content creation

## Sei Integration Examples

### Basic Wallet Operations
```javascript
// Get wallet balance
const balance = await seiMCP.getBalance(walletAddress);

// Send transaction
const tx = await seiMCP.sendTransaction({
  to: recipientAddress,
  amount: "1000000", // in usei
});
```

### Smart Contract Interaction
```javascript
// Call smart contract
const result = await seiMCP.callContract({
  contractAddress: "sei1...",
  method: "get_price",
  args: []
});
```

### DeFi Protocol Integration
```javascript
// Swap tokens
const swap = await seiMCP.swapTokens({
  tokenIn: "usei",
  tokenOut: "factory/sei.../token",
  amountIn: "1000000"
});
```

## Common Use Cases

### DeFi Portfolio Tracker
1. **Components**: n8n workflow + Sei MCP + Database
2. **Flow**: Schedule → Get balances → Calculate values → Update dashboard
3. **Features**: Real-time portfolio tracking, alerts

### Automated Trading Bot
1. **Components**: n8n + Flowise agent + Sei MCP
2. **Flow**: Price alert → AI analysis → Execute trade → Record results
3. **Features**: AI-driven trading decisions, risk management

### Customer Support Agent
1. **Components**: Flowise chatbot + Knowledge base + n8n workflows
2. **Flow**: User question → RAG search → Response → Escalation if needed
3. **Features**: 24/7 support, human handoff

### Research Assistant
1. **Components**: Flowise agent + Web scraping + Vector database
2. **Flow**: Research request → Gather data → Analyze → Provide summary
3. **Features**: Automated research, source tracking

### Blockchain Analytics
1. **Components**: n8n workflows + Sei MCP + Analytics dashboard
2. **Flow**: Monitor blockchain → Process data → Generate insights → Visualize
3. **Features**: Transaction analysis, trend detection

## Code Examples

### n8n Function Node - OpenAI Integration
```javascript
// OpenAI API call in n8n Function node
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
      { role: 'system', content: 'You are a helpful DeFi assistant.' },
      { role: 'user', content: $input.item.json.message }
    ]
  }
});

return { 
  message: response.data.choices[0].message.content,
  tokens: response.data.usage.total_tokens
};
```

### n8n Function Node - Sei MCP Integration
```javascript
// Sei MCP call in n8n Function node
const seiResponse = await $http.request({
  method: 'POST',
  url: 'http://sei-mcp-server:3333/api/wallet/balance',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    address: $input.item.json.walletAddress
  }
});

return { 
  balance: seiResponse.data.balance,
  address: $input.item.json.walletAddress,
  timestamp: new Date().toISOString()
};
```

### Database Connection - PostgreSQL
```javascript
// PostgreSQL query in n8n
const query = `
  INSERT INTO transactions (address, amount, type, timestamp)
  VALUES ($1, $2, $3, $4)
  RETURNING id;
`;

const result = await $db.postgres.query(query, [
  $input.item.json.address,
  $input.item.json.amount,
  $input.item.json.type,
  new Date()
]);

return { transactionId: result.rows[0].id };
```

## Environment Configuration Examples

### Basic Development Setup
```bash
# .env file for local development
PROFILE=local-dev
BASE_DOMAIN_NAME=localhost

# Required API Keys
OPENAI_API_KEY=sk-proj-your_openai_key
SEI_PRIVATE_KEY=0xyour_sei_private_key

# Services (lightweight setup)
ENABLE_OPENWEBUI=yes
ENABLE_N8N=yes
ENABLE_FLOWISE=yes
ENABLE_SEI_MCP=yes
ENABLE_POSTGRES=yes
ENABLE_REDIS=yes
ENABLE_TRAEFIK=no
ENABLE_OLLAMA=no
```

### Production Setup
```bash
# .env file for production
PROFILE=remote
BASE_DOMAIN_NAME=your-domain.com
TRAEFIK_EMAIL=admin@your-domain.com

# Strong security keys
N8N_ENCRYPTION_KEY=your-strong-32-char-encryption-key
WEBUI_SECRET_KEY=your-strong-secret-key
POSTGRES_PASSWORD=your-strong-database-password

# All services enabled
ENABLE_TRAEFIK=yes
ENABLE_OLLAMA=yes
```

## Docker Compose Examples

### Service Override Example
```yaml
# docker-compose.override.yml
version: '3.8'
services:
  n8n:
    environment:
      - N8N_LOG_LEVEL=debug
    volumes:
      - ./custom-nodes:/home/node/.n8n/custom
      
  postgres:
    environment:
      - POSTGRES_LOG_STATEMENT=all
    ports:
      - "5432:5432"  # Expose for external access
```

### Custom Network Configuration
```yaml
# Custom networking setup
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true

services:
  openwebui:
    networks:
      - frontend
      
  postgres:
    networks:
      - backend
```

## Template Locations

### Getting Templates
- **n8n Workflows**: Import via n8n interface at http://localhost:5001
- **Flowise Agents**: Import via Flowise interface at http://localhost:5003
- **Code Examples**: Available in project documentation
- **Environment Examples**: See `/docs/env-example.md`

### Sharing Templates
- Export workflows from n8n as JSON files
- Export agents from Flowise as JSON files
- Share custom function nodes as code snippets
- Document configuration patterns

### Community Resources
- GitHub repository examples
- Community templates (when available)
- n8n community nodes
- Flowise marketplace (when available)

## Best Practices

### Template Development
1. **Modular Design**: Create reusable components
2. **Error Handling**: Add proper error handling
3. **Documentation**: Document template usage
4. **Testing**: Test templates thoroughly
5. **Versioning**: Track template versions

### Security Considerations
1. **API Keys**: Use environment variables
2. **Credentials**: Never hardcode credentials
3. **Validation**: Validate all inputs
4. **Logging**: Avoid logging sensitive data
5. **Access Control**: Implement proper permissions

### Performance Optimization
1. **Caching**: Implement caching where appropriate
2. **Batching**: Process data in batches
3. **Rate Limiting**: Respect API rate limits
4. **Resource Management**: Monitor resource usage
5. **Optimization**: Optimize database queries

---

**Ready to build with templates?** Import these examples and customize them for your specific needs! 