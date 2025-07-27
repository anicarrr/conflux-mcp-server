# Resources & Templates

> **Essential Templates and Examples for Seiling Buidlbox**

## Table of Contents

- [Overview](#overview)
- [n8n Workflow Templates](#n8n-workflow-templates)
- [Flowise Agent Templates](#flowise-agent-templates)
- [Sei Integration Examples](#sei-integration-examples)
- [Common Use Cases](#common-use-cases)

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

### Template Locations
- **n8n Workflows**: Import via n8n interface
- **Flowise Agents**: Import via Flowise interface  
- **Example Code**: Available in project `/examples` folder
- **Community**: Share and download from community templates

### Getting Started with Templates
1. Choose a template that matches your use case
2. Import into appropriate platform (n8n/Flowise)
3. Configure with your API keys and settings
4. Test and customize as needed
5. Deploy and monitor 