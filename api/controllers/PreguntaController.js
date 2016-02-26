/**
 * PreguntaController
 *
 * @description :: Server-side logic for managing preguntas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	load: function(req, res, next) {
		Pregunta.findOne({
			where: { id: Number(req.params.preguntaId)}
		}).then(function(pregunta){
			if(pregunta) {
				req.pregunta = pregunta;
				next();
			} else { next(new Error('No existe la pregunta con el id' + req.params.preguntaId));}
		}).catch(function(error){next(error);});
	},

	corregir: function(req, res, next) {
		var respuestaCompleta = {
									answered: req.body.answered, 
									cuestionario: req.cuestionario, 
									pregunta: req.pregunta,
									usuario: req.session.passport.user
								}

		req.pregunta.corregir(respuestaCompleta, function(preguntaCorregida) {
				res.json(preguntaCorregida);
			});
	}

};