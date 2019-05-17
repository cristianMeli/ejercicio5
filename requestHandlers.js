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

    var request = new XMLHttpRequest();

    var target = 'https://api.mercadolibre.com/trends/'+ siteId + '/' + categoryId
    request.open('GET', target, true);
    request.onload = function () {



        var body = '<html>'+
            '<head>'+
            '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
            '<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; }'+
            'td, th { border: 1px solid #dddddd; text-align: left; padding: 8px;}'+
            ' tr:nth-child(even) { background-color: #dddddd;} </style>'+
            '</head>'+
            '<body>'+
            '<table>'


        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {

           // console.log(data)

            var cont = 0;
            for (var i=0; i < filas; i++) {

                body += '<tr>'
                for(var j=0; j < columnas; j++){
                    body += '<td>'+data[cont].keyword+'</td>'
                    cont++
                }
                body += '</tr>'
            }

            body += '</table></body></html>'


        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = "No funciona!";
            app.appendChild(errorMessage);

        }

        response.write(body)
        response.end();

    }

    request.send();
}

exports.iniciar = iniciar;
exports.subir = subir;