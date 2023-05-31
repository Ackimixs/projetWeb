------------------------------------------------------------
--        Script Postgres
------------------------------------------------------------



------------------------------------------------------------
-- Table: User
------------------------------------------------------------
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
CREATE TABLE public.Musique(
                               id_musique      SERIAL NOT NULL ,
                               titre_musique   VARCHAR (50) NOT NULL ,
                               temps_musique   FLOAT  NOT NULL ,
                               url_musique     CHAR (50)  NOT NULL  ,
                               CONSTRAINT Musique_PK PRIMARY KEY (id_musique)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Playlist
------------------------------------------------------------
CREATE TABLE public.Playlist(
                                id_playlist      SERIAL NOT NULL ,
                                titre_playlist   CHAR (50)  NOT NULL ,
                                date_playlist    DATE  NOT NULL  ,
                                CONSTRAINT Playlist_PK PRIMARY KEY (id_playlist)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Artiste
------------------------------------------------------------
CREATE TABLE public.Artiste(
                               id_artiste     SERIAL NOT NULL ,
                               nom_artiste    VARCHAR (50) NOT NULL ,
                               type_artiste   CHAR (50)  NOT NULL  ,
                               CONSTRAINT Artiste_PK PRIMARY KEY (id_artiste)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Album
------------------------------------------------------------
CREATE TABLE public.Album(
                             id_album      SERIAL NOT NULL ,
                             image_album   VARCHAR (100) NOT NULL ,
                             genre_album   VARCHAR (50) NOT NULL ,
                             date_album    DATE  NOT NULL ,
                             titre_album   CHAR (5)  NOT NULL ,
                             id_musique    INT  NOT NULL ,
                             id_artiste    INT  NOT NULL  ,
                             CONSTRAINT Album_PK PRIMARY KEY (id_album)

    ,CONSTRAINT Album_Musique_FK FOREIGN KEY (id_musique) REFERENCES public.Musique(id_musique)
    ,CONSTRAINT Album_Artiste0_FK FOREIGN KEY (id_artiste) REFERENCES public.Artiste(id_artiste)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Appartenir
------------------------------------------------------------
CREATE TABLE public.Appartenir(
                                  id_playlist   INT  NOT NULL ,
                                  id_user       INT  NOT NULL  ,
                                  CONSTRAINT Appartenir_PK PRIMARY KEY (id_playlist,id_user)

    ,CONSTRAINT Appartenir_Playlist_FK FOREIGN KEY (id_playlist) REFERENCES public.Playlist(id_playlist)
    ,CONSTRAINT Appartenir_User0_FK FOREIGN KEY (id_user) REFERENCES public.User(id_user)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Feat
------------------------------------------------------------
CREATE TABLE public.Feat(
                            id_artiste   INT  NOT NULL ,
                            id_musique   INT  NOT NULL  ,
                            CONSTRAINT Feat_PK PRIMARY KEY (id_artiste,id_musique)

    ,CONSTRAINT Feat_Artiste_FK FOREIGN KEY (id_artiste) REFERENCES public.Artiste(id_artiste)
    ,CONSTRAINT Feat_Musique0_FK FOREIGN KEY (id_musique) REFERENCES public.Musique(id_musique)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Contenir
------------------------------------------------------------
CREATE TABLE public.Contenir(
                                id_musique    INT  NOT NULL ,
                                id_playlist   INT  NOT NULL  ,
                                CONSTRAINT Contenir_PK PRIMARY KEY (id_musique,id_playlist)

    ,CONSTRAINT Contenir_Musique_FK FOREIGN KEY (id_musique) REFERENCES public.Musique(id_musique)
    ,CONSTRAINT Contenir_Playlist0_FK FOREIGN KEY (id_playlist) REFERENCES public.Playlist(id_playlist)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Historique
------------------------------------------------------------
CREATE TABLE public.Historique(
                                  id_musique   INT  NOT NULL ,
                                  id_user      INT  NOT NULL  ,
                                  CONSTRAINT Historique_PK PRIMARY KEY (id_musique,id_user)

    ,CONSTRAINT Historique_Musique_FK FOREIGN KEY (id_musique) REFERENCES public.Musique(id_musique)
    ,CONSTRAINT Historique_User0_FK FOREIGN KEY (id_user) REFERENCES public.User(id_user)
)WITHOUT OIDS;