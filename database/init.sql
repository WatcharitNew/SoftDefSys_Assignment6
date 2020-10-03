CREATE DATABASE IF NOT EXISTS memory;
USE memory;
CREATE TABLE IF NOT EXISTS memory (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(50) NOT NULL,
    detail varchar(255),
    PRIMARY KEY (id)
);