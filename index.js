require('dotenv').config();
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

// routes
const citizenRoutes = require('./routes/citizenRoutes');





const app = express();

// setting ejs view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json());
// access parameters in req.body
app.use(bodyParser.urlencoded({ extended: false }));
// setting static folder //serves resuources from public folder
app.use(express.static(path.join(__dirname, 'public')));



// configuring routes
// app.use('/', generalRoutes);
app.use('/citizen', citizenRoutes);

app.get('/', (req, res) => {
  res.render('index')
});


app.get('/contact', (req, res) => {
  res.render('contact')
});


// app.use('/', generalRoutes);

app.listen(5000, () => console.log('listening to server on 5000'))