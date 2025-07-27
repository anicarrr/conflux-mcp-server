# Testing Checklist for Seiling Buidlbox Bootstrap System

This checklist complements the automated test suite and provides manual testing scenarios to validate all system improvements.

## Quick Start Testing

### 1. Run Automated Test Suite
```bash
# Run the comprehensive test suite
./scripts/bootstrap/test_suite.sh
```

### 2. Basic Health Check Validation
```bash
# Test health check functionality
./scripts/bootstrap/health_check.sh help
./scripts/bootstrap/health_check.sh quick
./scripts/bootstrap/health_check.sh full
```

## Manual Testing Scenarios

### A. Fresh Installation Testing

#### Scenario 1: Complete Fresh Setup
```bash
# Backup current setup
cp .env .env.backup 2>/dev/null || true

# Clean slate test
rm -f .env
./bootstrap.sh
# Select "default" profile when prompted
```

**Validation:**
- [ ] ASCII art welcome displays correctly
- [ ] Default profile completes without prompts
- [ ] All services start successfully
- [ ] Health check reports all services healthy
- [ ] Access URLs work in browser

#### Scenario 2: Local Development Setup
```bash
# Clean slate test
rm -f .env
./bootstrap.sh
# Select "local-dev" profile when prompted
```

**Validation:**
- [ ] Wallet generation works non-interactively
- [ ] No Ollama service deployed (unless explicitly enabled)
- [ ] All other services start successfully
- [ ] Localhost URLs accessible

### B. Health Check System Testing

#### Scenario 3: Health Check Accuracy
```bash
# Test health checks with running services
docker ps --filter "name=seiling-"
./scripts/bootstrap/health_check.sh full
```

**Validation:**
- [ ] Shows accurate container status
- [ ] Correctly identifies healthy vs starting services
- [ ] Qdrant shows as healthy (not unhealthy anymore)
- [ ] Database services properly checked
- [ ] Performance is under 30 seconds

#### Scenario 4: Service Restart Validation
```bash
# Test service restart and health recovery
docker restart seiling-n8n
sleep 10
./scripts/bootstrap/health_check.sh quick
```

**Validation:**
- [ ] Health check detects service restart
- [ ] Shows "starting" status during startup
- [ ] Eventually reports healthy status
- [ ] No false positive errors

### C. Wallet Generation Testing

#### Scenario 5: Wallet Generation Methods
```bash
# Test different wallet generation methods
./scripts/bootstrap/generate_wallet.sh --test
./scripts/bootstrap/generate_wallet.sh --non-interactive
```

**Validation:**
- [ ] Test mode shows available methods
- [ ] Non-interactive mode doesn't hang
- [ ] Generated keys are valid format
- [ ] No prompts in non-interactive mode
- [ ] Windows/Git Bash compatibility

#### Scenario 6: Wallet Integration Testing
```bash
# Test wallet generation in full bootstrap
rm -f .env
echo -e "\nlocal-dev\ny\n" | ./scripts/bootstrap/configure_env.sh
```

**Validation:**
- [ ] Wallet generation completes automatically
- [ ] Private key saved to .env correctly
- [ ] No hanging or timeout issues
- [ ] Process completes in reasonable time

### D. Environment Configuration Testing

#### Scenario 7: Custom Port Configuration
```bash
# Test custom port assignment
rm -f .env
# Manually create .env with custom ports
cat > .env << EOF
PROFILE=custom
N8N_PORT=15678
OPENWEBUI_PORT=13000
FLOWISE_PORT=13001
BASE_DOMAIN_NAME=localhost
EOF

./scripts/bootstrap/deploy_services.sh
```

**Validation:**
- [ ] Services start on custom ports
- [ ] Health check uses correct ports
- [ ] Access URLs show custom ports
- [ ] No port conflicts

#### Scenario 8: Domain Configuration Testing
```bash
# Test custom domain setup (local testing)
rm -f .env
# Create .env with custom domain
cat > .env << EOF
PROFILE=custom
BASE_DOMAIN_NAME=mydomain.local
EOF
```

**Validation:**
- [ ] All scripts use custom domain
- [ ] Health checks target correct domain
- [ ] URLs generated correctly
- [ ] No hardcoded localhost references

### E. Service Management Testing

#### Scenario 9: Service Menu Functionality
```bash
# Test service management menu
./scripts/bootstrap/deploy_services.sh
# Use interactive menu to test options 1-6
```

**Validation:**
- [ ] Menu displays correctly
- [ ] Option 1: Start Services works
- [ ] Option 2: Stop Services works
- [ ] Option 3: Health Check uses new script
- [ ] Option 4: Logs display correctly
- [ ] Option 5: Troubleshooting works
- [ ] Option 6: Exit works cleanly

#### Scenario 10: Service Recovery Testing
```bash
# Test service recovery capabilities
docker stop seiling-postgres
./scripts/bootstrap/troubleshoot.sh
# Use menu option 2 (Restart all services)
```

**Validation:**
- [ ] Troubleshooting detects failed services
- [ ] Service restart option works
- [ ] Health check confirms recovery
- [ ] All dependent services recover

### F. Error Handling Testing

#### Scenario 11: Network Issues Simulation
```bash
# Test behavior with network issues
# Temporarily block network (if safe to do so)
./scripts/bootstrap/health_check.sh quick
```

**Validation:**
- [ ] Graceful handling of network timeouts
- [ ] Clear error messages
- [ ] No script crashes
- [ ] Proper fallback behavior

#### Scenario 12: Docker Issues Simulation
```bash
# Test behavior when Docker is unavailable
sudo systemctl stop docker  # Linux
# or stop Docker Desktop  # Windows/Mac
./scripts/bootstrap/health_check.sh quick
./scripts/bootstrap/troubleshoot.sh
```

**Validation:**
- [ ] Clear error messages about Docker unavailability
- [ ] Scripts don't crash
- [ ] Helpful guidance provided
- [ ] Graceful degradation

### G. Integration Testing

#### Scenario 13: Complete Bootstrap Workflow
```bash
# Full end-to-end test
rm -f .env
./bootstrap.sh
# Select "full-local" profile
# Wait for complete deployment
./scripts/bootstrap/health_check.sh full
```

**Validation:**
- [ ] Entire workflow completes successfully
- [ ] All services deployed and healthy
- [ ] No user intervention required after profile selection
- [ ] Performance within acceptable limits
- [ ] All access URLs functional

#### Scenario 14: Profile Switching Test
```bash
# Test switching between profiles
./bootstrap.sh  # Select "default"
# Note services deployed
./bootstrap.sh  # Select "full-local"
# Verify configuration changes
```

**Validation:**
- [ ] Profile changes applied correctly
- [ ] Services reconfigured appropriately
- [ ] No conflicts between profiles
- [ ] Clean transitions

## Performance Testing

### P1. Startup Performance
```bash
# Measure bootstrap performance
time ./bootstrap.sh  # Select "default"
```

**Targets:**
- [ ] Complete bootstrap < 5 minutes
- [ ] Health check < 30 seconds
- [ ] Service startup < 2 minutes

### P2. Resource Usage
```bash
# Monitor resource usage during deployment
docker stats --no-stream
./scripts/bootstrap/health_check.sh full
```

**Validation:**
- [ ] Memory usage within reasonable limits
- [ ] CPU usage spikes are temporary
- [ ] Network usage appropriate
- [ ] Disk space sufficient

## Security Testing

### S1. Credential Management
```bash
# Verify credential security
cat .env | grep -E "(API_KEY|PRIVATE_KEY|PASSWORD)"
```

**Validation:**
- [ ] No credentials in logs
- [ ] .env permissions appropriate
- [ ] No credentials in git history
- [ ] Placeholder values for sensitive data

### S2. Network Security
```bash
# Check exposed ports
netstat -tulpn | grep docker
```

**Validation:**
- [ ] Only necessary ports exposed
- [ ] No unexpected services accessible
- [ ] Firewall rules appropriate
- [ ] SSL/TLS configured where needed

## Checklist Summary

### Pre-Release Validation
- [ ] All automated tests pass (`./scripts/bootstrap/test_suite.sh`)
- [ ] Fresh installation works on clean system
- [ ] All three main profiles work correctly
- [ ] Health check system reports accurately
- [ ] Service management menu fully functional
- [ ] Documentation updated and accurate
- [ ] No hardcoded values remain
- [ ] Error handling graceful throughout
- [ ] Performance within acceptable ranges
- [ ] Security measures properly implemented

### Sign-off Criteria
- [ ] **Functional**: All core features work as designed
- [ ] **Reliable**: System handles errors gracefully
- [ ] **Performant**: Operations complete in reasonable time
- [ ] **Maintainable**: Code is clean and well-documented
- [ ] **Secure**: No security vulnerabilities introduced
- [ ] **User-friendly**: Clear documentation and error messages

---

## Testing Notes

- Run tests in isolated environment when possible
- Document any failures with reproduction steps
- Test on multiple platforms if available (Windows, macOS, Linux)
- Keep backup of working configuration before testing
- Monitor system resources during intensive tests
- Verify rollback procedures work if needed 