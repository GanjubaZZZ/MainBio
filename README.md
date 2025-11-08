# Minimal Biography Website (RU/EN)

A simple, minimalist, one‑page biography site with a RU/EN language toggle. Uses plain HTML/CSS/JS (no build tools).

## Quick start

- Open `index.html` in a browser to preview locally.
- Edit `scripts/main.js` (EDIT THIS SECTION) to set:
  - `nickname`: your public nickname used across the site
  - RU/EN text content for tagline, About, and meta description
  - Contact links (email, Telegram, GitHub, and optional Other)

## Where to edit

- `scripts/main.js`: All customizable text and links are in the `SITE` object at the top.
- `styles/main.css`: Colors, spacing, and typography.
- `index.html`: Structure/markup (you rarely need to change this).

## Language toggle
## sad
- The site detects your browser language (RU if it starts with `ru`), but stores the chosen language in `localStorage` under the key `lang`.
- Use the RU/EN buttons in the header to switch languages.

## Contact links

Set the following in `SITE.links` (empty ones are hidden automatically):

- `email`: `nickname@example.com` or `mailto:nickname@example.com`
- `telegram`: `@handle` or a full `https://t.me/handle`
- `github`: `username` or full `https://github.com/username`
- `other.url`: any additional link; `other.label` has RU/EN labels

## Deploy to your VPS (no domain yet)

Example using Nginx to serve static files over HTTP at your server IP.

1) Copy files to your VPS, e.g. to `/var/www/bio-site`:

```bash
# From your local machine
scp -r index.html styles scripts assets README.md user@your-vps:/var/www/bio-site/
```

2) Create an Nginx server block (on the VPS), e.g. `/etc/nginx/sites-available/bio-site`:

```nginx
server {
    listen 80;
    server_name _;  # no domain yet; responds on server IP

    root /var/www/bio-site;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

3) Enable and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/bio-site /etc/nginx/sites-enabled/bio-site
sudo nginx -t && sudo systemctl reload nginx
```

- Open `http://YOUR_SERVER_IP/` to view the site.
- When you get a domain, change `server_name _;` to `server_name yourdomain.com;`, update DNS A record to your VPS IP, and (optionally) enable HTTPS via Certbot:

```bash
sudo apt update && sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Notes

- The site is static and works without JavaScript for basic content, but language switching requires JS.
- Keep copy short for a clean minimalist feel. Adjust spacing/colors in `styles/main.css` if desired.
