<?php

$type = $_POST['type'];
$taskName = $_POST['taskName'];
$proyectId = $_POST['proyectId'];
$taskId = $_POST['taskId'];
$state = $_POST['state'];

if ($type == 'create') {

    include '../functions/connection.php';

    try {
        $stmt = $conn->prepare("INSERT INTO tasks (name, proyect_id) VALUES (?, ?) ");
        $stmt->bind_param("si", $taskName, $proyectId);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array(
                'answer' => 'correct',
                'inserted_id' => $stmt->insert_id,
                'type' => $type,
                'taskName' => $taskName
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


if ($type == 'update') {

    include '../functions/connection.php';

    try {

        $stmt = $conn->prepare("UPDATE tasks SET state = ? WHERE id = ? ");
        $stmt->bind_param("ii", $state, $taskId);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array(
                'answer' => 'correct',
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


if ($type == 'delete') {

    include '../functions/connection.php';

    try {

        $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ? ");
        $stmt->bind_param("i", $taskId);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array(
                'answer' => 'correct',
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
