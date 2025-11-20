-- create auth DB + user
CREATE ROLE auth WITH LOGIN PASSWORD 'authpass';
CREATE DATABASE auth_db OWNER auth;
ALTER DATABASE auth_db SET timezone TO 'Asia/Ho_Chi_Minh';
ALTER ROLE auth SET timezone TO 'Asia/Ho_Chi_Minh';


-- create resource DB + user
CREATE ROLE backend WITH LOGIN PASSWORD 'backendpass';
CREATE DATABASE backend_db OWNER backend;
ALTER DATABASE backend_db SET timezone TO 'Asia/Ho_Chi_Minh';
ALTER ROLE backend SET timezone TO 'Asia/Ho_Chi_Minh';
