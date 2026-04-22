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

# 提交工作区变更（需要参数）
if [ "$HAS_CHANGES" = true ]; then
  if [ -z "$1" ]; then
    echo "工作区有变更，需要提供提交说明"
    echo "用法: ./push.sh '提交说明'"
    exit 1
  fi

  echo "=== 待提交的变更 ==="
  git status --short
  echo ""

  echo "=== 正在提交 ==="
  git add -A
  git commit -m "$1"
  echo ""
fi

# 推送到远端
echo "=== 正在推送到 GitHub ==="
git push -u origin main

echo ""
echo "✅ 已成功推送到 GitHub"
echo "Actions 将自动构建并部署到 GitHub Pages"
