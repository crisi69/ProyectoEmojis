'use strict';


let iconos = []
let selecciones = []
let puntos;//declaro la variable xa la puntuacion ->  variable q cuente los puntos 
// variable para la partidaFinal
let cantidadCartas = 16;

// entiendo que esta constante no se necesita        
const intentosTotales = 8; // variable  const q cuente todos los intentos q tienes = (8)

let intentos = intentosTotales;//   variable q cuente los intentos q no aciertas



// Intento xa mover el onclick al JS (no va)
/* let nuevoJuego = document.getElementsByClassName('nuevo-juego');
nuevoJuego.addEventListener('onclick', generarTablero()); 
 */
        generarTablero()

        function cargarIconos() {
            iconos = ['🥝', '🍎', '🍍', '🍌', '🍓', '🍈', '🥑', '🍐', '🍏', '🍇', '🍉', '🍊', '🍋', '🍒', '🍑',];
        }


        /* 
        dentro de la funcion de generar tablero vamos a 'cargar' los Iconos
        */

        function generarTablero() {
            puntos = 0; // asigno puntuacion
            intentos = 8;
            // meto aqui esta línea xa q al darle a nuevo juego los puntos empiecen desde 0
            document.getElementById('puntos').innerHTML = `Puntos: ${puntos}`;
            document.getElementById('intentos').innerHTML = `Intentos: ${intentos}`;
            cargarIconos()
            selecciones = []
            let tablero = document.getElementById('tablero')
            let tarjetas = []
            for (let i = 0; i < cantidadCartas; i++) {
                // cambiamos 16 x cantiadCartas
                // con esto generamos cada tarjeta/ carta 
                tarjetas.push(`
                <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                    <div class="tarjeta" id="tarjeta${i}">
                        <div class="cara trasera" id="trasera${i}">
                            ${iconos[0]}
                        </div>
                        <div class="cara superior">
                            ❔
                        </div>
                    </div>
                </div>        
                `)
                if ( i % 2 == 1) {
                    iconos.splice(0, 1)
                }
            }
            tarjetas.sort(() => Math.random() - 0.5)
            tablero.innerHTML = tarjetas.join(" ")
        }

      

        function seleccionarTarjeta(i) {
            let tarjeta = document.getElementById('tarjeta' + i)
            if (tarjeta.style.transform != 'rotateY(180deg)') {
                tarjeta.style.transform = 'rotateY(180deg)'
                selecciones.push(i)
            }
            if (selecciones.length === 2) {
                deseleccionar(selecciones)
                selecciones = []
            }

           
           
        }

        function deseleccionar(selecciones) {
            if (intentos > 0){


                setTimeout(() => {
                    
                    let trasera1 = document.getElementById('trasera' + selecciones[0])
                    let trasera2 = document.getElementById('trasera' + selecciones[1])
                    if (trasera1.innerHTML !== trasera2.innerHTML) {
                    let tarjeta1 = document.getElementById('tarjeta' + selecciones[0])
                    let tarjeta2 = document.getElementById('tarjeta' + selecciones[1])
                    tarjeta1.style.transform = 'rotateY(0deg)';
                    tarjeta2.style.transform = 'rotateY(0deg)';

                     intentos--;
                    document.getElementById('intentos').innerHTML = `Intentos: ${intentos}`;

                    console.log(intentos); 

                    if(intentos === 0) {
                        
                        swal(`ohhhh...has perdido...puntos:${puntos}`);

                        console.log(swal(True));


                   setTimeout(() => {

                    generarTablero();
                  }, 2000)
                }

                }else{

                    // trasera1.classListAdd
                    trasera1.style.background = 'pink'
                    trasera2.style.background = 'pink'

                    // aqui va el codigo xa la puntuacion:
                    puntos++;
                    document.getElementById('puntos').innerHTML = `Puntos: ${puntos}`;
                }

                // añado el if() xa la funcion partidaGanada
                 if (partidaGanada()){

                    swal(`Has ganado!!`, `tu puntuación es: ${puntos}`);

                   /*  Swal.fire({
                        title: 'Partida finalizada',
                        text: `Has Ganado!!! puntos: ${puntos}`,
                        confirmButtonText: 'OK',
                    
                    }); */

                 }
            }, 1000);
        }
       
    }





  
// si la parte trasera de la carta es diferente de 'pink' devuelve false / de lo contrario true
function partidaGanada() {
    for(let i = 0; i < cantidadCartas; i++) {

        let trasera = document.getElementById('trasera' + i);

        if(trasera.style.background !== 'pink') {
            return false;
        }
        
    }

    return true;

}