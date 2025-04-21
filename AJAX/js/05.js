// pasos para la creación de un request

var btnCargar = document.getElementById('cargar');
btnCargar.addEventListener('click', cargarContenido);

function cargarContenido() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "text.txt", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var contenido = document.getElementById('contenido');
            contenido.innerHTML = xhr.responseText;
        }
    };

    xhr.send();
}