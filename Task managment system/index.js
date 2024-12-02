const express = require('express');
const tickets = require("./db.json");
const app = express();


// Routes
app.get('/tickets', (req, res) => {
    return res.json(tickets);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))


