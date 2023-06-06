
'use strict';

//------------------------------------------------------------------------------
//--- ajaxRequest -------gère toutes les requêtes AJAX du site------------------
//------------------------------------------------------------------------------

function ajaxRequest(type, url, callback = () => {}, data = null, sendImage = false)
{
    let xhr;

    // Create XML HTTP request.
    xhr = new XMLHttpRequest();
    if ((type === 'GET' || type === "DELTE") && data != null)
        url += '?' + data;
    xhr.open(type, url);

    if (!sendImage) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    // Add the onload function.
    xhr.onload = () =>
    {
        switch (xhr.status)
        {
            case 200:
            case 201:
                //console.log(xhr.responseText);
                callback(JSON.parse(xhr.responseText));
                break;
            default:
                httpErrors(xhr.status);
        }
    };

    // Send XML HTTP request.
    xhr.send(data);
}

//------------------------------------------------------------------------------
//--- httpErrors --------------S'occupe de gérer les différentes erreurs HTTP---
//------------------------------------------------------------------------------
function httpErrors(errorCode)
{
    let messages =
        {
            400: 'Requête incorrecte',
            401: 'Authentifiez vous',
            403: 'Accès refusé',
            404: 'Page non trouvée',
            500: 'Erreur interne du serveur',
            503: 'Service indisponible'
        };

    // Display error.
    if (errorCode in messages)
    {
        $('#errors').html('<i class="fa fa-exclamation-circle"></i> <strong>' +
            messages[errorCode] + '</strong>');
        $('#errors').show();
    }
}
