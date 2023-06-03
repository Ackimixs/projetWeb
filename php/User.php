<?php
require_once ('database.php');
class User
{
    static function authentification($email, $mdp)
    {
        try {
            $db = Db::connectionDB();
            $request = 'SELECT * FROM "user" WHERE "user".mail = :email';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log($exception->getMessage());
            return false;
        }
        return ($data && password_verify($mdp, $data['motdepasse']));
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
    // get un user avec son email
    //
    static function getUserByEmail($email) {
        try {
            $db = $db = Db::connectionDB();
            $request = 'SELECT * FROM "user"
                        WHERE "user".mail = :mail';
            $stmt = $db->prepare($request);
            $stmt->bindParam(':mail', $email);
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

    static function ajouterUnUser($email, $date_naissance, $nom, $prenom, $mdp) {
        try {
            $db = Db::connectionDB();
            $request = "INSERT INTO \"user\" (mail, date_naissance, nom_user, prenom_user, motdepasse, image_user)
                        VALUES(:email, :age, :nom, :prenom, :mdp, :image) RETURNING *";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':age', $date_naissance);
            $stmt->bindParam(':nom', $nom);
            $stmt->bindParam(':prenom', $prenom);
            $stmt->bindParam(':mdp', $mdp);
            $str = "profile/" . $nom . $prenom . ".jpg";
            $stmt->bindParam(':image', $str);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }
    }




    //
    // Historique
    //

    //
    // Ajoute une musique a l'historique de l'utilisateur
    //
    static function ajoutHistorique($iduser, $idmusique)
    {
        try {
            $db = Db::connectionDB();
            $request = "INSERT INTO historique (id_user, id_musique)
                        VALUES(:iduser, :idmus) RETURNING *";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':iduser', $iduser);
            $stmt->bindParam(':idmus', $idmusique);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }
    }

    static function isInHistorique($id_user, $id_musique) {
        try {
            $db = Db::connectionDB();
            $request = "SELECT * FROM historique WHERE id_musique = :id_musique AND id_user = :id_user";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':id_musique', $id_musique);
            $stmt->bindParam(':id_user', $id_user);
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }
        return $data;
    }

    static function changeInHistorique($id_user, $id_musique, $date) {
        try {
            $db = Db::connectionDB();
            $request = "UPDATE historique SET date_ajout = :date WHERE id_user = :id_user AND $id_musique = :id_musique RETURNING *";
            $stmt = $db->prepare($request);
            $stmt->bindParam(':id_musique', $id_musique);
            $stmt->bindParam(':id_user', $id_user);
            $stmt->bindParam(':date', $date);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception){
            error_log("[" . basename(__FILE__) . "][" . __LINE__ . "] ". 'Request error: ' . $exception->getMessage());
            return false;
        }
    }

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
                    WHERE "user".id_user = :id
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
}