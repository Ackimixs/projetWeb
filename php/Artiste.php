<?php
require_once ('database.php');
class Artiste
{
    //
    // Renvoie tous les artistes
    //
    static function getArtistes(){
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM artiste';
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
    // Renvoie un artiste en particulier avec ses musiques et ses albums
    //
    static function getUnArtiste($id)
    {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM musique
                        INNER JOIN artiste_musique am on musique.id_musique = am.id_musique
                        INNER JOIN album a on musique.id_album = a.id_album
                        WHERE am.id_artiste = :id';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }
    }

    //
    // Renvoie les artistes dont le titre contient les lettres de la recherche du user
    //
    static function rechercheArtiste($recherche)
    {
        try {
            $db = Db::connectionDB();
            $request = "SELECT * FROM artiste
                        WHERE nom_artiste ILIKE CONCAT('%', :recherche::text, '%'); 
                        ";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':recherche', $recherche);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log($exception->getMessage());
            return false;
        }
    }
}