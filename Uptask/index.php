<?php
include 'inc/functions/functions.php';
include 'inc/functions/sessions.php';

include 'inc/templates/header.php';
include 'inc/templates/bar.php';

if (isset($_GET['id'])) {
    $proyect_id = $_GET['id'];
}


?>

<div class="contenedor">
    <?php include 'inc/templates/sidebar.php'; ?>

    <main class="contenido-principal">

        <?php

        $proyect = getProyectName($proyect_id);
        if ($proyect->num_rows > 0) {
        ?>

            <h1>Proyecto Actual:

                <?php
                foreach ($proyect as $proyect_data) {
                    echo '<span>' . $proyect_data['name'] . '</span>';
                }
                ?>

            </h1>

            <form action="#" class="agregar-tarea">
                <div class="campo">
                    <label for="tarea">Tarea:</label>
                    <input type="text" placeholder="Nombre Tarea" class="nombre-tarea">
                </div>
                <div class="campo enviar">
                    <input type="hidden" id="proyect_id" value="<?php echo $proyect_id; ?>">
                    <input type="submit" class="boton nueva-tarea" value="Agregar">
                </div>
            </form>

            <div class="progress">
                <h2>Avance de proyecto</h2>
                <div id="progressBar" class="progressBar">
                    <div id="percentage" class="percentage"></div>
                </div>

                <h2>Listado de tareas:</h2>

                <div class="listado-pendientes">
                    <ul>

                        <?php
                        $tasks = getAllProyectTasks($proyect_id);

                        if ($tasks->num_rows > 0) {
                            foreach ($tasks as $task) {
                        ?>
                                <li id="task:<?php echo $task['id']; ?>" class="task">
                                    <p><?php echo $task['name']; ?></p>
                                    <div class="acciones">
                                        <i class="far fa-check-circle <?php echo $task['state'] == 1 ? 'complete' : ''; ?>"></i>
                                        <i class="fas fa-trash"></i>
                                    </div>
                                </li>
                        <?php
                            }
                        } else {
                            echo '<p id="no_tasks">No hay tareas para este proyecto</p>';
                        }

                        ?>
                    </ul>
                </div>

            <?php
        } else {
            echo '<br>';
            echo '<h1>Seleccione o cree un proyecto<h1>';
        } ?>

    </main>
</div>
<!--.contenedor-->
<?php include 'inc/templates/footer.php'; ?>