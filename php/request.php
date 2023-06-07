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
                } else if ($id != null) {
                    $data = Playlist::getUnePlaylist($id);
                } else {
                    $data = Playlist::getPlaylists();
                }
                break;

            case 'POST':
                if (isset($_POST['playlistName']) && !Playlist::exist($_POST['playlistName'])) {
                    $data = Playlist::creationPlaylist($_POST['playlistName'], date('Y-m-d H:i:s'), $_POST['public']);
                } else {
                    $data = false;
                }
                break;

            case 'DELETE':
                if (isset($_SESSION["user"])) {
                    if ($id !== null && Playlist::isUserPlaylist($_SESSION['user']['id_user'], $id)) {
                        $data = Playlist::deletePlaylist($id, $_SESSION['user']['id_user']);
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
                    } else {
                        $data = User::getUnUser($id);
                    }
                }
                break;

            case 'POST':
                if (isset($_SESSION["user"])) {
                    if (isset($_POST['password'])) {
                        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
                    } else {
                        $password = $_SESSION['user']['password'];
                    }
                    $data = User::modificationGeneralUser($_SESSION["user"]['id_user'], $_POST['nom'] ?? $_SESSION['user']['nom'], $_POST['prenom'] ?? $_SESSION['user']['prenom'], $_POST['email'] ?? $_SESSION['user']['mail'], $password, $_POST['date'] ?? $_SESSION['user']['date_naissance']);
                    $_SESSION['user'] = $data;
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
    case 'album':
        switch ($request_method) {
            case 'GET':
                if ($id != null) {
                    $data = Album::getUnAlbum($id);
                } else {
                    $data = Album::getAlbums();
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'recherchemusique':
        switch ($request_method) {
            case 'GET':
                if (isset($_GET['stringrecherche'])) {
                    $data = Musique::rechercheMusiques($_GET['stringrecherche']);
                }
                else {
                    $data = false;
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'rechercheplaylist':
        switch ($request_method) {
            case 'GET':
                if (isset($_GET['stringrecherche'])) {
                    $data = Playlist::recherchePlaylists($_GET['stringrecherche']);
                }
                else {
                    $data = false;
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'recherchealbum':
        switch ($request_method) {
            case 'GET':
                if (isset($_GET['stringrecherche'])) {
                    $data = Album::rechercheAlbums($_GET['stringrecherche']);
                }
                else {
                    $data = false;
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'rechercheartiste':
        switch ($request_method) {
            case 'GET':
                if (isset($_GET['stringrecherche'])) {
                    $data = Artiste::rechercheArtistes($_GET['stringrecherche']);
                }
                else {
                    $data = false;
                }
                break;
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'infosMusique':
        switch ($request_method) {
            case 'GET':
                if ($_GET['idmusique'] != null) {
                    $data = Musique::getUneMusiqueAvecAlbumEtArtiste($_GET['idmusique']);
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
    case 'infosAlbum':
        switch ($request_method) {
            case 'GET':
                if ($_GET['idalbum'] != null) {
                    $data = Album::getUnAlbum($_GET['idalbum']);
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
    case 'getArtiste':
        switch ($request_method) {
            case 'GET':
                if ($_GET['idartiste'] != null) {
                    $data = Artiste::getUnArtiste($_GET['idartiste']);
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
                            $data = User::removeFromHistorique($_SESSION['user']['id_user'], $musique['id_musique']);
                        }
                    } else if ($id != null) {
                        $data = User::removeFromHistorique($_SESSION['user']['id_user'], $id);
                    } else {
                        $data = User::removeAllHistorique($_SESSION['user']['id_user']);
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
                    if ($id == 'random') {
                        $data = User::getRandomFileAttente($_SESSION['user']['id_user']);
                    } else if ($id != null) {
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
                    $data = User::addToFileAttente($_SESSION['user']['id_user'], $_POST['id']);
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
            default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
        break;
    case 'musique-playlist':
        switch ($request_method) {
            case 'GET':
                if ($_SESSION["user"]) {
                    if ($id == 'isIn') {
                        $data = Playlist::musiqueInPlaylist($_GET['id_playlist'], $_GET['id_musique']);
                    }
                    else if ($id != null) {
                        $data = Playlist::musiquePlaylist($id);
                    } else {
                        $data = false;
                    }
                } else {
                    $data = false;
                }
                break;
            case 'POST':
                if (isset($_POST['id_playlist']) && isset($_POST['id_musique']) && !Playlist::musiqueInPlaylist($_POST['id_playlist'], $_POST['id_musique'])) {
                    $data = Playlist::addMusiqueToPlaylist($_POST['id_playlist'], $_POST['id_musique']);
                } else {
                    $data = false;
                }
                break;
           case 'DELETE':
                if (isset($_SESSION["user"])) {
                    $data = Playlist::musiqueInPlaylist($_GET['id_playlist'], $_GET['id_musique']);
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

    case 'user-playlist':
        switch ($request_method) {
            case 'GET':
                if ($_SESSION["user"]) {
                    if ($id == null) {
                        $data = Playlist::getAllPlaylistUser($_SESSION['user']['id_user']);
                    } else {
                        $data = Playlist::isUserPlaylist($_SESSION['user']['id_user'], $id);
                    }
                } else {
                    $data = false;
                }
                break;
            case 'POST':
                if ($_POST['id_user'] && $_POST['id_playlist']) {
                    $data = Playlist::createPlaylistUser($_POST['id_playlist'], $_POST['id_user'], date("Y-m-d H:i:s"));
                } else {
                    $data = false;
                }
                break;
            case 'DELETE':
                if ($_GET['id_musique'] && $_GET['id_playlist']) {
                    $data = Playlist::removeMusiqueFromPlaylist($_GET['id_playlist'], $_GET['id_musique']);
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

    case 'private-playlist':
        switch ($request_method) {
            case 'GET':
                if (isset($_SESSION['user'])) {
                    $data = Playlist::getPrivatePlaylist($_SESSION['user']['id_user']);
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
    default:
        // Requête invalide
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

echo json_encode($data);
exit;

?>