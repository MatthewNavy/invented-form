'use strict'

var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.send('Hello World');
});

app.listen(port);
console.log(`Express started on port ${port}`);
