const express = require('express');
const battle = require('./battle');

const app = express();

app.get('/battle', async (req, res) => {
    try {
        const result = await battle(req.query.hero, req.query.villain)
        res.send(result);
    } catch(error) {
        res.status(500).send('text for 500')
    }

    return;
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})

module.exports = app;
