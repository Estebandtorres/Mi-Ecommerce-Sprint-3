const express = require('express');
const router = express.Router();

// Importamos el controlador de la API que va a manejar la lógica
const productsApiController = require('../../controllers/api/productsApiController');

// Rutas requeridas para los productos
router.get('/', productsApiController.getAll);           // Devuelve todos los productos
router.get('/:id', productsApiController.getById);       // Devuelve un producto específico
router.post('/', productsApiController.create);          // Crea un producto nuevo
router.put('/:id', productsApiController.update);        // Actualiza un producto
router.delete('/:id', productsApiController.delete);     // Elimina un producto

// Exportamos el router para que app.js lo pueda usar
module.exports = router;