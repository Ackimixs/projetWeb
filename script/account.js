let profile = document.querySelector('.changeProfil');
let profileImg = document.querySelector('#profileImg');
let mainProfileImg = document.querySelector('#profileImgHeader');
let profileSvg = document.querySelector('#profileSvg');
let logout = document.querySelector('#logoutIcon');
let fileInput = document.querySelector('#profileImageInput');

//Fonction permettant de charger les informations du profil au moment où la page se charge
window.addEventListener('load', () => {//event au chargement

    //Cette partie là permet de charger la photo de profil de l'utilisateur
    ajaxRequest("GET", '../php/request.php/profile-picture', (data) => {
        if (data) {
            profileImg.src = '../' + data;
            profileImg.hidden = false;
            profileSvg.hidden = true;
        } else {
            profileImg.hidden = true;
            profileSvg.hidden = false;
        }
    })

    //Cette partie là permet d'attribuer les éléments au compte de la session en cours
    ajaxRequest("GET", '../php/request.php/user/session', (data) => {
        if (data) {
            // console.log(data);
            document.querySelector('#email').value = data.mail;
            document.querySelector('#nom').value = data.nom_user;
            document.querySelector('#prenom').value = data.prenom_user;
            const date1 = new Date();
            const date2 = new Date(data.date_naissance);
            let differenceYears = date1.getFullYear() - date2.getFullYear();
            if (date1.getMonth() < date2.getMonth() || (date1.getMonth() === date2.getMonth() && date1.getDate() < date2.getDate())) {
              differenceYears--;
            }
            document.querySelector('#age').value = differenceYears.toString() + ' ans'; //Calcul de l'âge en fonction de la date de naissance
            document.querySelector('#birthday').value = data.date_naissance;
        }
    })
})
//Fonction permettant de se déconnecter et donc de renvoyer l'utilisateur sur la page de connexion
logout.addEventListener('click', () => { //event on click
    ajaxRequest('GET', '../php/request.php/logout', (res) => {
        console.log(res);
        window.location.href = 'login.php';
    });
})

//Fonction permettant de changer la photo de profil
profile.addEventListener('click', () => {  //event on click
    fileInput.click();

    fileInput.addEventListener('change', (event) => { //Détecte le nouveau fichier sélectionné
        const selectedFile = fileInput.files[0]; //récupère le fichier sélectionné en prenant le premier élément de la liste (files[0]).
        console.log(selectedFile);
        const formData = new FormData();
        formData.append('image', selectedFile); //ajoute le fichier sélectionné aux données

        ajaxRequest('POST', '../php/request.php/profile-picture', () => { //requête POST pour ajouter la photo de profil
            ajaxRequest("GET", '../php/request.php/profile-picture', (data) => {
                profileImg.src = ''
                profileImg.src = '../' + data + '?timestamp=' + new Date().getTime(); // Append timestamp
                mainProfileImg.src = '../' + data + '?timestamp=' + new Date().getTime(); // Append timestamp
                profileImg.hidden = false;
                profileSvg.hidden = true;
            })
        }, formData, true);
    });
})


let birthdayInput = document.querySelector('#birthday')
//Fonction permettant de calculer l'âge en fonction de la date de naissance de manière dynamique
birthdayInput.addEventListener('change', () => {
    const date1 = new Date();
    const date2 = new Date(birthdayInput.value);
    let differenceYears = date1.getFullYear() - date2.getFullYear();
    if (date1.getMonth() < date2.getMonth() || (date1.getMonth() === date2.getMonth() && date1.getDate() < date2.getDate())) {
      differenceYears--;
    }

    document.querySelector('#age').value = differenceYears.toString() + ' ans';
})


//Permet de mettre à jour toutes les informations modifiés du compte
document.querySelector('.modif2').addEventListener('click', () => { //event on click
    let email = document.querySelector('#email').value;  //attribut à des variables les valeurs des différents champs qu'elles aient été changé ou non
    let nom = document.querySelector('#nom').value;
    let prenom = document.querySelector('#prenom').value;
    let password = document.querySelector('#password').value;
    let birthday = document.querySelector('#birthday').value;

    ajaxRequest('POST', '../php/request.php/user/update', (d) => {
        ajaxRequest("GET", '../php/request.php/user/session', (data) => { //Récupère les nouvelles données et les affectent aux champs
            if (data) {
                // console.log(data);
                console.log(new Date().getFullYear() - new Date(data.date_naissance).getFullYear());
                document.querySelector('#email').value = data.mail;
                document.querySelector('#nom').value = data.nom_user;
                document.querySelector('#prenom').value = data.prenom_user;
                const date1 = new Date();
                const date2 = new Date(data.date_naissance);
                let differenceYears = date1.getFullYear() - date2.getFullYear();
                if (date1.getMonth() < date2.getMonth() || (date1.getMonth() === date2.getMonth() && date1.getDate() < date2.getDate())) {
                  differenceYears--;
                }

                document.querySelector('#age').value = differenceYears.toString() + ' ans';
                document.querySelector('#birthday').value = data.date_naissance;
            }
        })
    }, `email=${email}&nom=${nom}&prenom=${prenom}&password=${password}&date=${birthday}`);
})

document.querySelector('#clearHistoriqueButton').addEventListener('click', () => {
    ajaxRequest('DELETE', '../php/request.php/historique', (d) => {
        console.log(d);
    })
})