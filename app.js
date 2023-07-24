
const express = require('express');
const path = require('path');
const helmet = require('helmet');


const app = express();


app.use(helmet());
app.disable('x-powered-by');//Disable default header banner for security

//Inicio - prueba
app.get('/', (request, response) => {
    response.json({
        message: "This is your server response"
    })
})



//API USANDO LA FORMA ADECUADA CON EXPRESS
app.get('/api/v1/powerbi', (req, res) => {
    const filePath = path.join(__dirname, '/csvapi/PQR_SALP_EMCALI.csv');
    const fileName = 'PQR_SALP_EMCALI.csv';

    res.download(filePath, fileName, (err) => {
   
     if(err){
      console.log('Error Occured while downloading the content');

      res.status(500).json({
        message: 'Ocurrió un error al descargar el archivo',
      });
     }
     else{ 
      console.log('File downloaded successfully');
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