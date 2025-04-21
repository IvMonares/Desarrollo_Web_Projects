// pasos para la creación de un request

var btnCargar = document.getElementById('cargar');
btnCargar.addEventListener('click', cargarContenido);

function cargarContenido() {

    
     var xhr = new XMLHttpRequest();
     xhr.open("GET", "server.php", true);

     xhr.onreadystatechange = function() {
         if (xhr.readyState == 4 && xhr.status == 200) {
             console.log(xhr.responseText);
             var json = JSON.parse(xhr.responseText);
             console.log(json);
             var contenido = document.getElementById('contenido');
             contenido.innerHTML = json['full stack'];
         }
     };

     xhr.send();
}