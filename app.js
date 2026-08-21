const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();

// ==========================================
// 1. IMPORTACIÓN DE RUTAS
// ==========================================

// Rutas Tradicionales (Vistas EJS)
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');

// Rutas API JSON (Para consumir desde React)
const productsApiRoutes = require('./routes/api/productsApiRoutes');
const categoriesApiRoutes = require('./routes/api/categoriesApiRoutes');
const statsApiRoutes = require('./routes/api/statsApiRoutes');
// 👇 NUEVO: Importamos las rutas de usuarios
const usersApiRoutes = require('./routes/api/usersApiRoutes'); 


// ==========================================
// 2. MIDDLEWARES Y CONFIGURACIÓN
// ==========================================

app.use(cors()); // Habilita la conexión con React
app.use(express.json({ limit: '50mb' })); // Límite ampliado para imágenes en Base64
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(session({
    secret: 'ecommerce-secret', // Tu secreto de sesión
    resave: false,
    saveUninitialized: true
}));

// Configuración de archivos estáticos y motor de plantillas EJS
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// ==========================================
// 3. DEFINICIÓN DE ENDPOINTS (USO DE RUTAS)
// ==========================================

// Rutas de Vistas (EJS)
app.use('/', productRoute);
app.use('/cart', cartRoute);

// Rutas de la API (React)
app.use('/api/products', productsApiRoutes);
app.use('/api/categories', categoriesApiRoutes);
app.use('/api/stats', statsApiRoutes);
// 👇 NUEVO: Habilitamos el endpoint de usuarios en la ruta base
app.use('/api/users', usersApiRoutes); 


// ==========================================
// 4. INICIO DEL SERVIDOR
// ==========================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo sin problemas en http://localhost:${PORT}`);
});