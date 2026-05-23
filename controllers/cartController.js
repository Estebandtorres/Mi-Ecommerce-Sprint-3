const fs = require('fs');
const path = require('path');
const cartService = require('../services/cartService');

const verCarrito = (req, res) => {
    const items = cartService.getItems(req.session);
    const total = cartService.calcularTotal(items);
    res.render('pages/carrito', { items, total });
};

const agregarProducto = (req, res) => {
    const productId = parseInt(req.params.id);

    try {
        const productsFilePath = path.join(__dirname, '../data/productos.json');
        const productsData = fs.readFileSync(productsFilePath, 'utf-8');
        const allProducts = JSON.parse(productsData);

        const productoRequerido = allProducts.find(p => p.id === productId);

        if (productoRequerido && productoRequerido.stock > 0) {
            cartService.agregarProducto(req.session, productId);
        } else {
            console.log("Alerta de seguridad: Intento de agregar producto sin stock desde el front-end.");
        }

    } catch (error) {
        console.error("Error al intentar validar el stock del producto:", error);
    }


    res.redirect('/cart');
};

const aumentarCantidad = (req, res) => {
    const productId = parseInt(req.params.id);
    cartService.aumentarCantidad(req.session, productId);
    res.redirect('/cart');
};

const disminuirCantidad = (req, res) => {
    const productId = parseInt(req.params.id);
    cartService.disminuirCantidad(req.session, productId);
    res.redirect('/cart');
};

const vaciarCarrito = (req, res) => {
    cartService.vaciarCarrito(req.session);
    res.redirect('/cart');
};

module.exports = {
    verCarrito,
    agregarProducto,
    aumentarCantidad,
    disminuirCantidad,
    vaciarCarrito
};