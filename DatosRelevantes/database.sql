DROP DATABASE IF EXISTS lilgames;
CREATE DATABASE lilgames;
use lilgames;
CREATE TABLE juegos
(
  info VARCHAR(50) NOT NULL,
  nombreJuego VARCHAR(25) NOT NULL,
  idJuego INT NOT NULL auto_increment,
  PRIMARY KEY (idJuego)
);

CREATE TABLE usuarios
(
  passwd VARCHAR(255) NOT NULL,
  nivel INT NOT NULL,
  idUsuario INT NOT NULL auto_increment,
  username VARCHAR(25) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (idUsuario),
  UNIQUE (username)
);

CREATE TABLE stats
(
  partidasJugadas INT NOT NULL,
  idUsuario INT NOT NULL,
  idJuego INT NOT NULL,
  PRIMARY KEY (idUsuario, idJuego),
  FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idJuego) REFERENCES juegos(idJuego) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE juegosFavs
(
  idJuego INT NOT NULL,
  idUsuario INT NOT NULL,
  PRIMARY KEY (idJuego, idUsuario),
  FOREIGN KEY (idJuego) REFERENCES juegos(idJuego) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE statsPoints
(
  recordPoints INT NOT NULL,
  idUsuario INT NOT NULL,
  idJuego INT NOT NULL,
  PRIMARY KEY (idUsuario, idJuego),
  FOREIGN KEY (idUsuario, idJuego) REFERENCES stats(idUsuario, idJuego) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE statsTime
(
  recordTime time NOT NULL,
  idUsuario INT NOT NULL,
  idJuego INT NOT NULL,
  PRIMARY KEY (idUsuario, idJuego),
  FOREIGN KEY (idUsuario, idJuego) REFERENCES stats(idUsuario, idJuego) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE USER 'adminGames'@'%' IDENTIFIED BY 'adminGames';
GRANT ALL ON lilgames.* TO 'adminGames';
FLUSH PRIVILEGES;