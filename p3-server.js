const express = require('express');
const app = express();

const { coinCombo, coinValue } = require('./p3-module');

const PORT = 8080;
const HOST = 'localhost';

// Serve static file from the public folder
app.use(express.static('public'));

// GET 

app.get('/coincombo', (req, res) => {
  const amount = Number(req.query.amount);

  if (isNaN(amount) || amount < 0) {
    return res.json({ error: 'Invalid amount. Must be a number >= 0.' });
  }

  const result = coinCombo(amount);
  res.json(result);
});

// GET: /coinvalue
app.get('/coinvalue', (req, res) => {
  const {
    pennies = 0,
    nickels = 0,
    dimes = 0,
    quarters = 0,
    halves = 0,
    dollars = 0
  } = req.query;

// Convert query params to numbers, defaulting to 0 if not provided
  const coinCounts = {
    pennies: parseInt(pennies) || 0,
    nickels: parseInt(nickels) || 0,
    dimes: parseInt(dimes) || 0,
    quarters: parseInt(quarters) || 0,
    halves: parseInt(halves) || 0,
    dollars: parseInt(dollars) || 0
  };

  const result = coinValue(coinCounts);
  res.json(result);
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('404: Resource not found');
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});