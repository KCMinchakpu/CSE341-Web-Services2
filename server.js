const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();



const port = process.env.PORT || 8085;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
  };
  
app.use(bodyParser.json())
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  })
  
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
    });
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use('/', require('./routes'));
app.use(async (req, res, next) => {
    next({
        status: 404,
        message: "Sorry, this route don't exists."
    });
})
.use(async (err, req, res) => {
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    let message = err.status == 404 ? err.message : 'Sorry, an error occurred in your request.';
    res.status(err.status || 500).json({
        error: message
    });
});


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node Runing on port ${port}.`)});
    }
});