<?php

require_once ('database.php');
class Playlist
{
    //
    // Renvoie toutes les playlists
    //
    static function getPlaylists(){
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM playlist';
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
    // Renvoie une playlist en particulier
    //
    static function getUnePlaylist($id)
    {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM playlist
                        WHERE id_playlist = :id';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }
    }

    //
    // Renvoie les playlists dont le titre contient les lettres de la recherche du user
    //
    static function recherchePlaylists($recherche)
    {
        try {
            $db = Db::connectionDB();
            $request = "
            SELECT * FROM playlist
            WHERE titre_playlist ILIKE CONCAT('%', :recherche::text, '%'); 
            ";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':recherche', $recherche);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ( $result[0]['id_playlist'] == ''){
                return 'Playlist introuvable.';
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
    // Renvoie toutes les musique d'une playlist
    //
    static function musiquePlaylist($idplaylist)
    {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM playlist
                        INNER JOIN playlist_musique pm on pm.id_playlist = playlist.id_playlist
                        INNER JOIN musique m on m.id_musique = pm.id_musique
                        WHERE playlist.id_playlist = :idplaylist';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':idplaylist', $idplaylist);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log($exception->getMessage());
            return false;
        }
    }

    //
    // Delete une playlist d'un user
    //
    /*
    static function deletePlaylist($idplaylist, $iduser)
    {
        $db = Db::connectionDB();
        $request = "DELETE FROM user_playlist
                    WHERE id_playlist = :idplay AND id_user = :iduser";
        $query = $db->prepare($request);
        $query->bindParam(':idplay', $idplaylist);
        $query->bindParam(':iduser', $iduser);
        $query->execute();
        $query->fetchAll(PDO::FETCH_ASSOC);
    }
*/
    //
    // Création d'une playlist
    //
    static function creationPlaylist($titre, $date)
    {
        $db = Db::connectionDB();
        $request = "INSERT INTO playlist (titre_playlist, date_playlist)
                    VALUES(:titre, :date) RETURNING *";
        $query = $db->prepare($request);
        $query->bindParam(':titre', $titre);
        $query->bindParam(':date', $date);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    static function createPlaylistUser($id_playlist, $id_user, $date_ajout) {
        $db = Db::connectionDB();
        $request = "INSERT INTO user_playlist (id_playlist, id_user, date_playlist)
                    VALUES(:id_playlist, :id_user, :date_playlist) RETURNING *";
        $query = $db->prepare($request);
        $query->bindParam(':id_playlist', $id_playlist);
        $query->bindParam(':id_user', $id_user);
        $query->bindParam(':date_playlist', $date_ajout);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }
/*
    //
    // Renvoie la dernière playlist (la plus récente)
    //
    static function dernierePlaylist()
    {
        $db = Db::connectionDB();
        $request = "SELECT * FROM playlist
                    ORDER BY Id DESC
                    LIMIT 1";
        $query = $db->prepare($request);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }*/

}