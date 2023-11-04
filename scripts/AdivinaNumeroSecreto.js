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
        } else {
            // Si no tiene 5 digitos se lo decimos al usuario
            let infoModif = info.innerHTML = "El numero debe tener 5 dígitos, solo tiene "+digitosCounter
        }
    } else {
        // Si no es correcto, le decimos que ponga un numero de 5 dígitos
        let infoModif = info.innerHTML = "Input incorrecto, introduce un numero positivo de 5 dígitos"
    }

    // Si el input resulta ser correcto
    if (inputCorrecto) {
        let numeroUno = document.getElementById('numero_1')
        let numeroDos = document.getElementById('numero_2')
        let numeroTres = document.getElementById('numero_3')
        let numeroCuatro = document.getElementById('numero_4')
        let numeroCinco = document.getElementById('numero_5')
    }
}