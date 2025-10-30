const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const productRoutes = require('./routes/product.route')
const categoryRoutes = require('./routes/category.route')


const app = express()
const PORT = process.env.PORT || 3000

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

app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`Prueba: http://localhost:${PORT}/api/products`);
  console.log(`Prueba: http://localhost:${PORT}/api/categories`);
});