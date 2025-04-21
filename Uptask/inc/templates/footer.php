<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/sweetalert2.all.min.js"></script>

<?php

$actual = getCurrentPage();
if ($actual === 'signup' || $actual === 'login') {
    echo '<script src="js/formulario.js"></script>';
} else {
    echo '<script src="js/scripts.js"></script>';
}

?>

</body>

</html>