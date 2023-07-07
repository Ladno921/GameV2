# SQL 

Просмотр листинга баз данных
    SHOW DATABASES;

Пример создания базы данных
    CREATE DATABASE nature;

Подключить базу данных
    USE nature;

Просмотр листинга таблиц БД
    SHOW TABLES;

Пример создания таблицы в БД
    CREATE TABLE system_requirements (id INT PRIMARY KEY AUTO_INCREMENT, CPU VARCHAR(255), RAM VARCHAR(255), video_card VARCHAR(255), disk_space VARCHAR(255));

Пример изменения типа столбца в БД
    ALTER TABLE items MODIFY COLUMN description VARCHAR(3200);

Пример добавления столбца в БД
    ALTER TABLE items ADD description VARCHAR(255) AFTER image;

Просмотр структуры таблицы БД
    DESCRIBE items;

Выборка данных
    SELECT * FROM nature;

Пример выборки данных с условием
    SELECT * FROM nature WHERE id=2;

Пример записи данных в БД
    INSERT INTO nature (title, image) VALUES ('Природа', 'nature.jpeg');

Пример обновления записи в БД
    UPDATE nature SET title='Природа 2' WHERE id=2;

Пример удаления записи из БД
    DELETE FROM nature WHERE id=2;

Удаление БД
    DROP DATABASE nature;

Удаление таблицы в БД
    DROP TABLE items;

# Настройка проекта

Установка зависимостей
    npm install
    
Upload photo
    npm i --save-dev @types/multer

Создать файл .env в корневом каталоге и добавить конфигурацию БД
    DATABASE_URL="mysql://root:secret@localhost:3306/nature2"

Sessions
    npm install express-session
    npm i --save-dev @types/express-session
    
Выполнить миграцию БД из конфигурации ORM Prisma
    npx prisma migrate dev - заполнение БД таблицами
    npx prisma migrate reset - сброс всей информации, хранящейся в БД. (после использовать команду выше.)

Seeds
    node .\prisma\seed.js - заполнение БД информацией
    node .\prisma\mn.js

Запуск веб-сервера
    npm run dev