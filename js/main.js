//Requête permettant de renvoyer l'utilisateur à la page de login si la session est fini
ajaxRequest('GET', '../php/request.php/user/session', (data) => {
    if (!data) window.location.href = 'login.php';
})

//Requête permettant de charger la photo de profil de l'utilisateur
ajaxRequest("GET", '../php/request.php/profile-picture', (data) => {
    let profileImg = document.querySelector('#profileImgHeader');
    let profileSkeleton = document.querySelector('#profileSkeleton');
    if (data) {
        profileImg.src = '../' + data;
        profileImg.hidden = false;
        profileSkeleton.hidden = true;
    } else {
        profileImg.hidden = true;
        profileSkeleton.hidden = false;
    }
})


//Les requêtes suivantes permettent de cacher les parties de la page accueil afin d'avoir le bon affichage
document.querySelector('.home').addEventListener("click", () => { //Affiche la page d'accueil classique
    document.querySelector('#tabrecherche').hidden = true;
    document.querySelector('#accueil').hidden = false;
    document.querySelector('#profile').hidden = true;
    document.querySelector('#affichagePlaylist').hidden = true;
    refreshAccueil();
})

document.querySelector('.profilHeader').addEventListener('click', () => { //Affiche la page de profil
    document.querySelector('#tabrecherche').hidden = true;
    document.querySelector('#accueil').hidden = true;
    document.querySelector('#profile').hidden = false;
    document.querySelector('#affichagePlaylist').hidden = true;
})

document.querySelectorAll(".searchButton").forEach(e => { //Affiche la page de recherche
    e.addEventListener('click', () => {
        document.querySelector('#tabrecherche').hidden = false;
        document.querySelector('#accueil').hidden = true;
        document.querySelector('#profile').hidden = true;
        document.querySelector('#affichagePlaylist').hidden = true;
    })
})