const express = require('express');
const battle = require('./battle');

const app = express();

app.get('/battle', (req, res) => {

  if(typeof req.query.hero === 'string' && typeof req.query.villain === 'string'){
    const result = battle(req.query.hero, req.query.villain)
    res.send(result);
  }
  res.send(400);
});

module.exports = app;