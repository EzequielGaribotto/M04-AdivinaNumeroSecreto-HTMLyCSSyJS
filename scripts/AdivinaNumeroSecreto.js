const numeroAleatorio = Math.floor(10000 + Math.random() * 90000);
console.log(numeroAleatorio)
var digitosCorrectos = 0
const maxIteracion = 5
var intentos = maxIteracion
var victoria = false

function comprobarInput() {
    let info = document.getElementById('info')
    // Leemos el input del usuario
    let input = document.getElementsByTagName("input");
    let numero = input[0].value;
    if (intentos != 0 && !victoria) {
        // Si el numero es un dígito positivo de como máximo 5 dígitos
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
    } else if (intentos == 0) {
        info.innerHTML = "Has consumido todos tus intentos. Reinicia la pagina para volver a jugar";
        playSound("bonk")
    } else {
        info.innerHTML = "Ya has ganado, reinicia la pagina para volver a jugar";
    }
    input[0].value = ""
}

function insertarIntento(intento) {
    let info = document.getElementById('info')
    intentos--
    console.log(intentos)
    let result = document.getElementById("result_container");
    let nuevoNumero = document.createElement("div");
    let digitosCorrectos = 0;
    
    for (let digito = 0; digito < 5; digito++) {

        // Leemos cada digito del intento
        let nuevoDigito = document.createElement("div");
        nuevoDigito.classList.add("digito");
        nuevoDigito.innerHTML = intento[digito];
        nuevoNumero.appendChild(nuevoDigito);
        

        // Iniciamos los booleanos 
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
    // Agregamos la fila del numero al resultado
    result.appendChild(nuevoNumero)
    nuevoNumero.classList.add("numero");
}

// Funcion para reproducir sonidos
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
function finJuego(estado) {
    if (estado == "victoria") {
        document.getElementById('info').innerHTML = "Has acertado, enhorabuena!";
        victoria = true

        // Mostrar gif holy moly en la seccion de informacion
        let gifHollyMolly = document.createElement("img");
        gifHollyMolly.src = "./../images/holy-moly.gif"
        document.getElementById('info').appendChild(gifHollyMolly)
    } else if (estado == "derrota") {
        document.getElementById('info').innerHTML = "No ha habido suerte :("
    }
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

function inputBackgroundChange(isFocused) {
    let inputField = document.getElementById('input_usuario')
    if (isFocused) {
        inputField.style.backgroundColor = "#989898";
        inputField.style.color = "white";
        inputField.style.outline = "none";
        inputField.placeholder = ""
    } else {
        inputField.style.backgroundColor = ""; // Restablecer al valor predeterminado
        inputField.style.color = ""; 
        inputField.placeholder = "01234"
    }
}