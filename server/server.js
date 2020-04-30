const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//IMPORT ROUTES
const users = require('./routes/api/users.route');
const profiles = require('./routes/api/profiles.route');

//DB CONFIG
const db = require('./config/keys').MongoURI;

const app = express();

//BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CONNECT OT MONGODB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb is up and running...'))
  .catch((err) => console.log(err));

//PASSPORT MIDDLEWARE
require('./config/passport')(passport);
app.use(passport.initialize());

const configKey = require('./config/keys');
PORT = configKey.PORT;

app.get('/', (req, res) => {
  res.send('Hello Sleek...');
});

//USE ROUTES
app.use('/api/users', users);
app.use('/api/profiles', profiles);

app.listen(PORT, () =>
  console.log(`Server is Up and Running on PORT: ${PORT}`)
);
