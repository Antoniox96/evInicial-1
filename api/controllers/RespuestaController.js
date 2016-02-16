/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing Respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	load: function(req, res, next) {
		Respuesta.findOne({
			where: { id: Number(req.params.respuestaId)}
		}).then(function(respuesta){
			if(respuesta) {
				req.respuesta = respuesta;
				next();
			} else { next(new Error('No existe la respuesta con el id' + req.params.preguntaId));}
		}).catch(function(error){next(error);});
	},

	asignarPuntuacion: function(req, res) {
		Respuesta = req.body.answered.split("$$");
		Incremento = 0;
	    Puntos = 0;

		console.log(Respuesta);
		
		/*Opcion.find().where({ pregunta: req.pregunta.id, tipoOpcion: 'subquestion' }).populate('subopciones')
	        .then(function(opciones){

	        	Incremento = Math.floor(100 / opciones.length);

	        })
	        .catch(function(error){});*/

			Opcion.find().where({ pregunta: req.pregunta.id, tipoOpcion: 'subquestion' }).populate('subopciones')
		        .then(function(opciones){
		        	Puntos = 0;
					Incremento = Math.floor(100 / opciones.length);

					for ( i = 0 ; i < Respuesta.length-1 ; i += 2 ) {
						for ( n = 0 ; n < opciones.length ; n++ ) {
							if ( parseInt(Respuesta[i]) == opciones[n].id ) {
								if ( Respuesta[i+1] == opciones[n].subopciones[1].valor ) {
									Puntos += Incremento;
									res.json(Puntos)
								}
							}
						}
					}



		        })
		        .catch(function(error){});

		/*Respuesta.asignarPuntuacion(function(RespuestaJSON){*/
			console.log(Puntos);

		/*});
	*/

	}
};