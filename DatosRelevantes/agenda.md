###Views Usuarios
##Perfil
    Permitir cambio de contraseña
##Nivel

    Valores a tener en cuenta para subir de nivel, hay que tener en cuenta las lagunas para aumentar el nivel sin necesidad de jugar
        Podria ser por partidas acabadas, y dependiendo de la dificultad, ejemplo en el buscaminas
        Hay que hacer que el nivel sea exponencial en cuanto mas nivel tenga el usuario mas dificil sera subir
        Se podria añadir el valor de "Experiencia" en los juegos en un puntuaje, por lo que la base de datos deberia cambiar, probablemente añadir un campo para la experiencia de tipo float, ya que teniendo en cuenta el apartado de despues podra haber valores decimales
        Esto deberia ser posible hacerlo con js, experiencia se defina por ejemplo x*20 (donde x el nivel), menos el primer nivel que se determinara por 10 puntos

    Puntuaje ejemplos
        Tiempo
            facil, acabar la partida en 2 min otorge 5 puntos
            medio, acabar la partida en 3 min otorge 15 puntos
            dificil, acabar la partida en 3 min otorge 30 puntos
            En el caso del buscaminas mientras menor sea el tiempo y dependiendo de la dificultad,aumente el puntuaje por cada 15s
            Y si se pasan del tiempo minimo establecido, de menos puntos
            y(+/-)y*(t*10/100)
            T es la cantidad de 15s que han pasado , ejemplo 15s = 1, 30s = 2
            X el puntuaje correspondiente.
        Puntos
            
###Juegos
    Hay que programar los juegos o buscarlos y y encontrar los parametros necesarios para guardar las estadisticas