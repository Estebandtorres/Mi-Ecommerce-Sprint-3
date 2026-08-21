const db = require('../db/database');
const categoriesService = {
    getAll() {
        const stmt = db.prepare('SELECT * FROM categories');
        return stmt.all();
    },
    getById(id) {
        const stmt = db.prepare('SELECT * FROM categories WHERE id = ?');
        return stmt.get(id);
    },
    create(data) {
        const stmt = db.prepare('INSERT INTO categories (nombre) VALUES (?)');
        const result = stmt.run(data.nombre);
        return this.getById(result.lastInsertRowid);
    },

    update(id, data) {
        const stmt = db.prepare('UPDATE categories SET nombre = ? WHERE id = ?');
        stmt.run(data.nombre, id);
        return this.getById(id);
    },

    delete(id) {
        const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
        return stmt.run(id);
    },
    count() {
        const stmt = db.prepare('SELECT COUNT(*) AS total FROM categories');
        return stmt.get().total;
    }
};

module.exports = categoriesService;