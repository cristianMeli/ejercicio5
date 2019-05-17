var fs = require('fs');
var querystring = require("querystring");
var XMLHttpRequest = require("w3c-xmlhttprequest").XMLHttpRequest
var pug = require('pug')

function iniciar(response, postData) {
    console.log("Manipulador de peticion 'inicio' fue llamado.");

    /*
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/subir" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';
     */

    var f = 'index.html';
    fs.readFile(f, function (err, data) {
        if(err){
            response.writeHead(404,{'Content-type':'text/html'});
            return response.end()
        }else{
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();

        }
    });

    /*
     response.writeHead(200, {"Content-Type": "text/html"});
     response.write(body);
     response.end();
     */
}

function subir(response, dataPosteada) {

    console.log("Manipulador de peticion 'subir' fue llamado.");

    response.writeHead(200, {"Content-Type": "text/html"});

    var siteId = querystring.parse(dataPosteada)["selectSites"];
    const categoryId = querystring.parse(dataPosteada)["selectCategories"];
    const filas = querystring.parse(dataPosteada)["filas"];
    const columnas = querystring.parse(dataPosteada)["columnas"];

    siteId = "MLA"
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.mercadolibre.com/trends/'+ siteId, true);
    request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {

            /*
            data.forEach(trend => {
                response.write(trend.keyword)
            });

             */

        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = "No funciona!";
            app.appendChild(errorMessage);

        }


        response.write();
        response.end();

    }

    request.send();
}

exports.iniciar = iniciar;
exports.subir = subir;