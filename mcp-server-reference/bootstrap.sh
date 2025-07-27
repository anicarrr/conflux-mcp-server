#!/bin/bash
set -e

# Seiling Buidlbox Bootstrap Script
# 
# Quick Start: ./bootstrap.sh (interactive mode)
# Auto Mode: ./bootstrap.sh -auto (non-interactive with defaults)
# Test Mode: ./bootstrap.sh -test (mock deployment for testing)
# Combined: ./bootstrap.sh -auto -test (test auto mode without deployment)
#
# The script will guide you through:
# 1. OS detection and dependency installation
# 2. Project setup and Git submodules
# 3. Environment configuration (with optional wallet generation)
# 4. Service deployment with Docker Compose

# Get script directory and load shared configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BOOTSTRAP_DIR="$SCRIPT_DIR/scripts/bootstrap"

# Initialize default values for CLI flags
TEST_MODE=false
AUTO_MODE=false
QUIET_MODE=false

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -test|--test)
                TEST_MODE=true
                export TEST_MODE
                shift
                ;;
            -auto|--auto)
                AUTO_MODE=true
                export AUTO_MODE
                shift
                ;;
            -quiet|--quiet)
                QUIET_MODE=true
                export QUIET_MODE
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                echo "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Export variables for child scripts
    export TEST_MODE AUTO_MODE QUIET_MODE
}

# Show help message
show_help() {
    cat << 'EOF'
Seiling Buidlbox Bootstrap Script

USAGE:
    ./bootstrap.sh [OPTIONS]

OPTIONS:
    -test, --test     Run in test mode (mock deployment, no actual services started)
    -auto, --auto     Run in automatic mode (non-interactive, use defaults)
    -quiet, --quiet   Run in quiet mode (minimal output)
    -h, --help        Show this help message

EXAMPLES:
    ./bootstrap.sh                  Interactive setup with user prompts
    ./bootstrap.sh -auto            Automatic setup with default configuration
    ./bootstrap.sh -test            Test mode - validate setup without deployment
    ./bootstrap.sh -auto -test      Test automatic mode without actual deployment
    ./bootstrap.sh -auto -quiet     Silent automatic setup

MODES:
    Interactive (default): User selects profile and provides input
    Auto (-auto): Uses 'default' profile with placeholder credentials
    Test (-test): Simulates all operations without actual deployment
    Quiet (-quiet): Minimal output, errors only

The script sets up a complete Seiling development environment including:
- Docker services (n8n, OpenWebUI, Flowise, Eliza, Cambrian, etc.)
- Database systems (PostgreSQL, Redis, Qdrant, Neo4j)
- Environment configuration and wallet generation
- Health monitoring and troubleshooting tools
EOF
}

# Basic fallback functions (will be replaced when shared config is loaded)
print_success() { echo "[SUCCESS] $1"; }
print_error() { echo "[ERROR] $1" >&2; }
print_warning() { echo "[WARNING] $1"; }
print_info() { echo "[INFO] $1"; }
print_step() { echo "[STEP] $1"; }
print_header() { echo "=== $1 ==="; }

show_welcome() {
    # Always show ASCII art unless in quiet mode
    if [ "$QUIET_MODE" != "true" ]; then
        clear
        echo ""
        if [ -f "ASCII-ART.TXT" ]; then
            cat ASCII-ART.TXT
        else
            print_banner "SEILING"
        fi
        echo ""
    fi
    
    # Skip interactive parts in auto or quiet mode
    if [ "$QUIET_MODE" = "true" ] || [ "$AUTO_MODE" = "true" ]; then
        return
    fi
    
    print_header "Welcome to Seiling Buidlbox Bootstrap Setup!"
    
    echo "This script will set up your complete Seiling development environment:"
    print_indent 1 "🔍 Detect your operating system and install dependencies"
    print_indent 1 "📦 Set up project structure and Git submodules"
    print_indent 1 "⚙️  Configure environment variables and generate wallets"
    print_indent 1 "🚀 Deploy all services with Docker Compose"
    echo ""
    
    if [ "$TEST_MODE" = "true" ]; then
        print_warning "Running in TEST MODE - no actual deployment will occur"
    fi
    
    print_info "Quick Start: Select 'default' profile for fastest setup"
    print_info "Custom Setup: Choose specific profiles for targeted configurations"
    echo ""
    
    read -p "Press Enter to continue..."
    echo ""
}

# Main execution function
main() {
    # Parse command line arguments first
    parse_args "$@"
    
    # Export variables immediately after parsing
    export TEST_MODE AUTO_MODE QUIET_MODE
    
    # Load shared configuration and UI components after parsing args
    if [ -f "$BOOTSTRAP_DIR/shared_config.sh" ]; then
        source "$BOOTSTRAP_DIR/shared_config.sh"
    fi
    
    # Set up bootstrap environment
    export BOOTSTRAP_START_TIME=$(date +%s)
    
    # Save configuration for child scripts
    save_bootstrap_config
    
    # Set up error handling
    setup_error_handling
    
    # Show configuration summary
    print_config_summary
    
    # Show welcome message (unless in auto/quiet mode)
    show_welcome
    
    # Validate environment before proceeding
    if ! validate_bootstrap_environment; then
        print_mode_aware "error" "Environment validation failed. Please fix the issues above and try again."
        exit 1
    fi

    # Execute bootstrap steps with progress tracking
    start_bootstrap_step "OS Detection"
    if ! execute_with_output "bash '$BOOTSTRAP_DIR/detect_os.sh'" "Detecting operating system"; then
        print_mode_aware "error" "OS detection failed. Exiting."
        exit 1
    fi

    start_bootstrap_step "Dependency Installation"
    if ! execute_with_output "bash '$BOOTSTRAP_DIR/install_deps.sh'" "Installing dependencies"; then
        print_mode_aware "error" "Dependency installation failed. Exiting."
        exit 1
    fi

    start_bootstrap_step "Project Setup"
    if ! execute_with_output "bash '$BOOTSTRAP_DIR/project_setup.sh'" "Setting up project structure"; then
        print_mode_aware "error" "Project setup failed. Exiting."
        exit 1
    fi

    start_bootstrap_step "Environment Configuration"
    if ! execute_with_output "bash '$BOOTSTRAP_DIR/configure_env.sh'" "Configuring environment"; then
        print_mode_aware "error" "Environment configuration failed. Exiting."
        exit 1
    fi

    start_bootstrap_step "Service Deployment"
    if [ "$AUTO_MODE" = "true" ]; then
        # Calculate default timeout based on profile
        local default_timeout=1800  # 30 minutes for non-default profiles
        if [ "${PROFILE:-}" = "default" ]; then
            default_timeout=0  # Unlimited timeout for default profile
        fi
        local deploy_timeout=${DEPLOY_TIMEOUT:-$default_timeout}
        
        if [ "$deploy_timeout" = "0" ]; then
            print_mode_aware "info" "Deploying services (no timeout limit - reliable for any connection speed)..."
        else
            local timeout_mins=$((deploy_timeout / 60))
            print_mode_aware "info" "Deploying services (this may take up to ${timeout_mins} minutes on first run)..."
        fi
        
        if [ -n "${DEPLOY_TIMEOUT:-}" ] && [ "${DEPLOY_TIMEOUT}" != "$default_timeout" ]; then
            if [ "$DEPLOY_TIMEOUT" = "0" ]; then
                print_mode_aware "info" "Using custom unlimited timeout (DEPLOY_TIMEOUT=0)"
            else
                local custom_mins=$((DEPLOY_TIMEOUT / 60))
                print_mode_aware "info" "Using custom timeout: ${DEPLOY_TIMEOUT}s (${custom_mins} minutes)"
            fi
        fi
    fi
    if ! execute_with_output "bash '$BOOTSTRAP_DIR/deploy_services.sh'" "Deploying services"; then
        print_mode_aware "error" "Service deployment failed. Exiting."
        exit 1
    fi

    # Calculate total time
    local end_time=$(date +%s)
    local total_time=$((end_time - BOOTSTRAP_START_TIME))
    local minutes=$((total_time / 60))
    local seconds=$((total_time % 60))
    
    # Show completion message
    if [ "$TEST_MODE" = "true" ]; then
        print_summary_box "TEST COMPLETE" "Bootstrap test completed successfully!
All validation checks passed.
Total time: ${minutes}m ${seconds}s" "success"
        
        if [ "$AUTO_MODE" = "true" ]; then
            print_mode_aware "success" "Auto test mode completed - all systems validated"
        else
            print_mode_aware "success" "Test mode completed - configuration and setup validated"
        fi
    else
        print_summary_box "BOOTSTRAP COMPLETE" "All services are up and running!
Setup completed successfully.
Total time: ${minutes}m ${seconds}s" "success"
        
        print_section "Next Steps"
        
        # Construct URLs based on local vs remote mode
        if [ "${BASE_DOMAIN_NAME:-localhost}" = "localhost" ]; then
            # Local mode: use ports
            print_url "OpenWebUI" "http://localhost:${OPENWEBUI_PORT:-5002}"
            print_url "n8n" "http://localhost:${N8N_PORT:-5001}"
            print_url "Flowise" "http://localhost:${FLOWISE_PORT:-5003}"
        else
            # Remote mode: use subdomains with HTTPS
            print_url "OpenWebUI" "https://${OPENWEBUI_SUBDOMAIN:-chat}.${BASE_DOMAIN_NAME}"
            print_url "n8n" "https://${N8N_SUBDOMAIN:-n8n}.${BASE_DOMAIN_NAME}"
            print_url "Flowise" "https://${FLOWISE_SUBDOMAIN:-flowise}.${BASE_DOMAIN_NAME}"
        fi
        echo ""
        print_command "docker compose ps  # Check service status"
        print_command "bash scripts/bootstrap/health_check.sh  # Run health check"
        print_command "bash scripts/bootstrap/troubleshoot.sh  # If you encounter issues"
    fi
    
    # Cleanup
    cleanup_bootstrap_config
}

# Run main function with all arguments
main "$@" 