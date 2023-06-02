<?php

require_once('database.php');
require_once('Playlist.php');
require_once('Musique.php');

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
                        $data = $_SESSION['user'];
                    }
                }
                break;
           default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
    case 'recherchemusique':
        //print_r('get :'.$_GET['stringrecherche']);
        $data = Musique::rechercheMusiques($_GET['stringrecherche']);
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
    default:
        // Requête invalide
        header("HTTP/1.0 405 Method Not Allowed");
        break;
    break;
}


echo json_encode($data);
exit;

?>