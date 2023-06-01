<?php

class Playlist
{
    //
    // Renvoie toutes les playlists
    //
    static function getPlaylists(){
        $db = dbConnect();
        $request ='SELECT * FROM playlist';
        $query=$db->prepare($request);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Renvoie une playlist en particulier
    //
    static function getUnePlaylist($id)
    {
        $db = dbConnect();
        $request = 'SELECT * FROM playlist
                    WHERE id_playlist = :id';
        $query = $db->prepare($request);
        $query->bindParam(':id', $id);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Renvoie les playlists dont le titre contient les lettres de la recherche du user
    //
    static function recherchePlaylists($recherche)
    {
        $char = '%';
        $recherchesql = $char . $recherche . $char;

        $db = dbConnect();
        $request = "SELECT * FROM playlist
                    WHERE titre_playlist LIKE ':recherche'";
        $query = $db->prepare($request);
        $query->bindParam(':recherche', $recherchesql);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Renvoie toutes les musique d'une playlist
    //
    static function musiquePlaylist($idplaylist)
    {
        $db = dbConnect();
        $request = 'SELECT * FROM playlist
                    INNER JOIN playlist_musique pm on pm.id_playlist = playlist.id_playlist
                    INNER JOIN musique m on m.id_musique = pm.id_musique
                    WHERE playlist.id_playlist = :idplaylist';
        $query = $db->prepare($request);
        $query->bindParam(':idplaylist', $idplaylist);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Delete une playlist d'un user
    //
    static function deletePlaylist($idplaylist, $iduser)
    {
        $db = dbConnect();
        $request = "DELETE FROM user_playlist
                    WHERE id_playlist = :idplay AND id_user = :iduser";
        $query = $db->prepare($request);
        $query->bindParam(':idplay', $idplaylist);
        $query->bindParam(':iduser', $iduser);
        $query->execute();
        $query->fetchAll(PDO::FETCH_ASSOC);
    }
}