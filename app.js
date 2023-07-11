//* Require

const express = require('express');
const fs = require('fs');
require('dotenv').config();
const path = require('path');
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

app.get('/download-csv', (req, res) => {
    const filePath = path.join(__dirname, 'public/test.csv');

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=test.csv');

        // Create a read stream from the file and pipe it to the response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    }else {
        res.status(404).send('Archivo No Encontrado');
    }


});


module.exports = app;