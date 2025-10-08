const express = require('express');
const battle = require('./battle');

const app = express();

app.get('/battle', (req, res) => {
  const hero = { name: req.query.hero, type: 'hero' }
  const villain = { name: req.query.villain, type: 'villain' }

  const result = battle(hero, villain)
  res.send(result);
});

// app.listen(3000, () => {
//     console.log(`Example app listening on port 3000}`)
// })

module.exports = app;
