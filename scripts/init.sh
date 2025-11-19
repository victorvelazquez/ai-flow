#!/bin/bash

# AI Bootstrap - Initialization Script
# This script sets up the .ai-bootstrap directory structure

set -e

PROJECT_ROOT="${1:-.}"
BOOTSTRAP_DIR="$PROJECT_ROOT/.ai-bootstrap"

echo "🚀 Initializing AI Bootstrap in $PROJECT_ROOT"

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p "$BOOTSTRAP_DIR/core"
mkdir -p "$BOOTSTRAP_DIR/prompts"
mkdir -p "$BOOTSTRAP_DIR/templates/docs"
mkdir -p "$BOOTSTRAP_DIR/templates/specs"
mkdir -p "$BOOTSTRAP_DIR/scripts"

# Copy configuration
echo "⚙️ Creating configuration..."
cat > "$BOOTSTRAP_DIR/core/config.json" <<EOF
{
  "version": "1.0.0",
  "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "backend": true,
  "frontend": false
}
EOF

echo "✅ Directory structure created successfully"

exit 0
