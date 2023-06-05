

$('#tabrecherche').on('click', '.clicArtiste', (e) =>
    {
        e.preventDefault();
        let idartiste = $(event.target).closest('.clicArtiste').attr('value');
        //console.log(idartiste);
        ajaxRequest('GET', '../php/request.php/getArtiste', displayArtiste, 'idartiste='+idartiste);
    }
);

function displayArtiste(artiste) {
    //console.log(artistes);
    $('#tabrecherche').html("");
    $('#display2').html("");
    $('#display2').append('<div id="profil">\n' +
        '            <div class="container py-5 h-100">\n' +
        '                <div class="row d-flex justify-content-center align-items-center h-100">\n' +
        '                    <div class="col-md-12 col-xl-4">\n' +
        '\n' +
        '                        <div class="card" style="border-radius: 15px;">\n' +
        '                            <div class="card-body text-center">\n' +
        '                                <div class="mt-3 mb-4">\n' +
        '                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"\n' +
        '                                         class="rounded-circle img-fluid" style="width: 100px;" />\n' +
        '                                </div>\n' +
        '                                <h4 class="mb-2">'+ artiste[0]['nom_artiste'] +'</h4>\n' +
        '                                <p class="text-muted mb-4"> Type Artiste : <span class="mx-2">|</span> <a href="#!">mdbootstrap.com</a></p>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div id="displayAlbum"> </div>'+
        '        </div>');



    $('#displayAlbum').html("");
    for (let i=0; i < artiste.length; i++) {
        $('#displayAlbum').append('<div class="card cardAlbum" style="width: 18rem;">\n' +
            '  <img class="card-img-top" src="'+ artiste[0]['image_album'] +'" alt="Card image cap">\n' +
            '  <div class="card-body">\n' +
            '    <button class="btn btn-primary btn-light mb-2 btnAlbum" value="'+ artiste[i]['id_album'] +' "> '+ artiste[i]['titre_album'] +'</button>\n' +
            '  </div>\n' +
            '</div>');
    }
}