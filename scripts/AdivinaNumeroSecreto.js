// SECCION CODIGO
// - Creamos un numero aleatorio, lo mostramos en el log
let numeroAleatorio = Math.floor(Math.random() * 100000);
// Ponemos ceros a la izquierda si el numero random no es de 5 digitos
numeroAleatorio = numeroAleatorio.toString().padStart(5,'0');
console.log(numeroAleatorio)
// Iniciamos el contador de digitos correctos y las iteraciones
let digitosCorrectos = 0
const maxIteracion = 5
let intentos = maxIteracion
// Inicamos el valor de victoria
let victoria = false

// SECCION COMPROBAR & INFO
// - Esta funcion comprobara que el input del usuario sea un numero positivo de 5 digitos
// - Informará al usuario sobre el estado de la comprobacion
function comprobarInput() {
    let info = document.getElementById('info')
    // Leemos el input del usuario
    let input = document.getElementsByTagName("input");
    let numero = input[0].value;
    // Si el usuario tiene intentos restantes y no ha ganado aún
    if (intentos != 0 && !victoria) {
        // Y si el numero es un dígito de como máximo 5 dígitos
        if (numero > -1 && numero < 100000) {
            // Contamos sus digitos
            let digitosCounter = 0
            for (digito in numero) {
                digitosCounter++
            }
            // Si los digitos son exactamente 5 insertamos una fila
            if (digitosCounter == 5) {
                insertarIntento(numero)
            } else {
                // Si no tiene 5 digitos se lo decimos al usuario
                info.innerHTML = "El numero debe tener 5 dígitos, tiene "+digitosCounter
                playSound("bonk")
            }
        } else {
            // Si no es correcto, le decimos que ponga un numero de 5 dígitos
            info.innerHTML = "Input incorrecto, introduce un numero positivo de 5 dígitos"
            playSound("bonk")
        }
    // Si el usuario se ha quedado sin intentos
    } else if (intentos == 0) {
        info.innerHTML = "Has consumido todos tus intentos. Reinicia la pagina para volver a jugar";
        playSound("bonk")
    // Si el usuario ya ha ganado
    } else if (victoria){
        info.innerHTML = "Ya has ganado, reinicia la pagina para volver a jugar";
    }
    // Vaciamos el input del usuario para que vuelva a escribir
    input[0].value = ""
}


// SECCION RESULT 
// - Si el input del usuario es correcto, pasamos a la sección result
// - Por cada input añadimos una fila
// - La fila tendrá 5 celdas coloreadas de verde, amarillo o gris, en funcion de si
//   estan en el numero aleatorio o no, y si la posicion es exactamente la misma
function insertarIntento(intento) {

    let info = document.getElementById('info')
    intentos--
    let result = document.getElementById("result_container");
    let nuevoNumero = document.createElement("div");
    let digitosCorrectos = 0;
    // Determinamos el color para cada celda que contendra un digito
    for (let digito = 0; digito < 5; digito++) {

        // Leemos cada digito del intento
        let nuevoDigito = document.createElement("div");
        nuevoDigito.classList.add("digito");
        nuevoDigito.innerHTML = intento[digito];
        nuevoNumero.appendChild(nuevoDigito);
        

        // Iniciamos los booleanos que usaremos para que no se cambien los colores de manera incorrecta
        let greenSet = false
        let yellowSet = false

        
        // Y comprobamos si está en el numero aleatorio
        for (let posicion = 0; posicion < 5; posicion++) {
            // Si el numero está en el numero aleatorio
            if (intento[digito] == numeroAleatorio.toString()[posicion]) {
                // Si está exactamente en la misma posicion
                if (digito == posicion) {
                    digitosCorrectos++
                    // Color verde
                    nuevoDigito.style.backgroundColor = "#00cd00";
                    greenSet = true
                // Si está en el numero pero no en la misma posicion
                } else if (!greenSet) {
                    // Color amarillo
                    nuevoDigito.style.backgroundColor = "#ffd731";
                    yellowSet = true
                }
            // Si el numero no está en el numero aleatorio
            } else if (!greenSet && !yellowSet) {
                // Color gris
                nuevoDigito.style.backgroundColor = "#989898";
            }
        }
    }

    // Si el intento es igual al numero aleatorio
    if (digitosCorrectos == 5) {
        finJuego("victoria")
    // Si no lo es
    } else {
        // Si no quedan intentos
        if (intentos == 0) {
            finJuego("derrota")
        // Si quedan intentos
        } else {
            playSound("miss")
            info.innerHTML = "Has acertado "+ digitosCorrectos + " digito(s). Te quedan " + intentos + " intentos";
        }
    }
    // Agregamos la fila con sus 5 celdas al resultado
    result.appendChild(nuevoNumero)
    nuevoNumero.classList.add("numero");
}

// Funcion para reproducir sonidos
// - Simplemente reproduce un sonido en funcion del parametro con el que se llama a la funcion
function playSound(sound) {
    if (sound == "victoria") {
        document.getElementById('victory_sound').play();
    } else if (sound == "derrota") {
        document.getElementById('no_luck_sound').play();
    } else if (sound == "miss") {
        document.getElementById('miss_sound').play();
    } else if (sound == "bonk") {
        document.getElementById('invalid_input_sound').play();
    }
}

// Funcion para modificar HTML en funcion del estado del final del juego
// - En funcion del parametro (victoria | derrota) con el que llamamos a la funcion, hará unas cosas u otras
function finJuego(estado) {
    // Si el usuario ha ganado
    if (estado == "victoria") {
        // Informamos al usuario de su victoria, añadimos un gif a la seccion INFO
        document.getElementById('info').innerHTML = "Has acertado, enhorabuena!";
        let gifHollyMolly = document.createElement("img");
        gifHollyMolly.src = "./../images/holy-moly.gif"
        document.getElementById('info').appendChild(gifHollyMolly)
        gifHollyMolly.addEventListener('click', function () {playSound("victoria");});
        victoria = true
    // Si el usuario ha perdido
    } else if (estado == "derrota") {
        // Informamos al usuario de su derrota, añadimos un gif a la seccion INFO
        document.getElementById('info').innerHTML = "No ha habido suerte :("
        let gifSpongibobSad = document.createElement("img");
        gifSpongibobSad.src = "./../images/spongibob-sad.gif"
        document.getElementById('info').appendChild(gifSpongibobSad)
        gifSpongibobSad.addEventListener('click', function () {playSound("derrota");});
    }

    // Mostramos el numero secreto, reproducimos un sonido y cambiamos el color del boton comprobar a gris
    mostrarNumeroSecreto()
    playSound(estado)
    document.getElementById('comprobar').style.backgroundColor = "gray";
}

// Funcion para cambiar los asteriscos por el numero secreto si se gana o se pierde
function mostrarNumeroSecreto() {
    for (let i = 0; i < 5; i++) {
        document.getElementsByClassName('n_secreto')[i].innerHTML = numeroAleatorio.toString()[i]
    }
}

// Funcion para personalizar el color de fondo y el placeholder en funcion de si el espacio del input está focused o blurred
function inputBackgroundChange(isFocused) {
    let inputField = document.getElementById('input_usuario')
    if (isFocused) {
        inputField.style.backgroundColor = "#BABABA";
        // Tambien usamos esto para quitar el borde que viene por defecto al hacer focus en el input
        inputField.style.outline = "none";
        inputField.placeholder = ""
    } else {
        inputField.style.backgroundColor = ""; // Restablecer al valor predeterminado
        inputField.placeholder = "01234"
    }
}
