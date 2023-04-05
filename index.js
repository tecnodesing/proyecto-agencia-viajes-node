//const express = require('express'); //version anterior
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv/config'


const app = express();

//conectar DB
db.authenticate()
    .then(  () => console.log('db conectada'))
    .catch(error => console.log(error))

//definir puerto
const port = process.env.PORT || 4000;

//habilitar pug
app.set('view engine', 'pug');

//obtener el año actual
app.use(  (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next(); 
})

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: false}))

//definir la carpeta publica
app.use(express.static('public'));

//agregar router
app.use('/', router)


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);

});