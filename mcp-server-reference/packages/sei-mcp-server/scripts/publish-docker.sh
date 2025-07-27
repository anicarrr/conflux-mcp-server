#!/bin/bash

# SEI MCP Server Docker Hub Publishing Script
# Usage: ./scripts/publish-docker.sh [DOCKER_HUB_USERNAME] [TAG]

set -e

# Configuration
DOCKER_HUB_USERNAME=${1:-"your-dockerhub-username"}
TAG=${2:-"latest"}
IMAGE_NAME="sei-mcp-server"
FULL_IMAGE_NAME="${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${TAG}"

echo "🐳 SEI MCP Server Docker Publishing"
echo "=================================="
echo "Docker Hub Username: ${DOCKER_HUB_USERNAME}"
echo "Image Name: ${IMAGE_NAME}"
echo "Tag: ${TAG}"
echo "Full Image: ${FULL_IMAGE_NAME}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running"
    exit 1
fi

# Check if logged in to Docker Hub
if ! docker info | grep -q "Username:"; then
    echo "⚠️  Not logged in to Docker Hub. Please run:"
    echo "   docker login"
    exit 1
fi

echo "🔨 Building Docker image..."
docker build -t "${IMAGE_NAME}:${TAG}" .

echo "🏷️  Tagging image for Docker Hub..."
docker tag "${IMAGE_NAME}:${TAG}" "${FULL_IMAGE_NAME}"

echo "🧪 Testing STDIO mode..."
timeout 10s docker run -i --rm -e MCP_MODE=stdio -e LOG_LEVEL=error "${IMAGE_NAME}:${TAG}" || true

echo "🧪 Testing HTTP mode..."
docker run -d --name test-sei-mcp -p 3003:3002 "${IMAGE_NAME}:${TAG}"
sleep 5

# Test health endpoint
if curl -f http://localhost:3003/health > /dev/null 2>&1; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
    docker logs test-sei-mcp
    docker stop test-sei-mcp
    docker rm test-sei-mcp
    exit 1
fi

# Cleanup test container
docker stop test-sei-mcp
docker rm test-sei-mcp

echo "📤 Pushing to Docker Hub..."
docker push "${FULL_IMAGE_NAME}"

echo ""
echo "✅ Successfully published ${FULL_IMAGE_NAME}"
echo ""
echo "📋 Usage Instructions:"
echo "====================="
echo ""
echo "For MCP clients, use this configuration:"
echo ""
echo "STDIO Mode (Recommended):"
echo "{"
echo "  \"mcpServers\": {"
echo "    \"sei-mcp-server\": {"
echo "      \"command\": \"docker\","
echo "      \"args\": ["
echo "        \"run\","
echo "        \"-i\","
echo "        \"--rm\","
echo "        \"-e\", \"MCP_MODE=stdio\","
echo "        \"-e\", \"LOG_LEVEL=error\","
echo "        \"-e\", \"DISABLE_CONSOLE_OUTPUT=true\","
echo "        \"${FULL_IMAGE_NAME}\""
echo "      ],"
echo "      \"env\": {"
echo "        \"PRIVATE_KEY\": \"0x...\""
echo "      }"
echo "    }"
echo "  }"
echo "}"
echo ""
echo "HTTP Mode:"
echo "docker run -d -p 3002:3002 ${FULL_IMAGE_NAME}"
echo ""
echo "🔗 Docker Hub: https://hub.docker.com/r/${DOCKER_HUB_USERNAME}/${IMAGE_NAME}" 