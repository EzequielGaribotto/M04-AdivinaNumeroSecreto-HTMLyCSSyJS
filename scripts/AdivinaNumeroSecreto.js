const numeroAleatorio = Math.floor(10000 + Math.random() * 90000);
console.log(numeroAleatorio)
var digitosCorrectos = 0
var intentos = 5
const maxIteracion = 5
var victoria = false
let info = document.getElementById('user_message')
function comprobarInput() {
    let info = document.getElementById('user_message')
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
                insertarFila(numero)
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
function insertarFila(fila) {
    let info = document.getElementById('user_message')
    intentos--
    console.log(intentos)
    var filas = document.getElementById("filas_container");
    var nuevaFila = document.createElement("div");
    var digitosCorrectos = 0;
    
    for (let digito = 0; digito < 5; digito++) {
        var nuevoDigito = document.createElement("div");
        nuevoDigito.innerHTML = fila[digito];
        nuevaFila.appendChild(nuevoDigito);
        var greenSet = false
        var yellowSet = false
        for (let i = 0; i < 5; i++) {
            if (fila[digito] == numeroAleatorio.toString()[i]) {
                if (digito == i) {
                    digitosCorrectos++
                    // Color verde
                    nuevoDigito.style.backgroundColor = "#00cd00";
                    greenSet = true
                } else if (!greenSet) {
                    // Color amarillo
                    nuevoDigito.style.backgroundColor = "#ffd731";
                    yellowSet = true
                }
            } else if (!greenSet && !yellowSet) {
                // Color gris
                nuevoDigito.style.backgroundColor = "#989898";
            }
        }
        nuevoDigito.classList.add("numero");
    }
    if (digitosCorrectos == 5) {
        finJuego("victoria")
    } else {
        if (intentos == 0) {
            finJuego("derrota")
        } else {
            playSound("miss")
            info.innerHTML = "Has acertado "+ digitosCorrectos + " digito(s). Te quedan " + intentos + " intentos";
        }
    }
    filas.appendChild(nuevaFila)
    nuevaFila.classList.add("fila");
}


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

function finJuego(estado) {
    if (estado == "victoria") {
        document.getElementById('user_message').innerHTML = "Has acertado, enhorabuena!";
        victoria = true
    } else if (estado == "derrota") {
        document.getElementById('user_message').innerHTML = "No ha habido suerte :("
    }
    mostrarNumeroSecreto()
    playSound(estado)
    document.getElementById('comprobar').style.backgroundColor = "gray";
}

function mostrarNumeroSecreto() {
    for (let i = 0; i < 5; i++) {
        document.getElementsByClassName('numeros')[i].innerHTML = numeroAleatorio.toString()[i]
    }
}
