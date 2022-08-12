const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Text is ok'))

app.get('/p/:id', function (req, res) {
    const all = req.query.all;
    res.json(all)
    res.send('send some' + req.params.id)
})
app.listen(3000)