const express = require('express');
const app = express();
const Contenedor = require("./Contenedor")
const contenedor = new Contenedor("productos.txt");
const PORT = 8080;

app.get('/productos', async (req,res) => {
    let productos = await contenedor.getAll();
    res.status(200).json(productos);
});

app.get('/productoRandom', async (req,res) => {
    let productos = await contenedor.getAll();
    let productoRandomIndex = Math.floor(Math.random() * productos.length);
    res.status(200).json(productos[productoRandomIndex]);
});

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on('error', err => console.log(`Error en el servidor ${err}`));