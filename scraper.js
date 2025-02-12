const axios = require('axios');
const cheerio = require('cheerio');

// URL of the page we want to scrape
const url = 'https://example.com';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Example: Extracting the titles of articles
    const articles = [];
    $('article h2').each((index, element) => {
      const title = $(element).text();
      articles.push(title);
    });

    console.log(articles);
  })
  .catch(error => {
    console.error(`There was an error fetching the URL: ${error}`);
  });