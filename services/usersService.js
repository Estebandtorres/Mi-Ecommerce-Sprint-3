const db = require('../db/database');

const usersService = {
    getAll: () => {
        return db.prepare('SELECT id, nombre, apellido, email, rol FROM users').all();
    },
    
    getById: (id) => {
        return db.prepare('SELECT id, nombre, apellido, email, rol FROM users WHERE id = ?').get(id);
    },
    
    create: (data) => {
        const stmt = db.prepare('INSERT INTO users (nombre, apellido, email, password, rol) VALUES (?, ?, ?, ?, ?)');
        // Asignamos 'cliente' por defecto si no se envía un rol
        const result = stmt.run(data.nombre, data.apellido, data.email, data.password, data.rol || 'cliente');
        return db.prepare('SELECT id, nombre, apellido, email, rol FROM users WHERE id = ?').get(result.lastInsertRowid);
    },
    
    update: (id, data) => {
        // Si el formulario envía un nuevo password, lo actualizamos. Si no, mantenemos el anterior.
        if (data.password) {
            const stmt = db.prepare('UPDATE users SET nombre = ?, apellido = ?, email = ?, password = ?, rol = ? WHERE id = ?');
            stmt.run(data.nombre, data.apellido, data.email, data.password, data.rol, id);
        } else {
            const stmt = db.prepare('UPDATE users SET nombre = ?, apellido = ?, email = ?, rol = ? WHERE id = ?');
            stmt.run(data.nombre, data.apellido, data.email, data.rol, id);
        }
        return db.prepare('SELECT id, nombre, apellido, email, rol FROM users WHERE id = ?').get(id);
    },
    
    delete: (id) => {
        return db.prepare('DELETE FROM users WHERE id = ?').run(id);
    },
    
    count: () => {
        return db.prepare('SELECT COUNT(*) AS total FROM users').get().total;
    }
};

module.exports = usersService;