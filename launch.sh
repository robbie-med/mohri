#!/bin/bash

cd /home/user/time-left

echo "⏳ Time Left - Mortality Calculator"
echo ""
echo "Starting on http://localhost:5175"
echo ""

npm run dev > /tmp/time-left.log 2>&1 &
PID=$!

sleep 2

xdg-open http://localhost:5175 2>/dev/null || firefox http://localhost:5175 2>/dev/null

echo "✅ Running (PID: $PID)"
echo "   Stop: kill $PID"
echo ""
echo "$PID" > /tmp/time-left.pid

wait
