<aside class="contenedor-proyectos">
    <div class="panel create-proyect">
        <a href="#" class="boton">Nuevo Proyecto <i class="fas fa-plus"></i> </a>
    </div>

    <div class="panel proyect-list">
        <h2>Proyectos</h2>
        <ul id="proyectos">
            <?php
            $proyects = getAllUserProyects($_SESSION['id']);

            if ($proyects->num_rows > 0) {
                foreach ($proyects as $proyect) {
            ?>
                    <li>
                        <a href="index.php?id=<?php echo $proyect['id']; ?>" id="proyect:<?php echo $proyect['id']; ?>">
                            <?php echo $proyect['name']; ?>
                        </a>
                    </li>
            <?php
                }
            }
            ?>
        </ul>
    </div>
</aside>