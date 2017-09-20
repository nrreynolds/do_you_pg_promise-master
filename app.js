// dependencies
const express = require('express'),
  app = express(),
  mustacheExpress = require('mustache-express'),
  port = process.env.PORT || 8080,
  bdPars = require('body-parser'),
  students = require('./controllers/students_controller'),
  houses = require('./controllers/houses_controller');

// set up engine
app.engine('html', mustacheExpress());
app.set('view engine', 'html');

// set up views
app.set('views', __dirname + '/views');

// set up puplic dir
app.use(express.static(__dirname + '/public'));

// set up body parser
app.use(bdPars.urlencoded({
  extended: false
}));
app.use(bdPars.json());

// when root url is gotten
app.get('/', (req, res) => {
  // render home page
  res.render('home/index')
});

// set up paths for routers
app.use('/students', students);
app.use('/houses', houses);

// start listening
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});