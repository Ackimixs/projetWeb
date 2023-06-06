<?php
    session_start();
    require_once 'php/User.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	  <title>Spotifaie | login</title>
	  <link rel="stylesheet" type="text/css" href="styles/login.css">
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <form class="form" action="login.php" method="post">
    <?php

        if (isset($_POST['email']) && isset($_POST['password'])) {
            $email = $_POST['email'];
            $password = $_POST['password'];

            if (User::authentification($email, $password)) {
                $user = User::getUserByEmail($email);
                $_SESSION['user'] = $user;
                header('Location: index.html');
            } else {
                echo '<p class="error">Mauvais identifiants</p>';
            }
        }

    ?>
        <div class="title">Spotifaïe</div>
        <div class="subtitle">BIENVENUE</div>
        <div class="input-container ic1">
            <input id="email" class="input" type="email" name="email" placeholder=" " />
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">Adresse mail</label>
        </div>
        <div class="input-container ic2">
            <input id="password" class="input" type="password" name="password" placeholder=" " />
            <div class="cut cut-short"></div>
            <label for="password" class="placeholder">Mot de passe</label>
        </div>
        <button type="submit" class="Valider">Valider</button>
        <div class="case">
            <div class="button">
                <a href="Sign_Up.php" class="sign">Sign up</a>
            </div>
        </div>
    </form>
</body>
</html>