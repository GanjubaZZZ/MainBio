#!/usr/bin/env bash
set -euo pipefail

# Simple deploy script for the static site to a Debian 12 VPS running Nginx.
# Requirements on your local machine: ssh, scp.

HOST="${HOST:-193.169.240.120}"
USER="${USER:-Debian}"
PORT="${PORT:-22}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/oracle-site}"
SITE_NAME="oracle-site"

echo "Deploying to $USER@$HOST:$REMOTE_DIR (port $PORT)"

# Create target directory and set ownership to the SSH user
ssh -p "$PORT" "$USER@$HOST" "sudo mkdir -p '$REMOTE_DIR' && sudo chown -R \"$USER\":\"$USER\" '$REMOTE_DIR'"

# Copy site files
scp -P "$PORT" -r \
  index.html styles scripts assets README.md \
  "$USER@$HOST:$REMOTE_DIR/"

# Ensure nginx is installed
ssh -p "$PORT" "$USER@$HOST" 'if ! command -v nginx >/dev/null 2>&1; then sudo apt-get update -y && sudo apt-get install -y nginx; fi'

# Upload nginx site config and enable it
scp -P "$PORT" server/nginx-bio.conf "$USER@$HOST:/tmp/$SITE_NAME.conf"
ssh -p "$PORT" "$USER@$HOST" "sudo mv /tmp/$SITE_NAME.conf /etc/nginx/sites-available/$SITE_NAME && sudo ln -sf /etc/nginx/sites-available/$SITE_NAME /etc/nginx/sites-enabled/$SITE_NAME && sudo nginx -t && sudo systemctl reload nginx"

echo "Done. Visit: http://$HOST/"

