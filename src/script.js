'use strict';

let iconos = []
let selecciones = []
let puntos;//declaro la variable xa la puntuacion ->  variable q cuente los puntos 
// variable para la partidaFinal
let cantidadCartas = 16;

// entiendo que esta constante no se necesita        
const intentosTotales = 8; // variable  const q cuente todos los intentos q tienes = (8)
let intentos = intentosTotales;//   variable q cuente los intentos q no aciertas
const iconosBase = ['🥝', '🍎', '🍍', '🍌', '🍓', '🍈', '🥑', '🍐', '🍏', '🍇', '🍉', '🍊', '🍋', '🍒', '🍑'];

// Intento xa mover el onclick al JS (no va)
/* let nuevoJuego = document.getElementsByClassName('nuevo-juego');
nuevoJuego.addEventListener('onclick', generarTablero()); 
 */
        generarTablero()

        // Creamos una función que nos devuelve los iconos de frutas desordenados en el array iconos
        function cargarIconos() {
            iconosBase.sort(() => Math.random() - 0.5)

            for (let i = 0; i < iconosBase.length; i++){
                iconos.push(iconosBase[i]);
            };
        };
        /* 
        dentro de la funcion de generar tablero vamos a 'cargar' los Iconos
        */

        function generarTablero() {
            puntos = 0; // asigno puntuacion
            intentos = 8;
            // meto aqui esta línea xa q al darle a nuevo juego los puntos empiecen desde 0
            document.getElementById('puntos').innerHTML = `Puntos: ${puntos}`;
            document.getElementById('intentos').innerHTML = `Intentos: ${intentos}`;
            // Llamos a la función para que cargue los iconos
            cargarIconos()
            selecciones = []
            // definimos la variable tablero y le asignamos el id tablero del html
            let tablero = document.getElementById('tablero')
            let tarjetas = []
            // Creamos un bucle de la misma longitud que la cantidad de cartas
            for (let i = 0; i < cantidadCartas; i++) {
                // con esto generamos cada tarjeta/ carta 
                tarjetas.push(`
                <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                    <div class="tarjeta" id="tarjeta${i}">
                        <div class="cara trasera" id="trasera${i}">
                            ${iconos[0]}
                        </div>
                        <div class="cara superior">
                            
                        </div>
                    </div>
                </div>        
                `);
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
                        Swal.fire({
                            title: 'Ohhh has perdido...',
                            width: 600,
                            height: 600,
                            text:`Tus puntos son ${puntos}
                            Te has excendido de intentos`,
                            confirmButtonText: 'Ok',
                        });
                  intentos= 8;
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

                    Swal.fire({
                        title:'Has ganado!!!!!',
                        text: `Has conseguido ${puntos} puntos`,
                        confirmButtonText: 'Ok',
                     });
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
