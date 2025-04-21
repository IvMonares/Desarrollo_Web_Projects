<?php

session_start();
auth_user();

function auth_user()
{

    $page = getCurrentPage();

    switch ($page) {
        case 'login':

            if (isset($_GET['exit'])) {
                $_SESSION = array();
            } else {
                if (check_user()) {
                    header('Location:index.php');
                    exit();
                }
            }
            break;

        case 'signup':
            if (check_user()) {
                header('Location:index.php');
                exit();
            }
            break;
        default:
            if (!check_user()) {
                header('Location:login.php');
                exit();
            }
            break;
    }
}

function check_user()
{
    return isset($_SESSION['name']);
}
