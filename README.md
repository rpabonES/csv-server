Servicioen express que devuelve un archivo CSV

// Comando para hacer build de la imagen localmente
docker build -t powerbi-api:v1 -f Dockerfile .

//Correr contenedor
docker run -p 4000:4000 --name powerBI-api-cont csv-api:v1


//PROBAR DESCARGA DE Archivo
http://localhost:4000/api/v1/powerbi
