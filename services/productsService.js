const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const productsService = {
    _getAllProducts: () => {
        const productsData = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(productsData);
    },

    getSugeridos: () => {
        const allProducts = productsService._getAllProducts();
        let destacados = allProducts.filter(producto => producto.destacado === true);
        return destacados.sort(() => 0.5 - Math.random()).slice(0, 5);
    },

    getMasPedidos: () => {
        const allProducts = productsService._getAllProducts();
        let destacados = allProducts.filter(producto => producto.destacado === true);
        let masPedidos = [...destacados];
        if (masPedidos.length < 10) {
            const otros = allProducts.filter(p => p.destacado !== true);
            masPedidos = [...masPedidos, ...otros];
        }
        return masPedidos.sort(() => 0.5 - Math.random()).slice(0, 10);
    },

    getById: (id) => {
        const allProducts = productsService._getAllProducts();
        return allProducts.find(p => p.id === id);
    },

    getRelated: (categoria, currentId) => {
        const allProducts = productsService._getAllProducts();
        let relacion = allProducts.filter(
            p => p.categoria &&
                p.categoria === categoria &&
                p.id !== currentId
        );
        if (relacion.length > 4) {
            relacion = relacion.sort(() => 0.5 - Math.random());
        }
        return relacion.slice(0, 4);
    },

    getByCategory: (categoryParam) => {
        const allProducts = productsService._getAllProducts();
        return allProducts.filter(p =>
            p.categoria &&
            p.categoria.toLowerCase() === categoryParam.toLowerCase()
        );
    },

    searchProducts: (query) => {
        const allProducts = productsService._getAllProducts();
        
        if (!query) return [];
        
        return allProducts.filter(producto =>
            producto.nombre.toLowerCase().includes(query.toLowerCase())
        );
    },
    getCartItems: (sessionCart) => {
        
        if (!sessionCart || sessionCart.length === 0) {
            return [];
        }

        const allProducts = productsService._getAllProducts();

        // Combinamos la información de la sesión con los datos reales del JSON
        return sessionCart.map(item => {
            const productoCompleto = allProducts.find(p => p.id === item.productId);
            
            return {
                id: productoCompleto.id,
                nombre: productoCompleto.nombre,
                precio: productoCompleto.precio,
                imagen: productoCompleto.imagen,
                quantity: item.quantity,
                subtotal: productoCompleto.precio * item.quantity
            };
        });
    }
};

module.exports = productsService;