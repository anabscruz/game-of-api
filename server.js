var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  http = require('http')
  ;



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gameofapi');

var Houses = require('./api/models/gameModel');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express.urlencoded({ extended: true })
// express.json()

var routes = require('./api/routes/routes');
routes(app);

//var server = http.createServer(app);
app.listen(port);

console.log('Yey!! A API está rodando na porta ' + port);

module.exports = app;