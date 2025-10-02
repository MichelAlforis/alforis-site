/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.alforis.fr', // à adapter à ton domaine réel
    generateRobotsTxt: true,
    exclude: ['/admin'], // si tu veux exclure certaines routes
    sitemapSize: 5000
  }
  