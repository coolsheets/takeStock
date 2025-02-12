const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace with your Alpha Vantage API key
const API_KEY = 'YOUR_API_KEY';

router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data['Error Message']) {
      return res.status(404).render('stock', { error: 'Stock symbol not found' });
    }

    const timeSeries = data['Time Series (5min)'];
    const latestTime = Object.keys(timeSeries)[0];
    const latestData = timeSeries[latestTime];

    const stockInfo = {
      symbol,
      price: latestData['1. open'],
      time: latestTime
    };

    res.render('stock', { stock: stockInfo });
  } catch (error) {
    res.status(500).render('stock', { error: 'Error fetching stock data' });
  }
});

module.exports = router;