<?php

class Artiste
{
    //
    // Renvoie tous les artistes
    //
    static function getArtistes(){
        $db = dbConnect();
        $request ='SELECT * FROM artiste';
        $query=$db->prepare($request);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Renvoie un artiste en particulier avec ses musiques et ses albums
    //
    static function getUnArtiste($id)
    {
        $db = dbConnect();
        $request = 'SELECT * FROM artiste
                    INNER JOIN album a on a.id_artiste = artiste.id_artiste
                    INNER JOIN musique m on m.id_musique = a.id_musique
                    WHERE artiste.id_artiste = :id';
        $query = $db->prepare($request);
        $query->bindParam(':id', $id);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Renvoie les artistes dont le titre contient les lettres de la recherche du user
    //
    static function rechercheArtiste($recherche)
    {
        $char = '%';
        $recherchesql = $char . $recherche . $char;

        $db = dbConnect();
        $request = "SELECT * FROM artiste
                    WHERE nom_artiste LIKE ':recherche'";
        $query = $db->prepare($request);
        $query->bindParam(':recherche', $recherchesql);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }
}