const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.login);
router.get('/register', controller.register);
router.post('/register', controller.procesarRegister);
router.get('/index', controller.index);
router.get('/searchResults', controller.search);
router.get('/checkout', controller.checkout);
router.get('/products/:id', controller.descripcion);
router.get('/carrito', (req, res) => res.redirect('/cart'));

module.exports = router;