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

    static function getPrivatePlaylist($id_user) {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT p.*
                        FROM playlist p
                        JOIN user_playlist up on p.id_playlist = up.id_playlist
                        WHERE p.public = false AND up.id_user = :id_user';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':id_user', $id_user);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }
    }

    static function exist($titre_playlist) {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM playlist
                        WHERE titre_playlist = :titre_playlist';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':titre_playlist', $titre_playlist);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
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
            SELECT p.id_playlist, p.titre_playlist, p.date_playlist, p.image_playlist, p.public, up.id_user, u.id_user, mail, date_naissance, nom_user, prenom_user, motdepasse, image_user FROM playlist p
            LEFT JOIN user_playlist up on p.id_playlist = up.id_playlist
            LEFT JOIN \"user\" u on u.id_user = up.id_user
            WHERE p.titre_playlist ILIKE CONCAT('%', :recherche::text, '%');
            ";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':recherche', $recherche);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (empty($result) || $result[0]['id_playlist'] == ''){
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
                        INNER JOIN album a on a.id_album = m.id_album
                        INNER JOIN artiste a2 on a2.id_artiste = m.id_artiste_principale
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

    static function musiqueInPlaylist($id_playlist, $id_musique) {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM playlist_musique
                        WHERE id_playlist = :id_playlist AND id_musique = :id_musique';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':id_musique', $id_musique);
            $stmt->bindParam(':id_playlist', $id_playlist);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
            error_log($exception->getMessage());
            return false;
        }
    }

    //
    // Delete une playlist d'un user
    //

    static function deletePlaylist($idplaylist, $iduser) {
        try {
            $db = Db::connectionDB();
            $request = "DELETE FROM user_playlist
                        WHERE id_playlist = :idplay AND id_user = :iduser";
            $query = $db->prepare($request);
            $query->bindParam(':idplay', $idplaylist);
            $query->bindParam(':iduser', $iduser);
            $query->execute();

            $request = "DELETE FROM playlist_musique WHERE id_playlist = :id_playlist";
            $query = $db->prepare($request);
            $query->bindParam(':id_playlist', $idplaylist);
            $query->execute();

            $request = "DELETE FROM playlist WHERE id_playlist = :idplay";
            $query = $db->prepare($request);
            $query->bindParam(':idplay', $idplaylist);
            $query->execute();

        } catch (PDOException $exception) {
            error_log($exception->getMessage());
            return false;
        }
        return true;
    }

    //
    // Création d'une playlist
    //
    static function creationPlaylist($titre, $date, $public = true) {
        $db = Db::connectionDB();
        $request = "INSERT INTO playlist (titre_playlist, date_playlist, public)
                    VALUES(:titre, :date, :public) RETURNING *";
        $query = $db->prepare($request);
        $query->bindParam(':titre', $titre);
        $query->bindParam(':date', $date);
        $query->bindParam(':public', $public);
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

    static function getAllPlaylistUser($id_user) {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM user_playlist JOIN playlist p on p.id_playlist = user_playlist.id_playlist WHERE id_user = :id_user';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':id_user', $id_user);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
            error_log($exception->getMessage());
            return false;
        }
    }

    static function isUserPlaylist($id_user, $id_playlist) {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM user_playlist WHERE id_user = :id_user AND id_playlist = :id_playlist';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':id_user', $id_user);
            $stmt->bindParam(':id_playlist', $id_playlist);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
            error_log($exception->getMessage());
            return false;
        }
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

    static function get9RandomPlaylist() {
        try {
            $db = Db::connectionDB();
            $request = "SELECT * FROM playlist
                        WHERE public = true
                        ORDER BY RANDOM()
                        LIMIT 9";
            $stmt = $db->prepare($request);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
            error_log($exception->getMessage());
            return false;
        }
    }

    static function addMusiqueToPlaylist($id_playlist, $id_musique) {
        try {
            $db = Db::connectionDB();
            $request = "INSERT INTO playlist_musique (id_playlist, id_musique)
                        VALUES(:id_playlist, :id_musique) RETURNING *";
            $query = $db->prepare($request);
            $query->bindParam(':id_playlist', $id_playlist);
            $query->bindParam(':id_musique', $id_musique);
            $query->execute();
            return $query->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
            error_log($exception->getMessage());
            return false;
        }
    }

    static function removeMusiqueFromPlaylist($id_playlist, $id_musique) {
        try {
            $db = Db::connectionDB();
            $request = "DELETE FROM playlist_musique
                        WHERE id_playlist = :id_playlist AND id_musique = :id_musique";
            $query = $db->prepare($request);
            $query->bindParam(':id_playlist', $id_playlist);
            $query->bindParam(':id_musique', $id_musique);
            $query->execute();
        } catch (PDOException $exception) {
            error_log($exception->getMessage());
            return false;
        }
        return true;
    }
}