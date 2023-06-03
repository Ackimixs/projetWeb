<?php

require_once('database.php');
require_once('Playlist.php');
require_once('Musique.php');
require_once('Artiste.php');
require_once('Album.php');
require_once('User.php');

session_start();

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
                $data = Playlist::getPlaylists();
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
                        User::changeInHistorique($_SESSION['user']['id_user'], $_POST['id'], date("Y-m-d H:i:s"));
                    } else {
                        User::ajoutHistorique($_SESSION["user"]['id_user'], $_POST['id']);
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

    default:
        // Requête invalide
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

echo json_encode($data);
exit;

?>