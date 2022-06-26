'use strict';

//Declaramos variables 
let emojis = [] // Array que contendrá los emotes que participaran en las cartas de cada partida 
let selections = [] // Array que comparará las cartas en las que hagamos 'Click' 
let points; //declaro la variable para la puntuacion -> variable q cuente los puntos 
let amountCards = 16; // Cantidad de cartas que se mostrarán en el juego 
      
const totalAtt = 8; // variable const q cuente todos los intentos q tienes = (8) 
let attempts = totalAtt;// variable q cuente los intentos q no aciertas 
const emojiBase = ['🥝', '🍎', '🍍', '🍌', '🍓', '🍈', '🥑', '🍐', '🍏', '🍇', '🍉', '🍊', '🍋', '🍒', '🍑','🥥'];



// FUNCIONES // 


        // Creamos una función que nos devuelve los iconos de frutas desordenados en el array iconos 
        function uploadEmojis() {

            // Métodos para desordenar un array 
            emojiBase.sort(() => Math.random() - 0.5)

            // Creamos un bucle que recorre todos los elementos de iconosBase y los pusea en el array iconos 
            for (let i = 0; i < emojiBase.length; i++){

                emojis.push(emojiBase[i]);

            };
        };

      // Creamos una función para generar el tablero 
        function generateBoard() {

            points = 0; //Asignamos puntuacion a 0 cada vez que generamos el tablero 
            attempts = 8; //Asignamos a 8 los intentos cada vez que generamos el tablero 
        
            // Al id puntos e Intentos le introducimos desde js la cantidad de puntos e intentos 
            document.getElementById('points').innerHTML = `Puntos: ${points}`;
            document.getElementById('attempts').innerHTML = `Intentos: ${attempts}`;

            // Llamamos a la función para que cargue los iconos 
            uploadEmojis()
            // Reiniciamos el array que guarda las selecciones de las cartas 
            selections = []
            // Definimos la variable tablero y le asignamos el id tablero del html 
            let board = document.getElementById('board')
            // Creamos el array tarjetas 
            let cards = []
            // Creamos un bucle de la misma longitud que la cantidad de cartas
            for (let i = 0; i < amountCards; i++) {

                // con esto generamos cada tarjeta/ carta y lo pusheamos al array tarjetas 
                // Ya va incluido el evento de click (onclick en html), las clases y los Ids 
                // Utilizamos Ids para que cada carta sea independiente 
                cards.push(`

                <div class='area-card' onclick='selectCard(${i})'>
                    <div class='card' id='card${i}'>
                        <div class='face back' id='back${i}'>
                            ${emojis[0]}
                        </div>
                        <div class='face front'>
                            
                        </div>
                    </div>
                </div>        

                `);
                // Condicional para generar las parejas 
                if ( i % 2 == 1) {
                    emojis.splice(0, 1)
                }
            }

            // Ordenamos aleatoriamente los emotes en las cartas 
            cards.sort(() => Math.random() - 0.5)
            board.innerHTML = cards.join(" ")
        }

        // Función para el evento de click, para seleccionar la tarjta 

        function selectCard(i) {
            // Condicional que no dejará seleccionar las cartas si no te quedan intentos 
            if (attempts > 0) {

                // Declaramos una variable que será igual al elemento con id 'tarjeta' + su posición 
                let card = document.getElementById('card' + i)

                // Condicional que dá la vuelta a la carta en el caso de no estar volteada 
                if (card.style.transform != 'rotateY(180deg)') {
                    card.style.transform = 'rotateY(180deg)'
                    // Se pushea en el array selecciones la posición de la carta clickada 
                    selections.push(i)
                };
    
                // Condicional que compara si tenemos dos cartas seleccionadas 
                if (selections.length === 2) {
                    deselect(selections)
                    // Vaciamos el array selecciones, para que se pueda volver a comparar 
                    selections = []
                };
            }

        };

        //Función que decide si las cartas son iguales o no
        function deselect(selections) {

            // Si todavia nos quedan intentos para seguir jugando..
            if (attempts > 0){

                // Le aplicamos un timeout para que tarde en ejecutarse la función 
                setTimeout(() => {
                    
                    // Declaramos variables correspondientes a cada una de las caras traseras de las dos cartas en las que hagamos click 
                    let back1 = document.getElementById('back' + selections[0])
                    let back2 = document.getElementById('back' + selections[1])

                    // Comparación si los emotes son diferentes 
                    if (back1.innerHTML !== back2.innerHTML) {

                        // Cremos una variable que recoje el conjunto de la carta 
                        let card1 = document.getElementById('card' + selections[0])
                        let card2 = document.getElementById('card' + selections[1])
                        // Las volvermos a rotar (aspecto inicial) 
                        card1.style.transform = 'rotateY(0deg)';
                        card2.style.transform = 'rotateY(0deg)';

                        // Restamos 1 intento al contador de intentos 
                        attempts--;
                        // Volvemos a modificar el html con el número de intentos actualizado 
                        document.getElementById('attempts').innerHTML = `Intentos: ${attempts}`;


                 // En el caso que nos quedemos sin intentos 
                    if(attempts === 0) {

                        // Ventana emergente de alerta que muestra: 
                        Swal.fire({
                            icon: 'error',
                            title: 'Epic Fail!!!',
                            width: 600,
                            height: 600,
                            text:`Has conseguido ${points} puntos`,
                            confirmButtonText: 'Ok',
                        });
                  
                }

                }else{
                   // Si nada coincide con lo anterior, es que nos quedan intentos y los emotes son iguales 
                   // Por lo que cambiamos el color del fondo de la carta 
                    back1.style.background = 'pink'
                    back2.style.background = 'pink'

                    // Sumamos 1 punto al contador de puntos 
                    points++;
                    // Actualizamos el valor de puntos en el html 
                    document.getElementById('points').innerHTML = `Puntos: ${points}`;
                };

                // Si la función partidaGanada es True... 
                 if (wonGame()){

                    // Ventana emergente de alerta que muestra 
                    Swal.fire({
                        icon: 'success',
                        title:'Has ganado!!!!!',
                        text: `Has conseguido ${points} puntos`,
                        confirmButtonText: 'Ok',
                     });
                 };

            }, 1000); // 1 segundo de timeout 
        };  
    }
    
   

// Función que devuelve si la parte trasera de cada carta es diferente de 'rosa' False / de lo contrario True 
function wonGame() {

    // Creamos un bucle para cada una de las cartas 
    for(let i = 0; i < amountCards; i++) {

        // Declaramos una variable que recoje todos los elementos con id trasera + su posición 

        let back = document.getElementById('back' + i);

        // Comprueba si cada carta tiene el fondo rosa 
        if(back.style.background !== 'pink') {
            return false;
        } 
    }
    return true;
}

// Ejecutamos la función principal 
generateBoard();