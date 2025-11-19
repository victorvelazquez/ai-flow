#!/bin/bash

# AI Bootstrap - AI Tool Setup Script
# Sets up slash commands and configs for specific AI tools

set -e

PROJECT_ROOT="${1:-.}"
AI_TOOL="${2:-all}"

echo "🤖 Setting up AI tool: $AI_TOOL"

setup_claude() {
  echo "📦 Setting up Claude Code..."
  mkdir -p "$PROJECT_ROOT/.claude/commands"

  # Copy slash commands
  if [ -d "$PROJECT_ROOT/.ai-bootstrap/slash-commands/claude" ]; then
    cp -r "$PROJECT_ROOT/.ai-bootstrap/slash-commands/claude/"* "$PROJECT_ROOT/.claude/commands/"
    echo "✅ Claude slash commands installed"
  fi

  # Copy .clauderules
  if [ -f "$PROJECT_ROOT/.ai-bootstrap/templates/.clauderules.template" ]; then
    # Template will be filled by AI during bootstrap
    echo "✅ Claude configuration template ready"
  fi
}

setup_cursor() {
  echo "📦 Setting up Cursor..."
  mkdir -p "$PROJECT_ROOT/.cursor/commands"

  # Copy slash commands
  if [ -d "$PROJECT_ROOT/.ai-bootstrap/slash-commands/cursor" ]; then
    cp -r "$PROJECT_ROOT/.ai-bootstrap/slash-commands/cursor/"* "$PROJECT_ROOT/.cursor/commands/"
    echo "✅ Cursor slash commands installed"
  fi

  # .cursorrules template ready
  echo "✅ Cursor configuration template ready"
}

setup_copilot() {
  echo "📦 Setting up GitHub Copilot..."
  mkdir -p "$PROJECT_ROOT/.github/copilot-commands"

  # Copy slash commands
  if [ -d "$PROJECT_ROOT/.ai-bootstrap/slash-commands/copilot" ]; then
    cp -r "$PROJECT_ROOT/.ai-bootstrap/slash-commands/copilot/"* "$PROJECT_ROOT/.github/copilot-commands/"
    echo "✅ Copilot slash commands installed"
  fi

  # copilot-instructions.md template ready
  echo "✅ Copilot configuration template ready"
}

setup_gemini() {
  echo "📦 Setting up Gemini..."
  mkdir -p "$PROJECT_ROOT/.gemini/commands"
  echo "✅ Gemini configuration template ready"
}

case "$AI_TOOL" in
  claude)
    setup_claude
    ;;
  cursor)
    setup_cursor
    ;;
  copilot)
    setup_copilot
    ;;
  gemini)
    setup_gemini
    ;;
  all)
    setup_claude
    setup_cursor
    setup_copilot
    setup_gemini
    ;;
  *)
    echo "❌ Unknown AI tool: $AI_TOOL"
    echo "Usage: $0 <project-root> <claude|cursor|copilot|gemini|all>"
    exit 1
    ;;
esac

echo "✅ AI tool setup complete for: $AI_TOOL"

exit 0
