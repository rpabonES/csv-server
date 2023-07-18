//* Require

const express = require('express');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');


const app = express();


//* MIDDLEWARE
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded( { extended: true }));
app.use(helmet());

//Inicio - prueba
app.get('/', (request, response) => {
    response.json({
        message: "This is your server response"
    })
})

//API v1
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


//api v2
app.get('/api/v2/powerbi', (req, res) => {
    const filePath = path.join(__dirname, '/csvapi/PQR_SALP_EMCALI.csv');
    res.download(filePath, 'PQR_SALP_EMCALI.csv', (err) => {
    

     if(err){
        res.json({
            message: "Ocurrió un error al cargar el archivo"
        })
      console.log('Error Occured while downloading the content')
      console.log(`filePath ${filePath}`);
     }else{
        res.json({
            message: "Archivo descargado exitosamente"
        })
      console.log('File downloaded successfully');
      console.log(`filePath ${filePath}`);
     }
    })
   })



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