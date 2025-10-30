import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';
import categoryRoutes from './routes/category.route.js';


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

app.use(express.json())
app.use(cors())
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`Prueba: http://localhost:${PORT}/api/products`);
  console.log(`Prueba: http://localhost:${PORT}/api/categories`);
});