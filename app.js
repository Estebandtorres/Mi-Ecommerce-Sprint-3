const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();

const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');


const productsApiRoutes = require('./routes/api/productsApiRoutes');
const categoriesApiRoutes = require('./routes/api/categoriesApiRoutes');
const statsApiRoutes = require('./routes/api/statsApiRoutes');
const usersApiRoutes = require('./routes/api/usersApiRoutes');



app.use(cors()); 
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(session({
    secret: 'ecommerce-secret', 
    resave: false,
    saveUninitialized: true
}));




app.use((req, res, next) => {

    res.locals.totalCarrito = req.session && req.session.cart ? req.session.cart.length : 0;
    next();
});


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use('/', productRoute);
app.use('/cart', cartRoute);


app.use('/api/products', productsApiRoutes);
app.use('/api/categories', categoriesApiRoutes);
app.use('/api/stats', statsApiRoutes);

app.use('/api/users', usersApiRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo sin problemas en http://localhost:${PORT}`);
});