#!/bin/bash
set -e

cd "$(dirname "$0")"

# 先同步远程分支引用，避免 origin/main 不存在导致检测失败
git fetch origin --quiet 2>/dev/null || true

# 检查是否有未推送的 commit
UNPUSHED=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "0")

# 检查工作区是否有变更
HAS_CHANGES=false
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git status --porcelain)" ]; then
  HAS_CHANGES=true
fi

if [ "$HAS_CHANGES" = false ] && [ "$UNPUSHED" = "0" ]; then
  echo "没有待提交的变更，也没有未推送的提交"
  exit 0
fi

# 提交工作区变更（无需参数，直接提交）
if [ "$HAS_CHANGES" = true ]; then
  echo "=== 待提交的变更 ==="
  git status --short
  echo ""

  echo "=== 正在本地编译 ==="
  if ! npm run build; then
    echo ""
    echo "❌ 编译失败，提交已取消"
    exit 1
  fi
  echo ""

  echo "=== 正在提交 ==="
  git add -A
  git commit -m "${1:-update}"
  echo ""
fi

# 推送到远端
echo "=== 正在推送到 GitHub ==="
git push -u origin main

echo ""
echo "✅ 已成功推送到 GitHub"
echo "Actions 将自动构建并部署到 GitHub Pages"
