# Marcus Wedding Studio website

Static site for marcusweddingstudio.com. No build step: edit the files and upload them.

```
/
├── index.html, portfolio.html, pricing.html, contact.html, tools.html, project-details.html, 404.html
├── robots.txt, sitemap.xml
├── guides/          – how-to articles
├── css/             – site.css, guide.css
├── js/              – site.js, config.js, films.js, portfolio.js
└── assets/          – icons, og-image, media/showreel.mp4
```

- Edit film list in `js/films.js`
- Site settings (WhatsApp, forms, Umami analytics ID) in `js/config.js`
- Most page behaviour lives in `js/site.js`; portfolio has its own `js/portfolio.js`
