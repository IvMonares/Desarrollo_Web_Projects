<?php

$conn = new mysqli('localhost', 'root', 'root', 'uptask');

if ($conn->connect_error) {
    $response = array(
        'error' => $error->$conn->connect_error
    );
    echo json_encode($_POST);
    exit;
}

//$conn->set_charset('utf8');
