// get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const jwtclient = require('./_helpers/jwt');

const errorHandler = require('./_helpers/error-handler');
//const nodemailer = require('nodemailer');


const app = express();


// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ,Authorization");
   next();
  });

// Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');

// global error handler
app.use(errorHandler);

// use JWT auth to secure the api
 app.use(jwt());
 // use jwt for Client
 app.use(jwtclient());
//  les route de notre api Zauto 
app.use('/admin', require('./route/admin.routes'));
app.use('/client', require('./route/client.route'));





require('./route/car.routes')(app);
require('./route/session.routes')(app);
require('./route/moniteur.routes')(app);
// conction mails ver internaut
require('./route/email.routes')(app);




mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Zauto ecole app"});
});

// listen on port 3000
app.listen(config.serverport, () => {
    console.log("Server is listening on port 3000");
});