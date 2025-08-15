# Environment Variables Configuration Guide

This guide explains how to configure environment variables for the Conflux MCP Server in different modes.

## 🚀 **Quick Start**

### Stdio Mode (Recommended for Development)
```json
{
  "mcpServers": {
    "conflux-mcp-server": {
      "command": "node",
      "args": ["./build/index.js"],
      "cwd": "C:\\Users\\username\\Desktop\\conflux-mcp-server-main",
      "env": {
        "NODE_ENV": "development",
        "LOG_LEVEL": "debug",
        "PRIVATE_KEY": "your_actual_private_key_here"
      }
    }
  }
}
```

### HTTP Mode (Recommended for Production)
```json
{
  "mcpServers": {
    "conflux-mcp-server": {
      "command": "node",
      "args": ["./build/server/http-server.js"],
      "cwd": "C:\\Users\\username\\Desktop\\conflux-mcp-server-main",
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "info",
        "PORT": "3000",
        "PRIVATE_KEY": "your_actual_private_key_here"
      }
    }
  }
}
```

## 🔧 **Available Environment Variables**

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `NODE_ENV` | `development` | No | Environment mode (development/production/test) |
| `LOG_LEVEL` | `info` | No | Logging verbosity (error/warn/info/debug) |
| `PORT` | `3000` | No | HTTP server port (HTTP mode only) |
| `PRIVATE_KEY` | - | Yes* | Your Conflux private key for transactions |

*Required for transfer tools, optional for read-only operations

## 📁 **Path Configuration by Operating System**

### Windows
```json
"cwd": "C:\\Users\\username\\Desktop\\conflux-mcp-server-main"
```
**Note**: Use double backslashes `\\` or forward slashes `/`

### macOS/Linux
```json
"cwd": "/home/username/Desktop/conflux-mcp-server-main"
```
**Note**: Use forward slashes `/`

### Alternative Windows Format
```json
"cwd": "C:/Users/username/Desktop/conflux-mcp-server-main"
```
**Note**: Forward slashes work on Windows too

## 🔐 **Private Key Configuration**

### 1. **Get Your Private Key**
- Export from your wallet (MetaMask, etc.)
- **Never share or commit to version control**

### 2. **Add to Configuration**
```json
"env": {
  "PRIVATE_KEY": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
}
```

### 3. **Security Best Practices**
- Add `.cursor-config.json` to `.gitignore`
- Use environment variables for sensitive data
- Consider using a template file for sharing

## 📋 **Configuration Examples by Use Case**

### Development (Stdio Mode)
```json
{
  "mcpServers": {
    "conflux-mcp-server": {
      "command": "node",
      "args": ["./build/index.js"],
      "cwd": "C:\\Users\\username\\Desktop\\conflux-mcp-server-main",
      "env": {
        "NODE_ENV": "development",
        "LOG_LEVEL": "debug",
        "PRIVATE_KEY": "your_private_key"
      }
    }
  }
}
```

### Production (HTTP Mode)
```json
{
  "mcpServers": {
    "conflux-mcp-server": {
      "command": "node",
      "args": ["./build/server/http-server.js"],
      "cwd": "C:\\Users\\username\\Desktop\\conflux-mcp-server-main",
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "warn",
        "PORT": "8080",
        "PRIVATE_KEY": "your_private_key"
      }
    }
  }
}
```

### Testing (Stdio Mode)
```json
{
  "mcpServers": {
    "conflux-mcp-server": {
      "command": "node",
      "args": ["./build/index.js"],
      "cwd": "C:\\Users\\username\\Desktop\\conflux-mcp-server-main",
      "env": {
        "NODE_ENV": "test",
        "LOG_LEVEL": "error",
        "PRIVATE_KEY": "test_private_key"
      }
    }
  }
}
```

## 🚨 **Troubleshooting**

### Environment Variables Not Working?
1. **Restart Cursor** completely after changing config
2. **Check syntax** - ensure JSON is valid
3. **Verify paths** - use correct operating system format
4. **Check permissions** - ensure files are accessible

### Common Issues
| Issue | Solution |
|-------|----------|
| Private key not found | Add PRIVATE_KEY to env section |
| Path not found | Update cwd to correct path |
| Permission denied | Check file permissions |
| Tools not loading | Restart Cursor after config changes |

### Debug Mode
Set `LOG_LEVEL=debug` for verbose logging:
```json
"env": {
  "LOG_LEVEL": "debug"
}
```

## 🔄 **After Configuration Changes**

1. **Save** your `.cursor-config.json` file
2. **Restart Cursor** completely
3. **Check MCP Tools** panel for status
4. **Test a tool** to verify configuration

## 📚 **Template Files**

### Create a Template
```json
{
  "mcpServers": {
    "conflux-mcp-server": {
      "command": "node",
      "args": ["./build/index.js"],
      "cwd": "C:\\Users\\USERNAME\\Desktop\\conflux-mcp-server-main",
      "env": {
        "NODE_ENV": "development",
        "LOG_LEVEL": "debug",
        "PRIVATE_KEY": "YOUR_PRIVATE_KEY_HERE"
      }
    }
  }
}
```

### Share Template
- Commit template files to version control
- Keep actual config files private
- Document required environment variables

## ✅ **Verification Checklist**

- [ ] Environment variables added to `env` section
- [ ] Paths configured for your operating system
- [ ] Private key added (if using transfer tools)
- [ ] Cursor restarted after configuration changes
- [ ] MCP Tools panel shows "27 tools available"
- [ ] Test tools work correctly

## 🎯 **Next Steps**

1. **Copy appropriate config** to `.cursor-config.json`
2. **Update paths** for your system
3. **Add your private key** if needed
4. **Restart Cursor**
5. **Test the tools**

Your Conflux MCP Server should now be fully configured and ready to use!