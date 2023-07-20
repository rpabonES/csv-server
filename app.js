//* Require

const express = require('express');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const handlingCSV = require('./handlingCSV');


const app = express();


//* MIDDLEWARE
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded( { extended: true }));
app.use(helmet());
app.disable('x-powered-by');//Disable default header banner for security
handlingCSV();

//Inicio - prueba
app.get('/', (request, response) => {
    response.json({
        message: "This is your server response"
    })
})

/*
API LEGACY
app.get('/api/v1/powerbi', (req, res) => {
    const filePath = path.join(__dirname, '/csvapi/PQR_SALP_EMCALI.csv');

    
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
*/

//API USANDO LA FORMA ADECUADA CON EXPRESS
app.get('/api/v1/powerbi', (req, res) => {
    const filePath = path.join(__dirname, '/csvapi/PQR_SALP_EMCALI.csv');
    const fileName = 'PQR_SALP_EMCALI.csv';

    res.download(filePath, fileName, (err) => {
   
     if(err){
      console.log('Ocurrió un error al descargar el archivo');
      // TODO
      /* IMPLEMENT A REDIRECT IF SOMETHING GOES WRONG
        if(!res.headersSent){
            res.redirect('download/error');
        }
      */
      res.status(500).json({
        message: 'Ocurrió un error al descargar el archivo',
      });
     }
     else{ 
      console.log('Archivo descargado exitosamente');
     }
    });
});



// ~~~~~~~~~~~~~~ ERROR 404 ~~~~~~~~~~~~~~ //
app.use((req, res, next) => {
    res.status(404).send('Lo siento, no puedo encontrar lo solicitado')
});

// ~~~~~~~~~~~~ ERROR HANDLER ~~~~~~~~~~~~ //.
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo ha fallado')
  })



module.exports = app;