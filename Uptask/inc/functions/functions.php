<?php

function getCurrentPage()
{
    $file = basename($_SERVER['PHP_SELF']);
    $page = str_replace(".php", "", $file);
    return $page;
}

function getAllUserProyects($id = null)
{

    session_start();
    include 'connection.php';

    try {
        $sql = 'SELECT id, name FROM proyects WHERE user_id = ';
        $sql .= $id;
        return $conn->query($sql);
    } catch (Exception $e) {
        return false;
    }
}

function getProyectName($id = null)
{

    session_start();
    include 'connection.php';

    try {
        $sql = 'SELECT name FROM proyects WHERE id = ';
        $sql .= $id;
        return $conn->query($sql);
    } catch (Exception $e) {
        return false;
    }
}


function getAllProyectTasks($id = null)
{

    session_start();
    include 'connection.php';

    try {
        $sql = 'SELECT id, name, state FROM tasks WHERE proyect_id = ';
        $sql .= $id;
        return $conn->query($sql);
    } catch (Exception $e) {
        return false;
    }
}
