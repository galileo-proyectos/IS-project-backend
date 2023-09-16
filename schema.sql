/* 
 ====================================
  PROYECTO DE INGENIERIA DE SOFTWARE
 ====================================
  Por Alessandro y Gaby
 */

CREATE DATABASE PAGOS_EXPRESS
USE PAGOS_EXPRESS

-- ================================= USERS =================================
CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  -- stripUserId INT NOT NULL UNIQUE DEFAULT id,
  email VARCHAR(50) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL,
  bornDate TIMESTAMP,
  phone VARCHAR(14),
  acceptPromotions TINYINT NOT NULL DEFAULT 0,
  acceptTerms TINYINT NOT NULL,
  imageURL VARCHAR(100),
  currentJWT VARCHAR(100) UNIQUE, -- pendiente de revision

  CHECK (LENGTH(email) > 5), -- @.com,
  CHECK (LENGTH(password) > 0)
)

CREATE TABLE user_recovery_codes (
  userId INT NOT NULL,
  recoveryCode VARCHAR(100) NOT NULL,

  PRIMARY KEY(userId, recoveryCode),
  FOREIGN KEY (userId) REFERENCES users(id)
)

-- ================================= PRODUCTS =================================
CREATE TABLE brands (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL UNIQUE,
  imageURL VARCHAR(100)
)

CREATE TABLE products (
  code VARCHAR(45) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(8, 2) NOT NULL,
  stock DECIMAL(8, 3) NOT NULL DEFAULT 0,
  imageURL VARCHAR(100),
  brandId INT NOT NULL,

  FOREIGN KEY(brandId) REFERENCES brands(id),

  CHECK (price > 0),
  CHECK (stock >= 0)
)

-- ================================= WISHLISTS =================================
CREATE TABLE wishlist_categories (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL UNIQUE,
  imageURL VARCHAR(100)
)

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
)

CREATE TABLE wishlist_products (
  wishlistId INT NOT NULL,
  productCode VARCHAR(45) NOT NULL,
  amount DECIMAL(8, 2),

  PRIMARY KEY (wishlistId, productCode),
  FOREIGN KEY (wishlistId) REFERENCES wishlists(id),
  FOREIGN KEY (productCode) REFERENCES products(code),

  CHECK (amount > 0)
)

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
)

CREATE TABLE pucharse_wishlists (
  pucharseId INT NOT NULL,
  wishlistId INT NOT NULL,
  
  PRIMARY KEY (pucharseId, wishlistId),
  FOREIGN KEY (pucharseId) REFERENCES pucharses(id),
  FOREIGN KEY (wishlistId) REFERENCES wishlists(id)
)

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
)
