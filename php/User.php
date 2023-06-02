<?php
require_once ('database.php');
class User
{
    static function authentification($email, $mdp)
    {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT "user".id_user FROM "user" WHERE "user".mail = :email AND "user".motdepasse = crypt(:mdp, motdepasse)';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':mdp', $mdp);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log($exception->getMessage());
            return false;
        }
    }
    //
    // Renvoie toutes les user
    //
    static function getUsers()
    {
        try {
            $db = Db::connectionDB();
            dbConnect();
            $request = 'SELECT * FROM "user"';
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
    // Renvoie un user en particulier
    //
    static function getUnUser($id)
    {
        try {
            $db = $db = Db::connectionDB();
            $request = 'SELECT * FROM "user"
                        WHERE "user".id_user = :id';
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
    // Renvoie les playlist d'un user
    //
    static function playlistUser($id)
    {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM "user"
                        INNER JOIN user_playlist up on up.id_user = "user".id_user
                        INNER JOIN playlist p on p.id_playlist = up.id_playlist
                        WHERE "user".id_user = :id';
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
    // Modifie les parametres de l'utilisateur
    //
    /*static function modificationUser($id, $parametre, $valeur)
    {
        try {
            $db = Db::connectionDB();
            $request = 'UPDATE "user"
                    SET :parametre = :valeur
                    WHERE id_user = :iduser';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':iduser', $id);
            $stmt->bindParam(':parametre', $parametre);
            $stmt->bindParam(':valeur', $valeur);
            $stmt->execute();
            $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log($exception->getMessage());
            return false;
        }
    }*/

    //
    // Renvoie l'hitorique d'un utilisateur
    //
    static function historiqueUser($id)
    {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM "user"
                    INNER JOIN historique h on h.id_user = "user".id_user
                    INNER JOIN musique m on m.id_musique = h.id_musique
                    WHERE "user".id_user = 2
                    ORDER BY h.date_ajout DESC
                    LIMIT 10';
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
    // Ajoute une musique a l'historique de l'utilisateur
    //
    static function ajoutHistorique($iduser, $idmusique)
    {
        try {
            $db = Db::connectionDB();
            $request = "INSERT INTO historique (id_user, id_musique)
                        VALUES(:iduser, :idmus)";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':iduser', $iduser);
            $stmt->bindParam(':idmus', $idmusique);
            $stmt->execute();
            $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }
    }
}