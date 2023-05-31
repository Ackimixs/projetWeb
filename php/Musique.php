<?php

class Musique
{
    //
    // Renvoie toutes les musiques
    //
    static function getMusiques(){
        $db = dbConnect();
        $request ='SELECT * FROM musique';
        $query=$db->prepare($request);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Renvoie une musique en particulier
    //
    static function getUneMusique($id)
    {
        $db = dbConnect();
        $request = 'SELECT * FROM musique
                    WHERE id_musique = :id';
        $query = $db->prepare($request);
        $query->bindParam(':id', $id);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Renvoie les musiques dont le titre contient les lettres de la recherche du user
    //
    static function rechercheMusiques($recherche)
    {
        $char = '%';
        $recherchesql = $char . $recherche . $char;

        $db = dbConnect();
        $request = "SELECT * FROM musique
                    WHERE titre_musique LIKE ':recherche'";
        $query = $db->prepare($request);
        $query->bindParam(':recherche', $recherchesql);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Ajoute une musique a une playlist
    //
    static function ajoutPlaylist($idplaylist, $idmusique)
    {
        $db = dbConnect();
        $request = "INSERT INTO user_playlist (id_playlist, id_musique)
                    VALUES(:idplay, :idmus)";
        $query = $db->prepare($request);
        $query->bindParam(':idplay', $idplaylist);
        $query->bindParam(':idmus', $idmusique);
        $query->execute();
        $query->fetchAll(PDO::FETCH_ASSOC);
    }

    //
    // Delete un musique dans un playlist
    //
    static function deleteMusique($idplaylist, $idmusique)
    {
        $db = dbConnect();
        $request = "DELETE FROM playlist_musique
                    WHERE id_playlist = :idplay AND id_musique = :idmus";
        $query = $db->prepare($request);
        $query->bindParam(':idplay', $idplaylist);
        $query->bindParam(':idmus', $idmusique);
        $query->execute();
        $query->fetchAll(PDO::FETCH_ASSOC);
    }
}