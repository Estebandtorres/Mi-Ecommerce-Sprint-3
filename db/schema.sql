CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    rol TEXT DEFAULT 'cliente'
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    imagen TEXT,
    destacado INTEGER DEFAULT 0,
    categoria TEXT,
    stock INTEGER DEFAULT 0,
    descripcion TEXT 
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total REAL NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado TEXT DEFAULT 'pendiente',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);


INSERT OR IGNORE INTO users (id, nombre, apellido, email, password, rol) 
VALUES (1, 'Admin', 'Sporting', 'admin@sporting.com', '123456', 'admin');

INSERT OR IGNORE INTO categories (id, nombre) 
VALUES 
(1, 'Camisetas'),
(2, 'Botines'),
(3, 'Guantes'),
(4, 'Pelotas');


INSERT OR IGNORE INTO products (id, nombre, precio, imagen, destacado, categoria, stock, descripcion) 
VALUES 

(1, 'Camiseta de Boca Juniors', 149999, '/img/boquita.jpg', 1, 'Camisetas', 10, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(2, 'Camiseta de River Plate', 149999, '/img/river.jpg', 1, 'Camisetas', 10, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(3, 'Camiseta de la Selección Argentina', 149999, '/img/seleccion.jpg', 1, 'Camisetas', 10, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(4, 'Camiseta de Rosario Central', 149999, '/img/central.jpg', 0, 'Camisetas', 10, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(5, 'Camiseta de San Lorenzo', 149999, '/img/sanlorenzo.jpg', 0, 'Camisetas', 10, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(6, 'Camiseta de Platense', 149999, '/img/platense.webp', 0, 'Camisetas', 10, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),

(7, 'Botines Modelo 1', 149999, '/img/botin1.jpg', 1, 'Botines', 5, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(8, 'Botines Modelo 2', 149999, '/img/botin2.jpg', 0, 'Botines', 5, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(9, 'Botines Modelo 3', 149999, '/img/botin3.jpg', 0, 'Botines', 5, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(10, 'Botines Modelo 4', 149999, '/img/botin4.jpg', 0, 'Botines', 5, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(11, 'Botines Modelo 5', 149999, '/img/botin5.jpg', 0, 'Botines', 5, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),


(12, 'Guantes Modelo 1', 149999, '/img/guantes1.jpg', 0, 'Guantes', 7, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(13, 'Guantes Modelo 2', 149999, '/img/guantes2.jpg', 0, 'Guantes', 7, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(14, 'Guantes Modelo 3', 149999, '/img/guantes3.jpg', 0, 'Guantes', 7, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(15, 'Guantes Modelo 4', 149999, '/img/guantes4.jpg', 0, 'Guantes', 7, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(16, 'Guantes Modelo 5', 149999, '/img/guantes5.jpg', 0, 'Guantes', 7, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),


(17, 'Pelota Modelo 1', 149999, '/img/pelota1.jpg', 0, 'Pelotas', 10, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.'),
(18, 'Pelota Modelo 2', 149999, '/img/pelota2.jpg', 0, 'Pelotas', 10, 'Los productos personalizados no están sujetos a cambios y/o devoluciones.');