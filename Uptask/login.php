<?php

include 'inc/functions/functions.php';
include 'inc/functions/sessions.php';

include 'inc/functions/connection.php';
include 'inc/templates/header.php';

if (isset($_GET['exit'])) {
    $_SESSION = array();
}
?>

<div class="contenedor-formulario">
    <h1>UpTask</h1>
    <form id="formulario" class="caja-login" method="post">
        <div class="campo">
            <label for="usuario">Usuario: </label>
            <input type="text" name="usuario" id="usuario" placeholder="Usuario">
        </div>
        <div class="campo">
            <label for="password">Password: </label>
            <input type="password" name="password" id="password" placeholder="Password">
        </div>
        <div class="campo enviar">
            <input type="hidden" id="tipo" value="login">
            <input type="submit" class="boton" value="Iniciar Sesión">
        </div>

        <div class="campo">
            <a href="signup.php">Crear una cuenta nueva</a>
        </div>
    </form>
</div>
<?php include 'inc/templates/footer.php'; ?>