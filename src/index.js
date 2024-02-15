const express = require('express');
const battle = require('./battle');

const app = express();

app.get('/battle', (req, res) => {
  const result = battle(req.query.hero, req.query.villain)
  res.send(result);
});

// app.listen(3000, () => {
//     console.log(`Example app listening on port 3000}`)
// })

module.exports = app;
