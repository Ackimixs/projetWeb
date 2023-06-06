SELECT * FROM playlist
LEFT JOIN user_playlist up on playlist.id_playlist = up.id_playlist
LEFT JOIN "user" u on u.id_user = up.id_user
WHERE titre_playlist ILIKE '%zz%';