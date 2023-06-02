<?php

require_once('database.php');
require_once('Playlist.php');
require_once('Musique.php');

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
}


echo json_encode($data);
exit;

?>