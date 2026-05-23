const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.verCarrito);
router.post('/add/:id', cartController.agregarProducto);
router.post('/increase/:id', cartController.aumentarCantidad);
router.post('/decrease/:id', cartController.disminuirCantidad);
router.post('/clear', cartController.vaciarCarrito);

module.exports = router;