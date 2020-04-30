const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

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

//serve static assets if in Production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () =>
  console.log(`Server is Up and Running on PORT: ${PORT}`)
);
