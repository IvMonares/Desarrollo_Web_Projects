(function() {
    'use strict';

    $(document).ready(function() {

        var proyectList = document.querySelector("ul#proyectos");
        var taskList = document.querySelector(".listado-pendientes ul");
        var percentage = document.querySelector("#percentage");

        updateProyectBar();
        eventListeners();

        function updateProyectBar() {
            var progress = Math.round(100 * document.querySelectorAll('.complete').length / document.querySelectorAll('.task').length);
            percentage.style.width = progress + "%";

            if (progress === 100) {
                swal({
                    type: 'success',
                    title: '¡Proyecto Completado!',
                    text: `Ha completado todas las tareas del proyecto.`
                })
            }

        }

        function eventListeners() {
            document.querySelector('.create-proyect a').addEventListener('click', newProyect);
            document.querySelector('.nueva-tarea').addEventListener('click', newTask);
            document.querySelector('.listado-pendientes').addEventListener('click', taskActions);
        }


        function newProyect(e) {
            e.preventDefault();


            var newProyect = document.createElement('li');
            newProyect.innerHTML = '<input type="text" id="new-Proyect">'
            proyectList.appendChild(newProyect);

            var newProyectInput = document.querySelector('#new-Proyect');
            newProyectInput.focus();

            newProyectInput.addEventListener('keypress', function(e) {
                var key = e.which || e.keyCode;

                if (key === 13) {
                    saveProyectDB(newProyectInput.value);
                    proyectList.removeChild(newProyect);
                }
            });

            newProyectInput.addEventListener('blur', function(e) {
                saveProyectDB(newProyectInput.value);
                proyectList.removeChild(newProyect);
            });
        }

        function saveProyectDB(proyectName) {

            if (proyectName === '') {
                swal({
                    type: 'error',
                    title: 'Nombre vacio',
                    text: 'No se puede crear un proyecto sin nombre.'
                });
            } else {
                var data = new FormData();
                data.append('proyectName', proyectName);
                data.append('type', 'create');

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'inc/models/proyect-model.php', true);

                xhr.onload = function() {
                    if (this.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        switch (response.answer) {
                            case 'correct':
                                if (response.type === 'create') {
                                    var newProyect = document.createElement('li');
                                    newProyect.innerHTML = `
                                                    <a href="index.php?id=${response.inserted_id}" id="proyect:${response.inserted_id}"> 
                                                        ${response.proyectName} 
                                                    </a>
                                                `;
                                    proyectList.appendChild(newProyect);

                                    swal({
                                            type: 'success',
                                            title: 'Proyecto Creado',
                                            text: `El proyecto ${response.proyectName} se creó correctamente.`
                                        })
                                        .then(result => {
                                            if (result.value) {
                                                window.location.href = `index.php?id=${response.inserted_id}`;
                                            }
                                        });


                                }

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


        function newTask(e) {
            e.preventDefault();

            var taskName = document.querySelector('.nombre-tarea').value;


            if (taskName === '') {
                swal({
                    type: 'error',
                    title: 'Nombre vacio',
                    text: 'No se puede crear una tarea sin nombre.'
                });
            } else {
                var data = new FormData();
                data.append('taskName', taskName);
                data.append('proyectId', document.querySelector('#proyect_id').value);
                data.append('type', 'create');

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'inc/models/task-model.php', true);

                xhr.onload = function() {
                    if (this.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        switch (response.answer) {
                            case 'correct':
                                if (response.type === 'create') {
                                    var newTask = document.createElement('li');

                                    newTask.id = 'task:' + response.inserted_id;

                                    newTask.classList.add('task')


                                    newTask.innerHTML = `
                                                    <p>${response.taskName}</p>
                                                    <div class="acciones">
                                                        <i class="far fa-check-circle"></i>
                                                        <i class="fas fa-trash"></i>
                                                    </div>
                                                `;
                                    taskList.appendChild(newTask);

                                    var no_tasks = document.querySelector("#no_tasks");
                                    if (no_tasks) {
                                        taskList.removeChild(no_tasks);
                                    }

                                    document.querySelector('.agregar-tarea').reset();

                                    updateProyectBar();

                                    swal({
                                        type: 'success',
                                        title: 'Tarea Creada',
                                        text: `La tarea ${response.taskName} se creó correctamente.`
                                    });


                                }

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

        function taskActions(e) {
            e.preventDefault();

            if (e.target.classList.contains('fa-check-circle')) {

                var taskId = e.target.parentElement.parentElement.id.split(':')[1];

                if (e.target.classList.contains('complete')) {
                    e.target.classList.remove('complete');
                    changeTaskState(taskId, '0');

                } else {
                    e.target.classList.add('complete');
                    changeTaskState(taskId, '1');
                }
            }

            if (e.target.classList.contains('fa-trash')) {

                var listElement = e.target.parentElement.parentElement;
                var taskId = listElement.id.split(':')[1];

                swal({
                    title: '¿Borrar tarea?',
                    text: "No podrá revertir esta acción!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borrar',
                    cancelButtonText: 'No, conservar'
                }).then((result) => {
                    if (result.value) {
                        listElement.remove();
                        deleteTask(taskId);
                    }
                })

            }


        }

        function changeTaskState(taskId, newState) {

            var data = new FormData();
            data.append('taskId', taskId);
            data.append('type', 'update');
            data.append('state', newState);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'inc/models/task-model.php', true);

            xhr.onload = function() {
                if (this.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    switch (response.answer) {
                        case 'correct':
                            updateProyectBar();
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

        function deleteTask(taskId) {

            var data = new FormData();
            data.append('taskId', taskId);
            data.append('type', 'delete');

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'inc/models/task-model.php', true);

            xhr.onload = function() {
                if (this.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    switch (response.answer) {
                        case 'correct':

                            updateProyectBar();

                            swal(
                                'Borrado!',
                                'La tarea ha sido eliminada.',
                                'success'
                            );

                            if (document.querySelectorAll('.task').length === 0) {
                                taskList.innerHTML = '<p id="no_tasks">No hay tareas para este proyecto</p>';
                            }

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


    }); // DOM CONTENT LOADED
})();