<?php
require_once ('database.php');
class User
{
    static function authentification($email, $mdp)
    {
        $db = $db = Db::connectionDB();
        $request = 'SELECT "user".id_user FROM "user" WHERE "user".mail = :email AND "user".motdepasse = crypt(:mdp, motdepasse)';
        $stmt = $db->prepare($request);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':mdp', $mdp);
        $stmt->execute();
        $resultat = $stmt->fetch();
        return $resultat;
    }
    //
    // Renvoie toutes les user
    //
    static function getUsers()
    {
        $db = Db::connectionDB();dbConnect();
        $request = 'SELECT * FROM "user"';
        $query = $db->prepare($request);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Renvoie un user en particulier
    //
    static function getUnUser($id)
    {
        $db = $db = Db::connectionDB();
        $request = 'SELECT * FROM "user"
                    WHERE "user".id_user = :id';
        $query = $db->prepare($request);
        $query->bindParam(':id', $id);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }
    //
    // Renvoie les playlist d'un user
    //
    static function playlistUser($id)
    {
        $db = Db::connectionDB();
        $request = 'SELECT * FROM "user"
                    INNER JOIN user_playlist up on up.id_user = "user".id_user
                    INNER JOIN playlist p on p.id_playlist = up.id_playlist
                    WHERE "user".id_user = :id';
        $query = $db->prepare($request);
        $query->bindParam(':id', $id);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Modifie les parametres de l'utilisateur
    //
    static function modificationUser($id, $parametre, $valeur)
    {
        $db = Db::connectionDB();
        $request = 'UPDATE "user"
                    SET :parametre = :valeur
                    WHERE id_user = :iduser';
        $query = $db->prepare($request);
        $query->bindParam(':iduser', $id);
        $query->bindParam(':parametre', $parametre);
        $query->bindParam(':valeur', $valeur);
        $query->execute();
        $query->fetchAll(PDO::FETCH_ASSOC);
    }

    //
    // Renvoie l'hitorique d'un utilisateur
    //
    static function historiqueUser($id)
    {
        $db = Db::connectionDB();
        $request = 'SELECT * FROM "user"
                    INNER JOIN historique h on h.id_user = "user".id_user
                    INNER JOIN musique m on m.id_musique = h.id_musique
                    WHERE "user".id_user = 2
                    LIMIT 10';
        $query = $db->prepare($request);
        $query->bindParam(':id', $id);
        $query->execute();
        $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    //
    // Ajoute une musique a l'historique de l'utilisateur
    //
    static function ajoutHistorique($iduser, $idmusique)
    {
        $db = Db::connectionDB();
        $request = "INSERT INTO historique (id_user, id_musique)
                    VALUES(:iduser, :idmus)";
        $query = $db->prepare($request);
        $query->bindParam(':iduser', $iduser);
        $query->bindParam(':idmus', $idmusique);
        $query->execute();
        $query->fetchAll(PDO::FETCH_ASSOC);
    }
}