/**
* Pregunta.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {

		enunciado : {
			type: 'string',
			size: 255,
			required: true
	},

		respuestas : { 
			 collection: 'Respuesta',
			 via: 'pregunta'
		},

		tipo : { 
				type: 'string',
				enum: ['essay', 'matching', 'multichoice', 'numerical', 'shortanswer', 'truefalse']

		},

		opciones: {
				collection: 'Opcion',
				via: 'pregunta'
		},

		cuestionarios : {
				collection : 'cuestionario',
				via : 'preguntas'
		},

		corregir: function(req, cb) {
				switch(this.tipo) {
          case 'essay':
              cb(this.guardarRespuesta(req, this.corregirEssay(req)));
              break;
          case 'matching':
              cb(this.guardarRespuesta(req, this.corregirMatching(req)));
              sails.log.verbose(this.corregirMatching(req));
              break;
          case 'multichoice':
              cb(this.guardarRespuesta(req, this.corregirMultichoice(req)));
              break;
          case 'numerical':
              cb(this.guardarRespuesta(req, this.corregirNumerical(req)));
              break;
          case 'shortanswer':
              cb(this.guardarRespuesta(req, this.corregirShortanswer(req)));
              break;
          case 'truefalse':
              cb(this.guardarRespuesta(req, this.corregirTruefalse(req)));
              break;
          default:
              break;
         }
		},

		corregirEssay: function() {

		},

		corregirMatching: function(req) {
				Answered = req.body.answered.split("$$");
				Incremento = 0;
				Puntos = 0;

				// Cliente envia ID de la 'subquestion' y el ID de la subopcion 'answer'.

				Opcion.find().where({ pregunta: this.id, tipoOpcion: 'subquestion' }).populate('subopciones')
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

								return Puntos;
								
						})
						.catch(function(error){
								console.log(error);
						});
				
		},

		corregirMultichoice: function() {

		},

		corregirNumerical: function() {

		},

		corregirShortanswer: function() {

		},

		corregirTruefalse: function() {

		},		

		guardarRespuesta: function(req, Puntos) {
			Alumno.findOne({ user: req.session.passport.user })
				.then(function(alumno) {

					Respuesta.create({ alumno: alumno, cuestionario: req.cuestionario, pregunta: req.pregunta, 
														 valor: req.body.answered, puntuacion: Puntos })
					 .exec(function createCB(err, created){
							return Puntos;
					});

				})
				.catch(function(error){
						console.log(error);
				});
		},

		aJSON: function() {
				return Opcion.find().where({ pregunta: this.id }).populate('subopciones');
		}

	},

};