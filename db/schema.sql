DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    dep_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
    ON DELETE CASCADE,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);