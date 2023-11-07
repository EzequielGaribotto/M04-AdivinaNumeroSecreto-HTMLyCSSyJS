function estiljs() {
    let parrafo = document.getElementById("text");
    parrafo.style.color = "red";
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
    let enlace = document.getElementById('itb');
    let atributos = enlace.attributes; 

    for (let i = 0; i < atributos.length; i++) {
        console.log(atributos[i].name + ': ' + atributos[i].value);
    }
}

function insertarFila(posicion) {
    var table = document.getElementById("Taula");

    var newRow = document.createElement("tr");

    for (let i = 1; i <= 2; i++) {
        var newCell = document.createElement("td");
        newCell.innerHTML = "fila " + (table.rows.length + 1) + " cel·la " + i;
        newRow.appendChild(newCell);
    }

    if (posicion === 'inicio') {
        table.insertBefore(newRow, table.firstChild);
    } else {
        table.appendChild(newRow);
    }
}
