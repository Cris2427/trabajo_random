-- ============================================================
--  Mantenedor de Usuarios  |  Motor: PostgreSQL
--  Integrantes: Cristian Tapia - Camila Malhue
-- ============================================================

-- 1) Crear la base de datos (ejecutar conectado a la BD 'postgres')
-- CREATE DATABASE mantenedor_usuarios;

-- 2) Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username  VARCHAR(50)  NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,          -- hash BCrypt
    nombre    VARCHAR(100) NOT NULL,
    email     VARCHAR(120) UNIQUE,
    rol       VARCHAR(20)  NOT NULL DEFAULT 'USER',
    activo    BOOLEAN      NOT NULL DEFAULT TRUE
);

-- 3) Datos iniciales mínimos
-- NOTA: la aplicación (seeder DataInitializer) crea el usuario 'admin' con
--       contraseña 'admin123' (hash BCrypt) en el primer arranque.
--       Si quieres que este script sea autónomo, reemplaza el hash de abajo
--       por el real: SELECT password FROM usuarios WHERE username = 'admin';
INSERT INTO usuarios (username, password, nombre, email, rol)
VALUES ('admin', '$2a$10$REEMPLAZAR_POR_HASH_REAL', 'Administrador', 'admin@demo.cl', 'ADMIN')
ON CONFLICT (username) DO NOTHING;
