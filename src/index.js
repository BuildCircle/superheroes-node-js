const express = require('express');
const battle = require('./battle');

const app = express();

app.get('/battle', async (req, res) => {
  try {
    const {hero, villain} = req.query;
    if (!hero || !villain) {
      res.status(400).send('bad request : missing GET parameter hero and/or villain')
      return;
    }
    const result = await battle(req.query.hero, req.query.villain)
    res.send(result);
  } catch (error) {
    // This can be more elegant than several ifs one after the other
    if (error.name === 'NotFoundError') {
      res.status(404).send('one of the characters is not found')
      return;
    }
    if (error.name === 'HeroesApiNotAvailable') {
      res.status(502).send('upstream service unavailable')
      return;
    }

    res.status(500).send('server error')
  }
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})

module.exports = app;
