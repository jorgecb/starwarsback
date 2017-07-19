
var Personaje  = require('../models/personaje');

//GET - Return all registers
exports.findAll = function(req, res) {
     var order = req.params.ordenar;
     var page = req.params.page;
	Personaje.All(page,function(Personajes,err) {
    if(err) 
            res.status(500).jsonp(err);
    	console.log('GET /Personajes')
        Personajes.sort=function(){};
    //  console.log(Personajes);
           var campo=(order=='nombre')?'name':'mass';
             var oJSON = sortJSON(Personajes.results, campo, 'asc');
                   console.log(oJSON);

		res.status(200).jsonp(oJSON);
	});
};

//GET - Return a register personaje with specified Name
exports.findByName = function(req, res) {
    var name = req.params.name;
	
	Personaje.loadPersonaje(name, function(personaje, err) {
		if (err) {
			console.error('Error al recuperar los datos');
			res.json({ error: err })
		} else {
			console.log('recuperado recuperado:', personaje);
			res.status(200).jsonp(personaje);
		}
	});;
};

exports.residentes = function(req, res) {

	
	Personaje.loadPlanetas(function(personaje, err) {
		if (err) {
			console.error('Error al recuperar los datos');
			res.json({ error: err })
		} else {
			console.log('recuperado recuperado:', personaje);
			res.status(200).jsonp(personaje);
		}
	});;
};
//POST - Insert a new register
exports.add = function(req, res) {
	console.log('POST');
	//pos si quieren bd
};

//PUT - Update a register already exists
exports.update = function(req, res) {
	//por si quieren bd
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
	//por si quieren bd
};
function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}