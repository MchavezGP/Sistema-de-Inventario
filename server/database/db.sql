use inventario;
CREATE TABLE Categoria (
    idCategoria INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombreCategoria VARCHAR(40) NOT NULL
);
CREATE TABLE Marca(
    idMarca INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombreMarca VARCHAR(40) NOT NULL
);

CREATE TABLE Usuario(
    idUsuario INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    apellidoPaterno VARCHAR(40) NOT NULL,
    apellidoMaterno VARCHAR(40) NOT NULL,
    correo VARCHAR(40) NOT NULL,
    contrasena VARCHAR(40) NOT NULL
);

CREATE TABLE Area(
    idArea INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombreArea VARCHAR(40) NOT NULL
);
CREATE TABLE Producto (
    idProducto INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombreProducto VARCHAR(40) NOT NULL,
    stock INTEGER NOT NULL,
    fecha  DATE NOT NULL,
    categoria INTEGER, FOREIGN KEY(categoria) REFERENCES Categoria(idCategoria),
    marca INTEGER, FOREIGN KEY(marca)  REFERENCES Marca(idMarca)
);
CREATE TABLE Entrada(
    idEntrada INTEGER PRIMARY KEY AUTO_INCREMENT,
    fecha  DATE NOT NULL,
     cantidad INTEGER NOT NULL,
    usuario INTEGER, FOREIGN KEY(usuario)  REFERENCES Usuario(idUsuario),
    producto INTEGER, FOREIGN KEY(producto)  REFERENCES Producto(idProducto)
);
CREATE TABLE Salida(
    idSalida INTEGER PRIMARY KEY AUTO_INCREMENT,
    fecha  DATE NOT NULL,
    cantidad INTEGER NOT NULL,
    usuario INTEGER, FOREIGN KEY(usuario)  REFERENCES Usuario(idUsuario),
    area INTEGER, FOREIGN KEY(area)  REFERENCES Area(idArea),
    producto INTEGER, FOREIGN KEY(producto)  REFERENCES Producto(idProducto)
);

/* TRIGGER ENTRADAS */ 
CREATE TRIGGER ingresos AFTER INSERT ON entrada
FOR EACH ROW
UPDATE producto set stock = stock + NEW.cantidad
WHERE idProducto = NEW.producto;

/* TRIGGER SALIDAS*/ 
CREATE TRIGGER salidas AFTER INSERT ON salida
FOR EACH ROW
UPDATE producto   set  stock = stock - NEW.cantidad 
WHERE idProducto = NEW.producto;


/* OBTENER TODOS LOS VALORES DE PRODUCTO*/ 
SELECT p.idProducto, p.nombreProducto, p.stock,  date_format(p.fecha, "%d-%m-%Y") AS fecha , m.nombreMarca, c.nombreCategoria
FROM producto p
INNER JOIN marca m ON p.marca = m.idMarca
INNER JOIN categoria c ON p.categoria = c.idCategoria;

/* OBTENER TODOS LOS VALORES DE ENTRADA */ 
SELECT e.idEntrada, e.cantidad,  date_format(e.fecha , "%d-%m-%Y") AS fecha ,  p.nombreProducto, u.nombre
FROM entrada e
INNER JOIN producto p ON  e.producto = p.idProducto
INNER JOIN usuario u ON e.usuario = u.idUsuario;
              
/* OBTENER TODOS LOS VALORES DE SALIDA */ 
SELECT s.idSalida, s.cantidad, date_format(s.fecha  , "%d-%m-%Y") AS fecha  ,  p.nombreProducto, u.nombre, a.nombreArea
FROM salida s
INNER JOIN producto p ON  s.producto = p.idProducto
INNER JOIN usuario u ON s.usuario = u.idUsuario
INNER JOIN area a ON s.area = a.idArea;
               