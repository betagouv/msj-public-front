var express = require('express');

var app = express();
var directory = '/' + (process.env.STATIC_DIR || 'dist')
app.use(express.static(__dirname + directory));

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Listening on', port);
});