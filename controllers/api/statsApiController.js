const productsService = require('../../services/productsService');
const categoriesService = require('../../services/categoriesService');

const statsApiController = {
    getStats: (req, res) => {
        try {
            const totalProducts = productsService.count();
            const totalCategories = categoriesService.count();

            res.status(200).json({
                totalProducts: totalProducts,
                totalCategories: totalCategories
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las estadísticas' });
        }
    }
};

module.exports = statsApiController;