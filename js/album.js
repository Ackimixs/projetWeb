


$('#display').on('click', '.btnAlbum', (e) =>
    {
        e.preventDefault();
        let idalbum = $(event.target).closest('.btnAlbum').attr('value');
        console.log(idalbum);
        ajaxRequest('GET', '../php/request.php/infosAlbum', displayAlbum, 'idalbum='+idalbum);
    }
);

$('#tabrecherche').on('click', '.clicAlbum', (e) =>
    {
        e.preventDefault();
        let idalbum = $(event.target).closest('.clicAlbum').attr('value');
        console.log(idalbum);
        ajaxRequest('GET', '../php/request.php/infosAlbum', displayAlbum, 'idalbum='+idalbum);
    }
);


function displayAlbum(album) {
    //console.log(album)
    $('#tabrecherche').html("");

    let crea = album[0]['date_album'].substr(0,10);

    $('#display2').html("");
    $('#display2').append('<div class="card mb-3 enTeteAlbum" style="max-width: 800px;">\n' +
        '  <div class="row g-0">\n' +
        '    <div class="col-md-4">\n' +
        '      <img src="'+ album[0]['image_album'] +'" class="img-fluid rounded-start" alt="...">\n' +
        '    </div>\n' +
        '    <div class="col-md-8">\n' +
        '      <div class="card-body">\n' +
        '        <h5 class="card-title">'+ album[0]['titre_album'] +'</h5>\n' +
        '        <p class="card-text"> Nom Artiste : '+ album[0]['nom_artiste'] +' </p>\n' +
        '        <p class="card-text"> Genre : </p>\n' +
        '        <p class="card-text"> Création : '+ crea +'</p>\n' +
        '        <br><button class="ecouter" data-id="' + album[0]['id_album'] + '">Play Album</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  </div>\n' +
        '  <ul id="tabAlbum"> </ul>'+
        '</div>')

    $('#tabAlbum').html("");
    for (let i=0 ; i < album.length ; i++) {
        $('#tabAlbum').append('<li class="songAlbum" data-id="' + album[i]['id_musique'] + '">'
            + '<span>'+ (i+1) +'</span>'
            + '<img src="'+ album[i]['image_album'] +'"/>'
            + '<h5>' + album[i]['titre_musique']
            + '<div class="subtitle"> '+ album[i]['nom_artiste'] +'</div>'
            + '<div id = "heart" class="albumMusiqueHeart" data-id="' + album[i]['id_musique'] + '" data-liked="0">'
            + '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">\n'
            + '<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>\n'
            + '</svg>'
            + '</div>'
            + '<button type="button" class="btn btn-primary infosmusique btn-light mb-2" data-toggle="modal" data-target="#modalMusique" value="'+ album[i]['id_musique'] +'"> INFOS'
            + '</button> '
            + '</h5>'
            + '</li>');
    }
    setTimeout(() => {
        addFunctionnalites();
    })
}


function addFunctionnalites() {
    let songItem = document.querySelectorAll(".songAlbum");
    songItem.forEach(e => {
        e.addEventListener('click', () => {
            playSong(e.dataset.id);
        })
    })

    let heart = document.querySelectorAll('.albumMusiqueHeart')
    heart.forEach(e => {
        ajaxRequest("GET", '../php/request.php/like/' + e.dataset.id, (d) => {
            console.log(d);
            if (d) {
                e.children[0].children[0].setAttribute('d', 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z');
                e.dataset.liked = '1';
            }
        })


        e.addEventListener('click', (event) => {
            event.stopPropagation();
            if (e.dataset.liked === '0') {
                e.dataset.liked = '1';
                ajaxRequest('POST', '../php/request.php/like', (d) => {
                    console.log(d);
                    e.children[0].children[0].setAttribute('d', 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z');

                },`id=${e.dataset.id}`)
            } else if (e.dataset.liked === '1') {
                e.dataset.liked = '0';
                ajaxRequest('DELETE', '../php/request.php/like/' + e.dataset.id, (d) => {
                    console.log(d);
                    e.children[0].children[0].setAttribute('d', 'm8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z');
                })
            }
        })
    })

    let button = document.querySelector('.ecouter');
    button.addEventListener('click', () => {
        playAlbum(button.dataset.id);
    })
}