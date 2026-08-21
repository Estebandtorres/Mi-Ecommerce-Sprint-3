const productsService = require('../../services/productsService');

const productsApiController = {

    getAll: (req, res) => {
        const products = productsService.getAll();
        
        const productsWithImgKey = products.map(product => {
            const { imagen, ...rest } = product;
            return { ...rest, img: imagen };
        });

        res.status(200).json(productsWithImgKey);
    },


    getById: (req, res) => {
        const product = productsService.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const { imagen, ...rest } = product;
        const productWithImgKey = { ...rest, img: imagen };

        res.status(200).json(productWithImgKey);
    },

    create: (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No se enviaron datos para el producto" });
        }
        const newProduct = productsService.create(req.body);

        const { imagen, ...rest } = newProduct;
        res.status(201).json({ ...rest, img: imagen });
        
    } catch (error) {
        console.error("Error al crear:", error);
        res.status(500).json({ error: "Error interno al guardar el producto" });
    }
},

    update: (req, res) => {
        const product = productsService.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const updated = productsService.update(req.params.id, req.body);
        const { imagen, ...rest } = updated;
        res.status(200).json({ ...rest, img: imagen });
    },

    delete: (req, res) => {
        const product = productsService.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        productsService.delete(req.params.id);
        res.status(204).send();
    }
};

module.exports = productsApiController;