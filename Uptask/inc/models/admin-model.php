<?php

$user = $_POST['user'];
$password = $_POST['password'];
$action = $_POST['action'];

if ($action == 'signup') {

    $options = array(
        'cost' => 10
    );

    $hashed_password = password_hash($password, PASSWORD_BCRYPT, $options);

    include '../functions/connection.php';

    try {
        $stmt = $conn->prepare("SELECT username FROM users WHERE username = ?");
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $stmt->bind_result($username);
        $stmt->fetch();

        if ($username) {
            $response = array(
                'answer' => 'repeated'
            );
        } else {
            $stmt->close();

            $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?) ");
            $stmt->bind_param("ss", $user, $hashed_password);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {

                session_start();
                $_SESSION['name'] = $user;
                $_SESSION['id'] = $stmt->insert_id;
                $_SESSION['login'] = true;

                $response = array(
                    'answer' => 'correct',
                    'inserted_id' => $stmt->insert_id,
                    'type' => $action
                );
            } else {
                $response = array(
                    'answer' => 'error'
                );
            }
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


if ($action == 'login') {

    include '../functions/connection.php';

    $user = $_POST['user'];
    try {
        $stmt = $conn->prepare("SELECT username, id, password FROM users WHERE username = ?");
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $stmt->bind_result($username, $id, $user_password);
        $stmt->fetch();

        if ($username) {
            if (password_verify($password, $user_password)) {

                session_start();
                $_SESSION['name'] = $user;
                $_SESSION['id'] = $id;
                $_SESSION['login'] = true;

                $response = array(
                    'answer' => 'correct',
                    'type' => $action,
                    'name' => $user
                );
            } else {
                $response = array(
                    'answer' => 'wrong_password'
                );
            }
        } else {
            $response = array(
                'answer' => 'no_user'
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
