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