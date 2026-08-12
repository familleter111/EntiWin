#!/bin/sh
set -e

echo "Starting EntiWin (nginx + Next.js standalone server)..."

# exec replaces this shell with supervisord so it becomes PID 1 and receives
# SIGTERM/SIGINT directly (needed for a clean shutdown, see self-hosting.md).
exec supervisord -c /etc/supervisord.conf
