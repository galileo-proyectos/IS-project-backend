/* 
 ====================================
  PROYECTO DE INGENIERIA DE SOFTWARE
 ====================================
  Por Alessandro y Gaby
 */

CREATE DATABASE SCAN_GO;
USE SCAN_GO;

-- ================================= USERS =================================
CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  stripUserId VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(50) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL,
  bornDate TIMESTAMP,
  phone VARCHAR(14),
  acceptPromotions TINYINT NOT NULL DEFAULT 0,
  acceptTerms TINYINT NOT NULL,
  imageURL VARCHAR(100),
  currentJWT CHAR(60) UNIQUE, -- pendiente de revision

  CHECK (LENGTH(email) > 5), -- @.com,
  CHECK (LENGTH(password) > 0)
);

CREATE TABLE user_recovery_codes (
  userId INT NOT NULL,
  recoveryCode VARCHAR(100) NOT NULL,

  PRIMARY KEY(userId, recoveryCode),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- ================================= PRODUCTS =================================
CREATE TABLE brands (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL UNIQUE,
  imageURL VARCHAR(100) NOT NULL
);

CREATE TABLE categories (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) UNIQUE,
  imageURL VARCHAR(100) NOT NULL
);

CREATE TABLE aisles (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) UNIQUE
);

CREATE TABLE products (
  code VARCHAR(45) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  price DECIMAL(8, 2) NOT NULL,
  stock DECIMAL(8, 3) NOT NULL DEFAULT 0,
  imageURL VARCHAR(100) NOT NULL,
  brandId INT NOT NULL,
  categoryId INT NOT NULL,
  aisleId INT NOT NULL,

  FOREIGN KEY(brandId) REFERENCES brands(id),
  FOREIGN KEY(aisleId) REFERENCES aisles(id),
  FOREIGN KEY(categoryId) REFERENCES categories(id),

  CHECK (price > 0),
  CHECK (stock >= 0)
);

INSERT INTO brands (id, name, imageURL)
VALUES
    (1, 'Puppy', 'https://scangoassets.blob.core.windows.net/brandsimages/aw_cat.png'),
    (2, 'Kitty', 'https://scangoassets.blob.core.windows.net/brandsimages/super_puppy.png');


INSERT INTO categories (id, name, imageURL)
VALUES
    (1, 'Abarrotes', 'https://scangoassets.blob.core.windows.net/aislesimages/abarrotes.png'),
    (2, 'Belleza', 'https://scangoassets.blob.core.windows.net/aislesimages/belleza.png'),
    (3, 'Juguetes', 'https://scangoassets.blob.core.windows.net/aislesimages/juguetes.png'),
    (4, 'Limpieza', 'https://scangoassets.blob.core.windows.net/aislesimages/limpieza.png'),
    (5, 'Vegetales', 'https://scangoassets.blob.core.windows.net/aislesimages/veg.png');

INSERT INTO aisles (id, name)
VALUES
    (1, 'Insumos'),
    (2, 'Cuidado personal'),
    (3, 'Juguetes'),
    (4, 'Hogar'),
    (5, 'Alimentos');

INSERT INTO products(code, name, description, price, stock, imageURL, brandId, categoryId, aisleId)
VALUES ('1234567890', '1 Litro Leche 2 Pinos', 'Caja de 1 litro de leche', 15, 100, 'https://scangoassets.blob.core.windows.net/productsimages/image 1.png', 1, 1, 1),
  ('2345678901', 'Galón de suavizante', 'Galón de suavizante para lavadora 5k 3mps', 150, 30, 'https://scangoassets.blob.core.windows.net/productsimages/image 5.png', 2, 1, 1),
  ('3456789012', 'Galó de Cloro M. Blanca', 'Galón de cloro para ropa', 20, 500, 'https://scangoassets.blob.core.windows.net/productsimages/image 6.png', 1, 4, 4),
  ('4567890123', 'Caja de medallones', 'Caja de medallones 10 u.', 25, 333, 'https://scangoassets.blob.core.windows.net/productsimages/image 6a.png', 2, 5, 5);

-- ================================= WISHLISTS =================================
CREATE TABLE wishlist_categories (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL UNIQUE,
  imageURL VARCHAR(100)
);

CREATE TABLE wishlists (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  creationDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  categoryId INT NOT NULL,
  userId INT NOT NULL,
  isEnabled TINYINT NOT NULL DEFAULT 1,
  isPublic TINYINT NOT NULL DEFAULT 0,

  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (categoryId) REFERENCES wishlist_categories(id)
);

CREATE TABLE wishlist_products (
  wishlistId INT NOT NULL,
  productCode VARCHAR(45) NOT NULL,
  amount DECIMAL(8, 2),

  PRIMARY KEY (wishlistId, productCode),
  FOREIGN KEY (wishlistId) REFERENCES wishlists(id),
  FOREIGN KEY (productCode) REFERENCES products(code),

  CHECK (amount > 0)
);

-- ================================= PUCHARSES =================================
CREATE TABLE pucharses (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  number VARCHAR(15) NOT NULL,
  serie VARCHAR(15) NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  card VARCHAR(4), -- last digits
  userId INT NOT NULL,

  UNIQUE (number, serie),
  FOREIGN KEY(userId) REFERENCES users(id),

  CHECK (LENGTH(number) > 0),
  CHECK (LENGTH(serie) > 0),
  CHECK (total > 0)
);

CREATE TABLE pucharse_wishlists (
  pucharseId INT NOT NULL,
  wishlistId INT NOT NULL,
  
  PRIMARY KEY (pucharseId, wishlistId),
  FOREIGN KEY (pucharseId) REFERENCES pucharses(id),
  FOREIGN KEY (wishlistId) REFERENCES wishlists(id)
);

CREATE TABLE pucharse_products(
  pucharseId INT NOT NULL,
  productCode VARCHAR(45) NOT NULL,
  price DECIMAL(8, 2),
  amount DECIMAL(8, 2),

  PRIMARY KEY (pucharseId, productCode),
  FOREIGN KEY (pucharseId) REFERENCES pucharses(id),
  FOREIGN KEY (productCode) REFERENCES products(code),

  CHECK (price >= 0),
  CHECK (amount > 0)
);

-- ================================= PROMOTIONS =================================
CREATE TABLE promotions (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(25) NOT NULL,
  description VARCHAR(100) NOT NULL,
  couponCode CHAR(6) NOT NULL UNIQUE,
  startDate TIMESTAMP NOT NULL,
  endDate TIMESTAMP NOT NULL,
  imageURL VARCHAR(100) NOT NULL,
  isActivated TINYINT(1) DEFAULT 1,

  CHECK (LENGTH(name) <> 0),
  CHECK (LENGTH(couponCode) <> 0),
  CHECK (LENGTH(description) <> 0),
  CHECK (endDate > startDate),
  CHECK (isActivated IN (1, 0))
);

CREATE TABLE promotion_details (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  productCode VARCHAR(45) NOT NULL,
  discountValue DECIMAL(3, 2) NOT NULL, -- percentage

  FOREIGN KEY (productCode) REFERENCES products(code),

  CHECK (discountValue > 0 AND discountValue <= 1)
);

INSERT INTO promotions (name, description, couponCode, startDate, endDate, imageURL)
VALUES
  (
    'Herméticos acero',
    'Ahora puedes conseguir herméticos de acero inoxidable en nuestras sucursales.',
    'CMF456',
    '2023-10-05',
    '2023-10-20',
    'https://scangoassets.blob.core.windows.net/promotionsimages/promo10.png'
  ),
  (
    '2x1 Octubre',
    '¿Qué estás esperando para conseguir tu yougurt Griego?',
    'OCT2X1',
    '2023-10-05',
    '2023-10-18',
    'https://scangoassets.blob.core.windows.net/promotionsimages/promo8.png'
  ),
  (
    'Premios productos bebés',
    'Participa con tus compras de Q40 en productos de bebés',
    'MBBFUI',
    '2023-10-05',
    '2023-10-25',
    'https://scangoassets.blob.core.windows.net/promotionsimages/promo9.png'
  );