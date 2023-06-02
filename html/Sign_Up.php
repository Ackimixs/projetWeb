<?php
    session_start();
    require_once '../php/User.php';
    require_once '../php/Playlist.php';
?>
<!DOCTYPE html>
<html>
<head>
	<title>Sign Up</title>
	<link rel="stylesheet" type="text/css" href="Sign_Up.css">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <form class="form" action="Sign_Up.php" method="post">
    <?php
        $errors = [];

        if (isset($_POST['name']) && isset($_POST['prenom']) && isset($_POST['naissance']) && isset($_POST['email']) && isset($_POST['password'])) {
            $name = $_POST['name'];
            $prenom = $_POST['prenom'];
            $naissance = $_POST['naissance'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $passwordConfirm = $_POST['passwordConfirm'];

            if (User::getUserByEmail($email)) {
                $errors[] = 'Cet email est déjà utilisé';
            } else if ($password != $passwordConfirm) {
                $errors[] = 'Les mots de passe ne correspondent pas';
            } else {
                $user = User::ajouterUnUser($email, $naissance, $name, $prenom, password_hash($password, PASSWORD_DEFAULT));
                $_SESSION['user'] = $user;
                // Crée la playlsit like
                $playlist = Playlist::creationPlaylist("like", date('Y-m-d H:i:s'));
                $userPlaylist = Playlist::createPlaylistUser($playlist['id_playlist'], $user['id_user'], date('Y-m-d H:i:s'));
                header('Location: login.php');
            }
        }

        foreach ($errors as $error) {
            echo $error;
        }
    ?>
        <div class="title">Spotifaïe</div>
          <div class="one">
            <div class="input-container ic2">
              <input id="name" class="input" type="text" name="name" placeholder=" " />
              <!-- <div class="cut cut-short"></div> -->
              <label for="name" class="placeholder">Nom</label>
            </div>
          </div>
          <div class="two">
            <div class="input-container ic2">
              <input id="prenom" class="input" type="text" name="prenom" placeholder=" " />
              <!-- <div class="cut cut-short"></div> -->
              <label for="prenom" class="placeholder">Prenom</label>
            </div>
          </div>
          <div class="three">
            <div class="input-container ic2">
              <input id="naissance" class="input" name="naissance" type="date" placeholder=" " />
              <div class="cut cut-short"></div>
              <label for="naissance" class="placeholder">année de naissance</label>
            </div>
          </div>
          <div class="four">
            <div class="input-container ic2">
              <input id="email" class="input" name="email" type="text" placeholder=" " />
              <label for="email" class="placeholder">Adresse mail</label>
            </div>
          </div>
          <div class="five">
            <div class="input-container ic2">
              <input id="password" class="input" type="password" name="password" placeholder=" " />
              <label for="password" class="placeholder">Mot de passe</label>
            </div>
          </div>
          <div class="six">
            <div class="input-container ic2">
              <input id="passwordConfirm" class="input" type="password" name="passwordConfirm" placeholder=" " />
              <label for="passwordConfirm" class="placeholder">Vérification</label>
            </div>
          </div>
        <button type="submit" class="submit">Créer son compte</button>
        <div class="button">
          <a href="login.html" class="log">Login</a>
        </div>
      </form>
</body>
</html>