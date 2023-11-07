const numeroAleatorio = Math.floor(10000 + Math.random() * 90000);
console.log(numeroAleatorio)
var digitosCorrectos = 0
function comprobarInput() {
    let inputCorrecto = false;
    // Leemos el input del usuario
    let input = document.getElementsByTagName("input");
    let numero = input[0].value;

    // Iniciamos el elemento del mensaje que se le mostrará al usuario
    let info = document.getElementById('user_message')

    // Si el numero es un dígito positivo de como máximo 5 dígitos
    if (numero > 0 && numero < 100000) {
        // Contamos sus digitos
        let digitosCounter = 0
        for (digito in numero) {
            digitosCounter++
        }
        // Si los digitos son exactamente 5
        if (digitosCounter == 5) {
            // Cambiamos el mensaje de información para el usuario 
            let infoModif = info.innerHTML = "Input correcto... Analizando resultado"
            // Indicamos que el input es correcto
            inputCorrecto = true;
            // Si el input resulta ser correcto insertamos una fila
            insertarFila(numero)
        } else {
            // Si no tiene 5 digitos se lo decimos al usuario
            let infoModif = info.innerHTML = "El numero debe tener 5 dígitos, solo tiene "+digitosCounter
        }
    } else {
        // Si no es correcto, le decimos que ponga un numero de 5 dígitos
        let infoModif = info.innerHTML = "Input incorrecto, introduce un numero positivo de 5 dígitos"
    }

}

function insertarFila(num) {
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
                    nuevoDigito.style.backgroundColor = "green";
                    greenSet = true
                } else if (!greenSet) {
                    // Color amarillo
                    nuevoDigito.style.backgroundColor = "yellow";
                    yellowSet = true
                }
            } else if (!greenSet && !yellowSet) {
                // Color gris
                nuevoDigito.style.backgroundColor = "gray";
            }
        }
    }
    if (digitosCorrectos == 5) {
        document.getElementById('user_message').innerHTML = "Has acertado, enhorabuena!";
        let numerosTop = document.getElementById('numeros_container') 
        document.getElementById('numero_1').innerHTML = num[0]
        document.getElementById('numero_2').innerHTML = num[1]
        document.getElementById('numero_3').innerHTML = num[2]
        document.getElementById('numero_4').innerHTML = num[3]
        document.getElementById('numero_5').innerHTML = num[4]
        numerosTop.style.padding = 0;
    } else {
        document.getElementById('user_message').innerHTML = "Has acertado "+ digitosCorrectos + " digitos";
    }
    filas.appendChild(nuevaFila);
}