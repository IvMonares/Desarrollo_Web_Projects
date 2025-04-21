<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Aprendiendo PHP</title>
    <link href="https://fonts.googleapis.com/css?family=Proza+Libre" rel="stylesheet">

    <link rel="stylesheet" href="css/estilos.css" media="screen" title="no title">
</head>

<body>

    <div class="contenedor">
        <h1>Aprendiendo PHP</h1>

        <pre>
        <?php
        echo var_dump($_POST);
        ?>
        </pre>

        <hr>

        <h2>Mensaje</h2>
        <?php
        if ((filter_has_var(INPUT_POST, 'mensaje') && (strlen(filter_input(INPUT_POST, 'mensaje')) > 0))) {
            $message = $_POST['mensaje'];
            $clean_message = filter_var($message, FILTER_SANITIZE_STRING);

            if (strlen($clean_message) > 0 && trim($clean_message)) {
                echo $clean_message;
            } else {
                echo "espacios no cuentan";
            }
        } else {
            echo "algo falta";
        }
        ?>

    </div>


</body>

</html>