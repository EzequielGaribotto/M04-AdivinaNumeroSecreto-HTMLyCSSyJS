function estiljs() {
    let parrafo = document.getElementById("text");
    let parrafoNewStyle = parrafo.style.color = "red";
}

function prenValorForm() {
    let inputs = document.getElementsByTagName("input")
    let nom = inputs[0].value;
    let cognom = inputs[1].value;
    console.log(nom +" "+ cognom)
}

function cambiarColorDeFondo() {
    let parrafos = document.getElementsByTagName("p")
    for (parrafo in parrafos) {
        parrafos[parrafo].style.backgroundColor = "red";
    }
}

function obtenirAtributs() {
    console.log(element.attribute)
}