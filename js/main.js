ajaxRequest('GET', '../php/request.php/user/session', (data) => {
    if (!data) window.location.href = 'login.php';
})

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

document.querySelector('.home').addEventListener("click", () => {
    document.querySelector('#tabrecherche').hidden = true;
    document.querySelector('#accueil').hidden = false;
    document.querySelector('#profile').hidden = true;
})

document.querySelector('.profilHeader').addEventListener('click', () => {
    document.querySelector('#tabrecherche').hidden = true;
    document.querySelector('#accueil').hidden = true;
    document.querySelector('#profile').hidden = false;
})

document.querySelectorAll(".searchButton").forEach(e => {
    e.addEventListener('click', () => {
        document.querySelector('#tabrecherche').hidden = false;
        document.querySelector('#accueil').hidden = true;
        document.querySelector('#profile').hidden = true;
    })
})