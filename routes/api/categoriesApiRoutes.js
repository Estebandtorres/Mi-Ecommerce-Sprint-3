const express = require('express');
const router = express.Router();
const categoriesApiController = require('../../controllers/api/categoriesApiController');

router.get('/', categoriesApiController.getAll);
router.get('/:id', categoriesApiController.getById);
router.post('/', categoriesApiController.create);
router.put('/:id', categoriesApiController.update);
router.delete('/:id', categoriesApiController.delete);

module.exports = router;