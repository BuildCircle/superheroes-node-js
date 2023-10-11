const express = require('express');
const battle = require('./battle');

const app = express();

app.get('/battle', (req, res) => {

  const result = battle(req.query.hero, req.query.villain)
  res.send(result);
  
});

module.exports = app;