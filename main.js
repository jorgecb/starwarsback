var express = require('express');
var bodyParser = require('body-parser');

var methodOverride = require("method-override");
var app = express();

    // Middlewares
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());
app.all('*', function(req, res,next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});
// Import Models and Controllers
var models     = require('./models/personaje');
var PersonajeCtrl = require('./controllers/personaje');

var router = express.Router();

// Index - Route
router.get('/', function(req, res) {  
   res.send("Hola Mundo - Examen para entrar a trabajar a la Federación Mexicana de Futbol");
});

app.use(router);

// API routes
var api = express.Router();

api.route('/personajes/:ordenar/:page')  
  .get(PersonajeCtrl.findAll);

api.route('/personaje/:name')  
  .get(PersonajeCtrl.findByName);
  
  api.route('/planets')  
  .get(PersonajeCtrl.residentes);
  

app.use('/api', api);  


// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});

