const db = require('../db/database');

const productsService = {
    getMasPedidos: () => {
        return db.prepare('SELECT * FROM products LIMIT 10').all();
    },

    getSugeridos: () => {
        return db.prepare('SELECT * FROM products ORDER BY RANDOM() LIMIT 4').all();
    },

    getById: (id) => {
        return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    },

    getRelated: (categoria, id) => {
        return db.prepare('SELECT * FROM products WHERE categoria = ? AND id != ? LIMIT 4').all(categoria, id);
    },

    getByCategory: (categoria) => {
        return db.prepare('SELECT * FROM products WHERE categoria = ?').all(categoria);
    },

    search: (query) => {
        const searchTerm = `%${query}%`;
        return db.prepare('SELECT * FROM products WHERE nombre LIKE ?').all(searchTerm);
    },

    getCartItems: (cartSession) => {
        if (!cartSession || cartSession.length === 0) return [];
        
        const getProductStmt = db.prepare('SELECT * FROM products WHERE id = ?');
        const items = [];
        
        for (let item of cartSession) {
            const productoReal = getProductStmt.get(item.productId || item.id);
            if (productoReal) {
                items.push({ ...productoReal, quantity: item.quantity || 1 });
            }
        }
        return items;
    },

    getAll: () => {
        return db.prepare('SELECT * FROM products').all();
    },

    // Crea un producto nuevo
    create: (data) => {
        const stmt = db.prepare('INSERT INTO products (nombre, precio, imagen, destacado, categoria, stock) VALUES (?, ?, ?, ?, ?, ?)');
        const result = stmt.run(data.nombre, data.precio, data.imagen || '', data.destacado || 0, data.categoria || '', data.stock || 0);
        return db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    },

    // Actualiza un producto existente
    update: (id, data) => {
        const stmt = db.prepare('UPDATE products SET nombre = ?, precio = ?, imagen = ?, destacado = ?, categoria = ?, stock = ? WHERE id = ?');
        stmt.run(data.nombre, data.precio, data.imagen || '', data.destacado || 0, data.categoria || '', data.stock || 0, id);
        return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    },

    // Borra un producto
    delete: (id) => {
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        return stmt.run(id);
    },

    // Cuenta el total de productos 
    count: () => {
        return db.prepare('SELECT COUNT(*) AS total FROM products').get().total;
    }
};

module.exports = productsService;