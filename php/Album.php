<?php
require_once ('database.php');
class Album
{
    //
    // Renvoie tous les albums
    //
    static function getAlbums(){
        $db = Db::connectionDB();
        $request ='SELECT * FROM album';
        $query=$db->prepare($request);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Renvoie un album en particulier
    //
    static function getUnAlbum($id)
    {
        $db = Db::connectionDB();
        $request = 'SELECT * FROM album
                    INNER JOIN musique m on m.id_musique = album.id_musique
                    WHERE album.id_album = :id';
        $query = $db->prepare($request);
        $query->bindParam(':id', $id);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Renvoie les albums dont le titre contient les lettres de la recherche du user
    //
    static function rechercheAlbums($recherche)
    {
        $char = '%';
        $recherchesql = $char . $recherche . $char;

        $db = Db::connectionDB();
        $request = "SELECT * FROM album
                    WHERE titre_album LIKE ':recherche'";
        $query = $db->prepare($request);
        $query->bindParam(':recherche', $recherchesql);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }
}