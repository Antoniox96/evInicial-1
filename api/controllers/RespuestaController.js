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
		Answered = req.body.answered.split("$$");
		Incremento = 0;
	    Puntos = 0;


		// Cliente envia ID de la 'subquestion' y el ID de la subopcion 'answer'.

		Opcion.find().where({ pregunta: req.pregunta.id, tipoOpcion: 'subquestion' }).populate('subopciones')
	        .then(function(opciones){
	        	
	        	Puntos = 0;
				Incremento = Math.floor(100 / opciones.length);

				for ( i = 0 ; i < Answered.length ; i += 2 ) {
					for ( n = 0 ; n < opciones.length ; n++ ) {
						if ( Answered[i] == opciones[n].subopciones[0].valor && 
							 Answered[i+1] == opciones[n].subopciones[1].valor ) {
							
							Puntos += Incremento;
						}
					}
				}

				Alumno.findOne({ user: req.session.passport.user })
					.then(function(alumno) {

						Respuesta.create({ alumno: alumno, cuestionario: req.cuestionario, pregunta: req.pregunta, 
										   valor: Answered, puntuacion: Puntos })
						 .exec(function createCB(err, created){
					   		res.json(Puntos);
						});

					})
					.catch(function(error){
	        			console.log(error);
        			});

	        })
	        .catch(function(error){
	        	console.log(error);
	        });

	}
};