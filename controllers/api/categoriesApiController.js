const categoriesService = require('../../services/categoriesService');

const categoriesApiController = {
    getAll: (req, res) => {
        const categories = categoriesService.getAll();
        res.status(200).json(categories);
    },
    getById: (req, res) => {
        const category = categoriesService.getById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.status(200).json(category);
    },
    create: (req, res) => {
        const newCategory = categoriesService.create(req.body);
        res.status(201).json(newCategory);
    },
    update: (req, res) => {
        const category = categoriesService.getById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
        const updated = categoriesService.update(req.params.id, req.body);
        res.status(200).json(updated);
    },
    delete: (req, res) => {
        const category = categoriesService.getById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
        categoriesService.delete(req.params.id);
        res.status(204).send();
    }
};

module.exports = categoriesApiController;