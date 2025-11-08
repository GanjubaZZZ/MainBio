# Simple deploy script (Windows PowerShell) for static site to Debian 12 + Nginx
param(
  [string]$Host = "193.169.240.120",
  [string]$User = "Debian",
  [int]$Port = 22,
  [string]$RemoteDir = "/var/www/oracle-site",
  [string]$SiteName = "oracle-site"
)

$ErrorActionPreference = 'Stop'

Write-Host "Deploying to $User@$Host:$RemoteDir (port $Port)" -ForegroundColor Cyan

# Create target dir and set ownership
ssh -p $Port "$User@$Host" "sudo mkdir -p '$RemoteDir' && sudo chown -R '$User':'$User' '$RemoteDir'"

# Copy files
scp -P $Port -r `
  index.html styles scripts assets README.md `
  "$User@$Host:$RemoteDir/"

# Ensure nginx installed
ssh -p $Port "$User@$Host" "if ! command -v nginx >/dev/null 2>&1; then sudo apt-get update -y && sudo apt-get install -y nginx; fi"

# Upload nginx config and enable
scp -P $Port "server/nginx-bio.conf" "$User@$Host:/tmp/$SiteName.conf"
ssh -p $Port "$User@$Host" "sudo mv /tmp/$SiteName.conf /etc/nginx/sites-available/$SiteName && sudo ln -sf /etc/nginx/sites-available/$SiteName /etc/nginx/sites-enabled/$SiteName && sudo nginx -t && sudo systemctl reload nginx"

Write-Host "Done. Visit: http://$Host/" -ForegroundColor Green

