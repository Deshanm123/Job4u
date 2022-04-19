require('dotenv').config();
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

// routes

const generalRoutes = require('./routes/generalRoutes');
const app = express();

// setting ejs view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json());
// access parameters in req.body
app.use(bodyParser.urlencoded({ extended: false }));

// setting static folder //serves resuources from public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index')
});

app.get('/login', (req, res) => {
  res.render('login')
});
app.get('/register', (req, res) => {
  res.render('register')
});
app.get('/contact', (req, res) => {
  res.render('contact')
});


// app.use('/', generalRoutes);

app.listen(5000, () => console.log('listening to server on 5000'))