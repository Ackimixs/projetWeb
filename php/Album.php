<?php
require_once ('database.php');
class Album
{
    //
    // Renvoie tous les albums
    //
    static function getAlbums(){
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM album';
            $stmt = $db->prepare($request);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log($exception->getMessage());
            return false;
        }

    }

    //
    // Renvoie un album en particulier
    //
    static function getUnAlbum($id)
    {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM album
                    INNER JOIN musique m on m.id_album = album.id_album
                    WHERE album.id_album = :id';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log($exception->getMessage());
            return false;
        }
    }

    //
    // Renvoie les albums dont le titre contient les lettres de la recherche du user
    //
    static function rechercheAlbums($recherche)
    {
        try {
            $db = Db::connectionDB();
            $request = "
            SELECT * FROM album
            WHERE titre_album ILIKE CONCAT('%', :recherche::text, '%'); 
            ";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':recherche', $recherche);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ( $result[0]['id_album'] == ''){
                return 'Album introuvable.';
            }
            else {
                return $result;
            }
        }
        catch (PDOException $exception){
            error_log($exception->getMessage());
            return false;
        }
    }
}