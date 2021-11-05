DROP
DATABASE IF EXISTS  ecommerce_db;
CREATE
DATABASE ecommerce_db;
DROP
USER IF EXISTS ecommerce;
CREATE
USER ecommerce WITH PASSWORD 'ecommerce_123';
GRANT ALL PRIVILEGES ON DATABASE
"ecommerce_db" to ecommerce;
