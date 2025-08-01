####################################
#### Server Configuration ####
####################################

# Server Port
SERVER_PORT=3005

# Server Host (default: 0.0.0.0)
SERVER_HOST=

# Environment Mode (development/production - affects UI and security)
NODE_ENV=development

# Controls whether the web UI is available
# Set to "true" to force enable, "false" to force disable, or leave unset for automatic behavior
# Default: enabled in development, disabled in production
ELIZA_UI_ENABLE=

# Server authentication token for API access
# When set, all /api/* routes require X-API-KEY header with this value
ELIZA_SERVER_AUTH_TOKEN=

# Express Maximum Payload Size (default: 2mb)
EXPRESS_MAX_PAYLOAD=2mb

####################################
#### Database Configuration ####
####################################

# PostgreSQL Connection URL
POSTGRES_URL=

# PGLite Database Directory (or use memory:// for in-memory)
# Alternative to Postgres

####################################
#### AI Model Provider APIs ####
####################################

# OpenAI API Key
OPENAI_API_KEY=

# Google Generative AI API Key
GOOGLE_GENERATIVE_AI_API_KEY=


# Anthropic Claude API Key (Embedding Provider required; will default to local embedding if not provided)
ANTHROPIC_API_KEY=

# OpenRouter API Key (Embedding Provider required; will default to local embedding if not provided)
OPENROUTER_API_KEY=

# Ollama API Endpoint (for local LLM hosting, supports embedding)
#OLLAMA_API_ENDPOINT=

# Optional: Specify models (if you want to override defaults)
#OLLAMA_SMALL_MODEL=gemma3:latest
#OLLAMA_MEDIUM_MODEL=gemma3:latest
#OLLAMA_LARGE_MODEL=gemma3:latest
#OLLAMA_EMBEDDING_MODEL=nomic-embed-text

####################################
#### Character & Content Loading ####
####################################

# Remote Character URLs (comma-separated)
REMOTE_CHARACTER_URLS=



####################################
#### Development & Build Control ####
####################################

# Non-interactive CLI Mode (true/false)
ELIZA_NONINTERACTIVE=

####################################
#### Plugin Control ####
####################################
# Note: for all available / required configuration for specific plugins
# Check agentConfig property on their package.json


# Skip loading the bootstrap plugin (any value)
# Do not change if you are not customizing bootstrap with another plugin
IGNORE_BOOTSTRAP=

DATABASE_URL=file:.eliza/eliza.db

PGLITE_DATA_DIR=.eliza

SEI_PRIVATE_KEY=
SEI_NETWORK=testnet
