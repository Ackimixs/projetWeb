<?php

require_once('database.php');
require_once('Playlist.php');
require_once('Musique.php');
require_once('Artiste.php');
require_once('Album.php');
require_once('User.php');

session_start();

date_default_timezone_set('Europe/Paris');

// Database connection.
$db = Db::connectionDB();
if (!$db)
{
    header('HTTP/1.1 503 Service Unavailable');
    exit;
}

$request_method = $_SERVER["REQUEST_METHOD"];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request);
$requestRessource = array_shift($request);


$data = false;
$id = array_shift($request);
if ($id == '')
    $id = NULL;

switch($requestRessource)
{
    case 'playlist':
        switch ($request_method){
            case 'GET':
                if ($id == 'random') {
                    $data = Playlist::get9RandomPlaylist();
                } else {
                    $data = Playlist::getPlaylists();
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;

    case 'musique':
        switch ($request_method) {
            case 'GET':
                if ($id != null) {
                    $data = Musique::getUneMusiqueAvecAlbumEtArtiste($id);
                } else {
                    $data = Musique::getMusiques();
                }

                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;

    case 'user':
        switch ($request_method) {
            case 'GET':
                if ($id != null) {
                    if ($id == "session") {
                        if (isset($_SESSION["user"])) {
                            $data = $_SESSION['user'];
                        } else {
                            $data = false;
                        }
                    }
                }
                break;
           default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'album':
        switch ($request_method) {
            case 'GET':
                if ($id != null) {
                    $data = Album::getUnAlbum($id);
                } else {
                    $data = false;
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'recherchemusique':
        //print_r('get :'.$_GET['stringrecherche']);
        $data = array(); //Musique::rechercheMusiques($_GET['stringrecherche']);
        break;
    case 'rechercheplaylist':
        $data = Playlist::recherchePlaylists($_GET['stringrecherche']);
        break;
    case 'recherchealbum':
        $data = Album::rechercheAlbums($_GET['stringrecherche']);
        break;
    case 'rechercheartiste':
        $data = Artiste::rechercheArtistes($_GET['stringrecherche']);
        break;

    case 'historique':
        switch ($request_method) {
            case 'GET':
                $data = User::historiqueUser($_SESSION['user']['id_user']);
                break;
            case 'POST':
                if (isset($_SESSION["user"])) {
                    if (User::isInHistorique($_SESSION["user"]['id_user'], $_POST['id'])) {
                        User::changeInHistorique($_SESSION['user']['id_user'], $_POST['id'], date('Y-m-d H:i:s'));
                    } else {
                        User::ajoutHistorique($_SESSION["user"]['id_user'], $_POST['id']);
                    }
                    $data = true;
                } else {
                    $data = false;
                }

                break;

            case 'DELETE':
                if (isset($_SESSION["user"])) {
                    if ($id == 'last') {
                        $musique = User::getLastHistorique($_SESSION['user']['id_user']);
                        if ($musique) {
                            User::removeFromHistorique($_SESSION['user']['id_user'], $musique['id_musique']);
                        }
                    } else {
                        User::removeFromHistorique($_SESSION['user']['id_user'], $id);
                    }
                    $data = true;
                } else {
                    $data = false;
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;

        }
        break;
    case 'profile-picture';
        switch ($request_method) {
            case 'POST':
                if (isset($_SESSION["user"])) {
                    if (isset($_FILES['image'])) {
                        $image = $_FILES['image'];

                        // Check if there was an error uploading the image
                        if ($image['error'] === UPLOAD_ERR_OK) {
                            $tempPath = $image['tmp_name'];
                            $uploadPath = str_replace(' ', '', '../' . $_SESSION['user']['image_user']);

                            $data = move_uploaded_file($tempPath, $uploadPath);

                        } else {
                            $data = "Error uploading the image: " . $image['error'];
                        }
                    } else {
                        $data = "No image file received.";
                    }
                }
                break;
            case 'GET':
                if (isset($_SESSION["user"])) {
                    if (file_exists(str_replace(' ', '', '../' . $_SESSION['user']['image_user']))) {
                        $data = str_replace(' ', '', '../' . $_SESSION['user']['image_user']);
                    } else {
                        $data = false;
                    }
                } else {
                    $data = false;
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'logout':
        switch ($request_method) {
            case 'GET':
                if (isset($_SESSION["user"])) {
                    unset($_SESSION["user"]);
                    $data = true;
                } else {
                    $data = false;
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'musique-cover':
        switch ($request_method) {
            case 'GET':
                if ($id != null) {
                    $data = Musique::getImgMusic($id);
                } else {
                    $data = false;
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'like':
        switch ($request_method) {
            case 'GET':
                if (isset($_SESSION["user"])) {
                    if ($id != null) {
                        $data = User::isLike($_SESSION['user']['id_user'], $id);
                    } else {
                        $data = User::getAllLike($_SESSION['user']['id_user']);
                    }
                } else {
                    $data = false;
                }
                break;
            case 'POST':
                if (isset($_SESSION["user"])) {
                    $data = User::addToLike($_SESSION['user']['id_user'], $_POST['id']);
                } else {
                    $data = false;
                }
                break;
            case 'DELETE':
                if (isset($_SESSION["user"])) {
                    $data = User::removeFromLike($_SESSION['user']['id_user'], $id);
                } else {
                    $data = false;
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;

    case 'file-attente':
        switch ($request_method) {
            case 'GET':
                if (isset($_SESSION["user"])) {
                    if ($id != null) {
                        $data = User::isInFileAttente($_SESSION['user']['id_user'], $id);
                    } else {
                        $data = User::getFileAttente($_SESSION['user']['id_user']);
                    }
                } else {
                    $data = false;
                }
                break;
            case 'POST':
                if (isset($_SESSION["user"])) {
                    User::addToFileAttente($_SESSION['user']['id_user'], $_POST['id']);
                    $data = true;
                } else {
                    $data = false;
                }
                break;
            case 'DELETE':
                if (isset($_SESSION["user"])) {
                    if ($id != null) {
                        $data = User::removeFromFileAttente($_SESSION['user']['id_user'], $id);
                    } else {
                        $data = User::removeAllFileAttente($_SESSION['user']['id_user']);
                    }
                } else {
                    $data = false;
                }
                break;
        }

        break;
    default:
        // Requête invalide
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

echo json_encode($data);
exit;

?>