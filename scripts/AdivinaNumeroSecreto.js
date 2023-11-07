const numeroAleatorio = Math.floor(10000 + Math.random() * 90000);
console.log(numeroAleatorio)
var digitosCorrectos = 0
var iteraciones = 0
var maxIteracion = 5
var victoria = false
function comprobarInput() {
    let info = document.getElementById('user_message')
    // Leemos el input del usuario
    let input = document.getElementsByTagName("input");
    let numero = input[0].value;
    let inputCorrecto = false;
    if (maxIteracion > iteraciones && !victoria) {
        // Si el numero es un dígito positivo de como máximo 5 dígitos
        if (numero > -1 && numero < 100000) {
            // Contamos sus digitos
            let digitosCounter = 0
            for (digito in numero) {
                digitosCounter++
            }
            // Si los digitos son exactamente 5
            if (digitosCounter == 5) {
                // Cambiamos el mensaje de información para el usuario 
                info.innerHTML = "Input correcto... Analizando resultado"
                // Indicamos que el input es correcto
                inputCorrecto = true;
                // Si el input resulta ser correcto insertamos una fila
                insertarFila(numero)
            } else {
                // Si no tiene 5 digitos se lo decimos al usuario
                info.innerHTML = "El numero debe tener 5 dígitos, solo tiene "+digitosCounter
                document.getElementById('invalid_input_sound').play();
            }
        } else {
            // Si no es correcto, le decimos que ponga un numero de 5 dígitos
            info.innerHTML = "Input incorrecto, introduce un numero positivo de 5 dígitos"
            document.getElementById('invalid_input_sound').play();
        }
    } else if (maxIteracion <= iteraciones) {
        info.innerHTML = "Has consumido todos tus intentos. Reinicia la pagina para volver a jugar";
        document.getElementById('invalid_input_sound').play();
    } else {
        info.innerHTML = "Ya has ganado, reinicia la pagina para volver a jugar";
    }
    input[0].value = ""
}

function insertarFila(num) {
    let info = document.getElementById('user_message')
    iteraciones++
    console.log(iteraciones)
    var filas = document.getElementById("filas_container");
    var nuevaFila = document.createElement("div");
    var digitosCorrectos = 0
    for (let digito = 0; digito < 5; digito++) {
        var nuevoDigito = document.createElement("div");
        nuevoDigito.innerHTML = num[digito];
        nuevaFila.appendChild(nuevoDigito);
        var greenSet = false
        var yellowSet = false
        for (let i = 0; i < 5; i++) {
            if (num[digito] == numeroAleatorio.toString()[i]) {
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
    }
    if (digitosCorrectos == 5) {
        info.innerHTML = "Has acertado, enhorabuena!";
        let numerosTop = document.getElementById('numeros_container') 
        document.getElementById('numero_1').innerHTML = num[0]
        document.getElementById('numero_2').innerHTML = num[1]
        document.getElementById('numero_3').innerHTML = num[2]
        document.getElementById('numero_4').innerHTML = num[3]
        document.getElementById('numero_5').innerHTML = num[4]
        numerosTop.style.paddingTop = 0;
        numerosTop.style.alignSelf = "center";
        document.getElementById('victory_sound').play()
        victoria = true
        document.getElementById('comprobar').style.backgroundColor = "gray";

    } else {
        let intentosRestantes = maxIteracion-iteraciones
        if (intentosRestantes == 0) {
            info.innerHTML = "No ha habido suerte :("
            document.getElementById('no_luck_sound').play();
        } else {
            info.innerHTML = "Has acertado "+ digitosCorrectos + " digito(s). Te quedan " + intentosRestantes + " intentos";
            document.getElementById('miss_sound').play();
        }
    }
    filas.insertBefore(nuevaFila, filas.firstChild)
}