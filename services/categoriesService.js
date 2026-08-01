// Importá tu conexión a la base de datos
// (Ajustá la ruta si tu archivo se llama distinto, por lo que vi en tu app.js lo tenés en '../db/database')
const db = require('../db/database');

const categoriesService = {
    // 1. Obtener todas las categorías
    getAll() {
        const stmt = db.prepare('SELECT * FROM categories');
        return stmt.all();
    },

    // 2. Obtener una categoría por su ID
    getById(id) {
        const stmt = db.prepare('SELECT * FROM categories WHERE id = ?');
        return stmt.get(id);
    },

    // 3. Crear una nueva categoría
    create(data) {
        // Asumimos que la tabla tiene una columna "nombre"
        const stmt = db.prepare('INSERT INTO categories (nombre) VALUES (?)');
        const result = stmt.run(data.nombre);
        return this.getById(result.lastInsertRowid); // Devuelve la categoría recién creada
    },

    // 4. Actualizar una categoría existente
    update(id, data) {
        const stmt = db.prepare('UPDATE categories SET nombre = ? WHERE id = ?');
        stmt.run(data.nombre, id);
        return this.getById(id);
    },

    // 5. Eliminar una categoría
    delete(id) {
        const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
        return stmt.run(id);
    },

    // 6. Contar el total de categorías (Para el Dashboard - User Story #4)
    count() {
        const stmt = db.prepare('SELECT COUNT(*) AS total FROM categories');
        return stmt.get().total;
    }
};

module.exports = categoriesService;