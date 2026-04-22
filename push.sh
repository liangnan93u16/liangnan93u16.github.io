#!/bin/bash
set -e

cd "$(dirname "$0")"

# 检查是否有变更
if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo "没有待提交的变更"
  exit 0
fi

# 显示变更摘要
echo "=== 待提交的变更 ==="
git status --short
echo ""

# 提交信息
if [ -z "$1" ]; then
  echo "用法: ./push.sh '提交说明'"
  echo "或使用默认提交信息: ./push.sh -d"
  exit 1
fi

MSG="$1"

# 提交并推送
echo "=== 正在提交 ==="
git add -A
git commit -m "$MSG"

echo ""
echo "=== 正在推送到 GitHub ==="
git push origin main

echo ""
echo "✅ 已成功推送到 GitHub"
echo " Actions 将自动构建并部署到 GitHub Pages"
