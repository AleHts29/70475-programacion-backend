import express from 'express';
import routerProduct from './routes/product.router.js'


const app = express();

// middleware del server
app.use(express.json());



// Router
app.use('/api', routerProduct);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));