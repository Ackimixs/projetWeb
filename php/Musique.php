<?php
require_once ('database.php');
class Musique
{
    //
    // Renvoie toutes les musiques
    //
    static function getMusiques(){
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM musique';
            $stmt = $db->prepare($request);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }

    }

    //
    // Renvoie une musique en particulier
    //
    static function getUneMusique($id)
    {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM musique
                        WHERE id_musique = :id';
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

    static function getUneMusiqueAvecAlbumEtArtiste($id) {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM musique
                        INNER JOIN album a on a.id_album = musique.id_album
                        INNER JOIN artiste a2 on a2.id_artiste = id_artiste_principale
                        WHERE id_musique = :id';
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
    // Renvoie les musiques dont le titre contient les lettres de la recherche du user
    //
    static function rechercheMusiques($recherche)
    {
        try {
            $db = Db::connectionDB();
            $request = "
            SELECT * FROM musique
            INNER JOIN album a on a.id_album = musique.id_album
            INNER JOIN artiste a2 on a2.id_artiste = a.id_artiste
            WHERE titre_musique ILIKE CONCAT('%', :recherche::text, '%'); 
            ";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':recherche', $recherche);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ( $result[0]['id_musique'] == ''){
                return 'Musique introuvable.';
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

    //
    // Ajoute une musique a une playlist
    //
    static function ajoutPlaylist($idplaylist, $idmusique)
    {
        try {
            $db = Db::connectionDB();
            $request = "INSERT INTO playlist_musique (id_playlist, id_musique)
                        VALUES(:idplay, :idmus)";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':idplay', $idplaylist);
            $stmt->bindParam(':idmus', $idmusique);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }
    }

    //
    // Delete un musique dans un playlist
    //
    static function deleteMusique($idplaylist, $idmusique)
    {
        try {
            $db = Db::connectionDB();
            $request = "DELETE FROM playlist_musique
                        WHERE id_playlist = :idplay AND id_musique = :idmus";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':idplay', $idplaylist);
            $stmt->bindParam(':idmus', $idmusique);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }
    }
}
