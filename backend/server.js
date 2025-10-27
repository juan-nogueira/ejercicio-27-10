const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const DB_URI = "mongodb+srv://lautismyth_db_user:0890@cluster0.l3ld2cx.mongodb.net/products";

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`Prueba: http://localhost:${PORT}/usuarios`);
  console.log(`Prueba: http://localhost:${PORT}/publicaciones`);
});