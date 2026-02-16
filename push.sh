#!/bin/bash

# Quick push script for updates

if [ -z "$1" ]; then
    echo "Usage: ./push.sh \"commit message\""
    exit 1
fi

git add -A
git commit -m "$1

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push origin main

echo ""
echo "✅ Pushed to GitHub"
echo "🌐 Will be live at: https://mohri.robbiemed.org"
echo "   (may take 2-3 minutes to deploy)"
