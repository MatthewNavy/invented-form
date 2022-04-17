'use strict'

var express = require('express');
var cors = require('cors');
// var path = require('path');

var app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public/"));

app.listen(port);
console.log(`Express started on port ${port}`);
