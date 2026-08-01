const productsService = require('../../services/productsService');

const productsApiController = {
    // GET /api/products
    getAll: (req, res) => {
        const products = productsService.getAll();
        res.status(200).json(products);
    },

    // GET /api/products/:id
    getById: (req, res) => {
        const product = productsService.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    },

    // POST /api/products
    create: (req, res) => {
        const newProduct = productsService.create(req.body);
        res.status(201).json(newProduct);
    },

    // PUT /api/products/:id (Actualizar)
    update: (req, res) => {
        // Primero verificamos que el producto exista
        const product = productsService.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Si existe, lo actualizamos
        const updated = productsService.update(req.params.id, req.body);
        res.status(200).json(updated);
    },

    // DELETE /api/products/:id (Eliminar)
    delete: (req, res) => {
        // Primero verificamos que el producto exista
        const product = productsService.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Si existe, lo borramos
        productsService.delete(req.params.id);
        // 204 significa "No Content" (se borró bien y no hay nada más que devolver)
        res.status(204).send();
    }
};

module.exports = productsApiController;