//* Require

const express = require('express');
const fs = require('fs');
const path = require('path');
//const bodyParser = require('body-parser');

const app = express();


//* MIDDLEWARE
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded( { extended: true }));


app.get('/', (request, response) => {
    response.json({
        message: "This is your server response"
    })
})

app.get('/api/v1/powerbi', (req, res) => {
    const filePath = path.join(__dirname, '/csvapi/PQR_SALP_EMCALI.csv');
    console.log(`filePath ${filePath}`);

    
    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=PQR_SALP_EMCALI.csv');

        // Creadr un readStream y añadir al archivo
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    }else {
        res.status(404).send('Archivo No Encontrado');
        
    }


});


module.exports = app;