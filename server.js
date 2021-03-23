var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose')
  ;



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gameofapi');

var Houses = require('./api/models/gameModel');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require('./api/routes/routes');
routes(app);

app.listen(port);

console.log('Yey!! A API está rodando na porta ' + port);

module.exports = app;