
# Examen nodeJS/Angular

## Metas
Hacer un pequeño servidor en express con los endpoints centrados alrededor de Star Wars, consumir datos de una REST-API y manipular la información utilizando Resource
$$$$$$$$$$$$ejecutar con node main.js
## Requerimientos
   Hacer un servidor con al menos los siguientes endpoints listados a continuación
	
	* '/personaje/:nombre' - Retornar en un template (de su preferencia) con la información 
	obtenida del personaje solicitado utilizando Ángular(Necesita funcionar al menos con los nombres 'luke', 'han', 'leia' y 'rey')


$$$$$funciona  como un like
$$$$$http://localhost:3000/api/personaje/lu	


	* '/personajes' - Regresar un JSON de los 50 personajes (no importando cuales sean). Este endpoint debera permitir 
	tomar un parametro de la URL llamado 'ordernar' y este debera funcionar con los siguientes metodos: 'nombre', 'peso', 
	'altura', por ejemplo  '/personajes?ordernar=peso' este debera retornar un JSON de 50 personajes ordenados
	de menor a mayor en base a su peso. Generar en ángular un listado con la información anterior 


$$$el segundo parametro es la pagina
$$$$$http://localhost:3000/api/personajes/nombre/3

	
	* '/residentes' - Regresar un JSON en la siguiente forma:
		{
			<Nombre del planeta>: [
				<Nombre del personaje 1>, 
				<Nombre del personaje 2>, 
				<Nombre del personaje 3>, 
			]
		}

$$$$le cambie un poco el nombre 
$$$$http://localhost:3000/api/planets

	donde el objetivo es agregar a cada planeta los residente que lo habitan.

  *  Hacer llamadas paginadas y limitar la respuesta a 10 elementos.

Conectarese al REST-API https://swapi.co/ para obtener la informacion de Star Wars 
Subir todo el proyecto a GITHUB y enviar la ruta para descarga.

Suerte!
