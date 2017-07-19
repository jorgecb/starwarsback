var http = require('http');

/**
 * Carga de los parámetros genéricos del servicio RESTful
 */
var host = 'swapi.co';
var port = '';

/**
 * Función encargada de recuperar todos los personajes.
 */
exports.All =  function(page, next) {
	var path = '/api/people/?page='+page;

	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'GET',
		encoding: null
	};
	
	// Se invoca el servicio RESTful con las opciones configuradas previamente y sin objeto JSON.
	invocarServicio(options, null, function (personajes, err) {
		if (err) {
			next(null, err);
		} else {
			next(personajes, null);
		}
	});
};

/**
 * Función encargada de recuperar los datos de un personaje a partir de su nombre.
 */
exports.loadPersonaje = function(name, next) {
	var path = '/api/people/?search='+name;
	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'GET',
		encoding: null
	};
	
	// Se invoca el servicio RESTful con las opciones configuradas previamente y sin objeto JSON.
	invocarServicio(options, null, function (person, err) {
		if (err) {
			next(null, err);
		} else {
			next(person, null);
		}
	});
};

exports.loadPlanetas = function( next) {
	var path = '/api/planets/';
	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'GET',
		encoding: null
	};
	
	// Se invoca el servicio RESTful con las opciones configuradas previamente y sin objeto JSON.
	invocarServicio(options, null, function (person, err) {
		if (err) {
			next(null, err);
		} else {
			next(person, null);
		}
	});
};





/**
 * Función encargada de invocar los servicios RESTful y devolver
 * el objeto JSON correspondiente.
 */
function invocarServicio(options, jsonObject, next) {
	var req = http.request(options, function(res) {
		var contentType = res.headers['content-type'];
		
		/**
		 * Variable para guardar los datos del servicio RESTfull.
		 */ 
		var data = '';
      
		res.on('data', function (chunk) {
			// Cada vez que se recojan datos se agregan a la variable
			data += chunk;
		}).on('end', function () {
			// Al terminar de recibir datos los procesamos
			var response = data;
			
			// Nos aseguramos de que sea tipo JSON antes de convertirlo.
			if (contentType.indexOf('application/json') != -1) {
				response = JSON.parse(data);
			}
			
			// Invocamos el next con los datos de respuesta
			next(response, null);
		})
		.on('error', function(err) {
			// Si hay errores los sacamos por consola
			console.error('Error al procesar el mensaje: ' + err)
		})
		.on('uncaughtException', function (err) {
			// Si hay alguna excepción no capturada la sacamos por consola
			console.error(err);
		});
	}).on('error', function (err) {
		// Si hay errores los sacamos por consola y le pasamos los errores a next.
		console.error('HTTP request failed: ' + err);
		next(null, err);
	});
	
	// Si la petición tiene datos estos se envían con la request
	if (jsonObject) {
		req.write(jsonObject);
	}
	
	req.end();
};