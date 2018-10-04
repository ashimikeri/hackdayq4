'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Constants
const PORT = 9090;
const HOST = '0.0.0.0';

// App
const app = express();
const cors = require('cors');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ "strict" : false }));
app.use(express.static('public'));
app.use(cors());

app.post('/devicelayer', (req, res) => {
  res.send('Working\n');
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
