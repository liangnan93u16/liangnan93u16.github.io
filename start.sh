#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "=== liangnan93u16.github.io 本地预览 ==="

if ! command -v node &> /dev/null; then
  echo "错误: 未找到 Node.js，请先安装"
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "正在安装依赖..."
  npm install
fi

echo "正在启动开发服务器..."
npm run dev -- --host 127.0.0.1 --port 5173 &
PID=$!

sleep 2

echo ""
echo "========================================"
echo "  本地预览地址: http://127.0.0.1:5173"
echo "========================================"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

wait $PID
