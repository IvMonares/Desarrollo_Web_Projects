<?php

$proyectName = $_POST['proyectName'];
$type = $_POST['type'];

if ($type == 'create') {

    session_start();
    include '../functions/connection.php';

    try {
        $stmt = $conn->prepare("INSERT INTO proyects (name, user_id) VALUES (?, ?) ");
        $stmt->bind_param("si", $proyectName, $_SESSION['id']);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array(
                'answer' => 'correct',
                'inserted_id' => $stmt->insert_id,
                'type' => $type,
                'proyectName' => $proyectName
            );
        } else {
            $response = array(
                'answer' => 'error'
            );
        }

        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        $response = array(
            'answer' => $e->getMessage()
        );
    }

    echo json_encode($response);
}
