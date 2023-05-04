const connectToMongo = require("./db");
const express = require('express');

connectToMongo();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Atrika!')
})

app.listen(port, () => {
  console.log(`Express app running successfully on port ${port} `);
})