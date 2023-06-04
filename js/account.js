let profile = document.querySelector('.changeProfil');
let profileImg = document.querySelector('#profileImg');
let profileSvg = document.querySelector('#profileSvg');
let logout = document.querySelector('#logoutIcon');
let fileInput = document.querySelector('#profileImageInput');

window.addEventListener('load', () => {
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

    //FIll the form
    ajaxRequest("GET", '../php/request.php/user/session', (data) => {
        if (data) {
            // console.log(data);
            document.querySelector('#email').value = data.mail;
            document.querySelector('#nom').value = data.nom_user;
            document.querySelector('#prenom').value = data.prenom_user;
            document.querySelector('#age').value = (new Date().getFullYear() - new Date(data.date_naissance).getFullYear()).toString() + ' ans';
            document.querySelector('#birthday').value = data.date_naissance;
        }
    })
})

logout.addEventListener('click', () => {
    ajaxRequest('GET', '../php/request.php/logout', (res) => {
        console.log(res);
        window.location.href = 'login.php';
    });
})

profile.addEventListener('click', () => {
    fileInput.click();

    fileInput.addEventListener('change', (event) => {
        const selectedFile = fileInput.files[0];
        const formData = new FormData();
        formData.append('image', selectedFile);

        ajaxRequest('POST', '../php/request.php/profile-picture', () => {
            ajaxRequest("GET", '../php/request.php/profile-picture', (data) => {
                profileImg.src = ''
                profileImg.src = '../' + data + '?timestamp=' + new Date().getTime(); // Append timestamp
                profileImg.hidden = false;
                profileSvg.hidden = true;
            })
        }, formData, true);
    });
})


let birthdayInput = document.querySelector('#birthday')
birthdayInput.addEventListener('change', () => {
    document.querySelector('#age').value = (new Date().getFullYear() - new Date(birthdayInput.value).getFullYear()).toString() + ' ans';
})

document.querySelector('.modif2').addEventListener('click', () => {
    let email = document.querySelector('#email').value;
    let nom = document.querySelector('#nom').value;
    let prenom = document.querySelector('#prenom').value;
    let password = document.querySelector('#password').value;
    let birthday = document.querySelector('#birthday').value;

    console.log(email, nom, prenom, password, birthday);

    ajaxRequest('POST', '../php/request.php/user/update', (d) => {
        ajaxRequest("GET", '../php/request.php/user/session', (data) => {
            if (data) {
                // console.log(data);
                document.querySelector('#email').value = data.mail;
                document.querySelector('#nom').value = data.nom_user;
                document.querySelector('#prenom').value = data.prenom_user;
                document.querySelector('#age').value = (new Date().getFullYear() - new Date(data.date_naissance).getFullYear()).toString() + ' ans';
                document.querySelector('#birthday').value = data.date_naissance;
            }
        })
    }, `email=${email}&nom=${nom}&prenom=${prenom}&password=${password}&date=${birthday}`);
})