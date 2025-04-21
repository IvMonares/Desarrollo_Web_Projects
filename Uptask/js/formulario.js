eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', validateSignup);

}

function validateSignup(e) {
    e.preventDefault();

    var user = document.querySelector('#usuario').value;
    var password = document.querySelector('#password').value;
    var type = document.querySelector('#tipo').value;

    if (user === '' || password === '') {
        swal({
            type: 'error',
            title: 'Error!',
            text: 'Ambos campos son obligatorios.'
        });
    } else {

        var data = new FormData();
        data.append('user', user);
        data.append('password', password);
        data.append('action', type);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'inc/models/admin-model.php', true);
        xhr.onload = function() {
            if (this.status === 200) {
                var response = JSON.parse(xhr.responseText);
                switch (response.answer) {
                    case 'correct':
                        if (response.type === 'signup') {
                            swal({
                                    type: 'success',
                                    title: 'Usuario Creado',
                                    text: 'Su usuario se creó correctamente.'
                                })
                                .then(result => {
                                    if (result.value) {
                                        window.location.href = 'index.php';
                                    }
                                });
                        } else if (response.type === 'login') {
                            swal({
                                    type: 'success',
                                    title: `Bienvenido de vuelta ${response.name}`,
                                    text: 'Presiona OK para continuar a tu Dashboard.'
                                })
                                .then(result => {
                                    if (result.value) {
                                        window.location.href = 'index.php';
                                    }
                                });
                        }
                        break;
                    case 'repeated':
                        swal({
                            type: 'error',
                            title: 'Usuario repetido',
                            text: 'Este nombre de usuario ya existe.'
                        });
                        break;
                    case 'no_user':
                        swal({
                            type: 'error',
                            title: 'Usuario incorrecto',
                            text: 'Este nombre de usuario no existe.'
                        });
                        break;
                    case 'wrong_password':
                        swal({
                            type: 'error',
                            title: 'Contraseña incorrecta',
                            text: 'La contraseña ingresada es incorrecta.'
                        });
                        break;
                    case 'error':
                        swal({
                            type: 'error',
                            title: 'Error',
                            text: 'Hubo un error.'
                        });
                        break;
                    default:
                        break;
                }
            }

        }
        xhr.send(data);
    }
}