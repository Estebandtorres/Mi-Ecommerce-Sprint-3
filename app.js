const express = require('express');
const session = require('express-session');
const app = express();
const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoute');
require('./db/database');
const cors = require('cors');
const apiProductsRouter = require('./routes/api/productsApiRoutes');
const apiCategoriesRouter = require('./routes/api/categoriesApiRoutes');
const apiStatsRouter = require('./routes/api/statsApiRoutes');
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/products', apiProductsRouter);
app.use('/api/categories', apiCategoriesRouter);
app.use('/api/stats', apiStatsRouter);

app.set('view engine', 'ejs');


app.use(express.urlencoded({ limit: '50mb', extended: false }));


app.use(session({
    secret: 'mi-ecommerce-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    let total = 0;
    
    if (req.session.cart && Array.isArray(req.session.cart)) {
        total = req.session.cart.reduce((acum, item) => {
            let cantidad = parseInt(item.quantity) || 0; 
            return acum + cantidad;
        }, 0);
    }
    res.locals.totalCarrito = total;
    next();
});

app.use(express.static('public'));


app.use('/', productRoutes);
app.use('/cart', cartRoutes);


app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(3000, () => console.log("Server en linea 🫡"));