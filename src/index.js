const express = require("express");
const battle = require("./battle");

const app = express();

app.get("/battle", async (req, res) => {
  const { hero, villain } = req.query;

  if (!hero || !villain) {
    res.status(400).send("hero and villain are required");
    return;
  }

  const result = await battle(hero, villain);

  res.send(result);
});

// app.listen(3000, () => {
//     console.log(`Example app listening on port 3000}`)
// })

module.exports = app;
