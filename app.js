//* Require

const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();


//* MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));


app.get('/', (request, response) => {
    response.json({
        message: "This is your server response"
    })
})