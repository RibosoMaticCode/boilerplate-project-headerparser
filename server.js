require('dotenv').config();
const express = require('express');
const app = express();
const dns = require('dns');

const port = process.env.PORT || 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// api whoami
app.get("/api/whoami", function (req, res) {

  // req.headers -> devuelve datos de cabecera de la peticion
  // console.log(req.headers.host) // nombre del servidor

  // dns.lookup para obtener ip del host actual
  dns.lookup( req.headers.host , (err, addresses) => {
    //console.log('ip addresses: %j', addresses)

    // creamos la respuesta
    res.json({
      ipaddress: addresses,
      language: req.headers['accept-language'],
      software: req.headers['user-agent'],
    });
  });
  
});

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
