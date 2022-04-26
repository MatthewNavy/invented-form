'use strict';

var express = require('express');
var cors = require('cors');
var path = require('path');

var app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/poetry/generate.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/poetry/generate.js'));
})

app.get('/poetry/markov.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/poetry/markov.js'));
})

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/favicon.ico'));
})

app.use(express.static(__dirname + "/public/"));

app.listen(port, () => {
  console.log('app listening on port ' + port);
});
