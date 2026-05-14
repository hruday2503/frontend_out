#!/bin/bash

# ── Spindle Tools · Start Script ──────────────────────────────────────────────
# Starts FastAPI backend on :8000 and Vite frontend on :3000 simultaneously.

echo ""
echo "  🌀  Spindle Quantum Tools"
echo "  Starting backend + frontend..."
echo ""

# ── Backend ───────────────────────────────────────────────────────────────────
cd "$(dirname "$0")/backend"

# Install Python deps if needed
if ! python3 -c "import fastapi" 2>/dev/null; then
  echo "  📦  Installing Python dependencies..."
  pip3 install -r requirements.txt -q
fi

# Start FastAPI in background
echo "  🔧  Backend  → http://127.0.0.1:8000"
uvicorn main:app --reload --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

# ── Frontend ──────────────────────────────────────────────────────────────────
cd "$(dirname "$0")"

echo "  🎨  Frontend → http://localhost:3000"
echo ""
npm run dev &
FRONTEND_PID=$!

# ── Cleanup on Ctrl+C ─────────────────────────────────────────────────────────
trap "echo ''; echo '  Stopping...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT

wait
