const usersService = require('../../services/usersService');

const usersApiController = {
    getAll: (req, res) => {
        res.status(200).json(usersService.getAll());
    },
    
    getById: (req, res) => {
        const user = usersService.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json(user);
    },
    
    create: (req, res) => {
        try {
            const newUser = usersService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            // El error más común aquí será el constraint de email UNIQUE
            res.status(400).json({ error: 'Error al crear usuario. Verifica que el email no esté en uso.' });
        }
    },
    
    update: (req, res) => {
        const user = usersService.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        
        const updated = usersService.update(req.params.id, req.body);
        res.status(200).json(updated);
    },
    
    delete: (req, res) => {
        const user = usersService.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        
        usersService.delete(req.params.id);
        res.status(204).send();
    }
};

module.exports = usersApiController;