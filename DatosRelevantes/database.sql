DROP DATABASE IF EXISTS lilgames;
CREATE DATABASE lilgames;
use lilgames;
CREATE TABLE juegos
(
  idJuego INT NOT NULL auto_increment,
  nombreJuego VARCHAR(25) NOT NULL,
  info TEXT(255) NOT NULL,
  tipo ENUM ('Tiempo','Puntos'),
  PRIMARY KEY (idJuego)
);

CREATE TABLE usuarios
(
  idUsuario INT NOT NULL auto_increment,
  nombre VARCHAR(50) NOT NULL,
  username VARCHAR(25) NOT NULL,
  passwd VARCHAR(255) NOT NULL,
  nivel INT NOT NULL,
  PRIMARY KEY (idUsuario),
  UNIQUE (username)
);

CREATE TABLE stats
(
  idUsuario INT NOT NULL,
  idJuego INT NOT NULL,
  partidasJugadas INT NOT NULL,
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
  idUsuario INT NOT NULL,
  idJuego INT NOT NULL,
  recordPoints INT NOT NULL,
  PRIMARY KEY (idUsuario, idJuego),
  FOREIGN KEY (idUsuario, idJuego) REFERENCES stats(idUsuario, idJuego) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE statsTime
(
  idUsuario INT NOT NULL,
  idJuego INT NOT NULL,
  recordTime time NOT NULL,
  PRIMARY KEY (idUsuario, idJuego),
  FOREIGN KEY (idUsuario, idJuego) REFERENCES stats(idUsuario, idJuego) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE USER 'adminGames'@'%' IDENTIFIED BY 'adminGames';
GRANT ALL ON lilgames.* TO 'adminGames';
FLUSH PRIVILEGES;


INSERT INTO juegos (nombreJuego, info, tipo) VALUES
('Buscaminas', 'El videojuego presenta una cuadrícula de casillas en las que se puede hacer clic, donde hay «minas» ocultas esparcidas por todo el tablero. El objetivo es limpiar el tablero sin detonar ninguna mina, con la ayuda de pistas sobre el número de minas vecinas en las casillas circundantes', 'Tiempo');

INSERT INTO juegos (nombreJuego, info, tipo) VALUES
('Snake', 'El jugador debe evitar que la serpeinte choque contra obstáculos o se coma a sí misma, algo que se vuelve más difícil a medida que la serpiente se alarga.', 'Puntos');