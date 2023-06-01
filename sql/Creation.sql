------------------------------------------------------------
--        Script Postgre
------------------------------------------------------------



------------------------------------------------------------
-- Table: User
------------------------------------------------------------
DROP TABLE IF EXISTS public.User CASCADE;
CREATE TABLE public.User(
                            id_user       SERIAL NOT NULL ,
                            mail          VARCHAR (50) NOT NULL ,
                            age           INT  NOT NULL ,
                            nom_user      VARCHAR (50) NOT NULL ,
                            prenom_user   VARCHAR (50) NOT NULL ,
                            motdepasse    VARCHAR (50) NOT NULL ,
                            image_user    CHAR (100)  NOT NULL  ,
                            CONSTRAINT User_PK PRIMARY KEY (id_user)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Musique
------------------------------------------------------------
DROP TABLE IF EXISTS public.Musique CASCADE;
CREATE TABLE public.Musique(
                               id_musique      SERIAL NOT NULL ,
                               titre_musique   VARCHAR (50) NOT NULL ,
                               temps_musique   FLOAT  NOT NULL ,
                               url_musique     CHAR (50)  NOT NULL  ,
                               id_album    INT  NOT NULL ,
                               CONSTRAINT Musique_PK PRIMARY KEY (id_musique)
    ,CONSTRAINT Album_Musique_FK FOREIGN KEY (id_album) REFERENCES public.Album(id_album)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Playlist
------------------------------------------------------------
DROP TABLE IF EXISTS public.Playlist CASCADE;
CREATE TABLE public.Playlist(
                                id_playlist      SERIAL NOT NULL ,
                                titre_playlist   CHAR (50)  NOT NULL ,
                                date_playlist    DATE  NOT NULL  ,
                                CONSTRAINT Playlist_PK PRIMARY KEY (id_playlist)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Artiste
------------------------------------------------------------
DROP TABLE IF EXISTS public.Artiste CASCADE;
CREATE TABLE public.Artiste(
                               id_artiste     SERIAL NOT NULL ,
                               nom_artiste    VARCHAR (50) NOT NULL ,
                               type_artiste   CHAR (50)  NOT NULL  ,
                               CONSTRAINT Artiste_PK PRIMARY KEY (id_artiste)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Album
------------------------------------------------------------
DROP TABLE IF EXISTS public.Album CASCADE;
CREATE TABLE public.Album(
                             id_album      SERIAL NOT NULL ,
                             image_album   VARCHAR (100) NOT NULL ,
                             genre_album   VARCHAR (50) NOT NULL ,
                             date_album    DATE  NOT NULL ,
                             titre_album   CHAR (5)  NOT NULL ,
                             id_artiste    INT  NOT NULL  ,
                             CONSTRAINT Album_PK PRIMARY KEY (id_album)

    ,CONSTRAINT Album_Artiste0_FK FOREIGN KEY (id_artiste) REFERENCES public.Artiste(id_artiste)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: user_playlist
------------------------------------------------------------
DROP TABLE IF EXISTS public.user_playlist CASCADE;
CREATE TABLE public.user_playlist(
                                     id_playlist   INT  NOT NULL ,
                                     id_user       INT  NOT NULL  ,
                                     CONSTRAINT user_playlist_PK PRIMARY KEY (id_playlist,id_user)

    ,CONSTRAINT user_playlist_Playlist_FK FOREIGN KEY (id_playlist) REFERENCES public.Playlist(id_playlist)
    ,CONSTRAINT user_playlist_User0_FK FOREIGN KEY (id_user) REFERENCES public.User(id_user)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: artiste_musique
------------------------------------------------------------
DROP TABLE IF EXISTS public.artiste_musique CASCADE;
CREATE TABLE public.artiste_musique(
                                       id_artiste   INT  NOT NULL ,
                                       id_musique   INT  NOT NULL  ,
                                       CONSTRAINT artiste_musique_PK PRIMARY KEY (id_artiste,id_musique)

    ,CONSTRAINT artiste_musique_Artiste_FK FOREIGN KEY (id_artiste) REFERENCES public.Artiste(id_artiste)
    ,CONSTRAINT artiste_musique_Musique0_FK FOREIGN KEY (id_musique) REFERENCES public.Musique(id_musique)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: playlist_musique
------------------------------------------------------------
DROP TABLE IF EXISTS public.playlist_musique CASCADE;
CREATE TABLE public.playlist_musique(
                                        id_musique    INT  NOT NULL ,
                                        id_playlist   INT  NOT NULL  ,
                                        CONSTRAINT playlist_musique_PK PRIMARY KEY (id_musique,id_playlist)

    ,CONSTRAINT playlist_musique_Musique_FK FOREIGN KEY (id_musique) REFERENCES public.Musique(id_musique)
    ,CONSTRAINT playlist_musique_Playlist0_FK FOREIGN KEY (id_playlist) REFERENCES public.Playlist(id_playlist)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: historique
------------------------------------------------------------
DROP TABLE IF EXISTS public.historique CASCADE;
CREATE TABLE public.historique(
                                  id_musique   INT  NOT NULL ,
                                  id_user      INT  NOT NULL  ,
                                  CONSTRAINT historique_PK PRIMARY KEY (id_musique,id_user)

    ,CONSTRAINT historique_Musique_FK FOREIGN KEY (id_musique) REFERENCES public.Musique(id_musique)
    ,CONSTRAINT historique_User0_FK FOREIGN KEY (id_user) REFERENCES public.User(id_user)
)WITHOUT OIDS;



