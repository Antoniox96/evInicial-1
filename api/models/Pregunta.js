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
			enum: ['essay', 'matching', 'multichoice', 'numerical', 'truefalse']

		},

		opciones: {
			collection: 'Opcion',
			via: 'pregunta'
		},

		cuestionarios : {
			collection : 'cuestionario',
			via : 'preguntas'
		},

		corregir: function(respuestaCompleta, cb) {
			var This = this;
			switch(This.tipo) {
				case 'essay':
					This.guardarRespuesta(respuestaCompleta, null, function(Puntos) { cb(Puntos); });
					break;
				case 'matching':
					This.corregirMatching(respuestaCompleta, function(respuestaCompleta, Puntos){ This.guardarRespuesta(respuestaCompleta, Puntos, function(Puntos) { cb(Puntos); }); });
					break;
				case 'multichoice':
					This.corregirMultichoice(respuestaCompleta, function(respuestaCompleta, Puntos){ This.guardarRespuesta(respuestaCompleta, Puntos, function(Puntos) { cb(Puntos); }); });
					break;
				case 'numerical':
					This.corregirNumerical(respuestaCompleta, function(respuestaCompleta, Puntos){ This.guardarRespuesta(respuestaCompleta, Puntos, function(Puntos) { cb(Puntos); }); });
					break;
				case 'truefalse':
					This.corregirTruefalse(respuestaCompleta, function(respuestaCompleta, Puntos){ This.guardarRespuesta(respuestaCompleta, Puntos, function(Puntos) { cb(Puntos); }); });
					break;
				default:
					break;
			 }
		},

		corregirMatching: function(respuestaCompleta, cb) {
			Answered = respuestaCompleta.answered.split("$$");
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

					cb(respuestaCompleta, Puntos);
						
				})
				.catch(function(error){
						console.log(error);
				});
		},

		corregirMultichoice: function(respuestaCompleta, cb) {
			Answered = respuestaCompleta.answered;

			Subopcion.findOne({
                where: {opcion: Number(Answered), nombre: "fraccion"}
            }).then(function(subopcion){
                var Puntos = subopcion.valor;
                Subopcion.findOne({
                    where: {opcion: Number(Answered), nombre: "text"}
                }).then(function(subopcion){
                    respuestaCompleta.answered = subopcion.valor;
					cb(respuestaCompleta, Puntos);
                })  
            })
		},

		corregirNumerical: function(respuestaCompleta, cb) { 
	 		Answered = respuestaCompleta.answered;
	            
	        Opcion.findOne({
	            where: { id: Number(Answered) }
	        }).populate('subopciones').then(function(opcion){
	            opcion.subopciones.forEach(function(subopcion){
	                if(subopcion.nombre == 'fraction'){
                		var Puntos = subopcion.valor;
	                }
	                if(subopcion.nombre == 'text'){
	                    respuestaCompleta.answered = subopcion.valor;
	                }
	            });
				cb(respuestaCompleta, Puntos);
	        })
		},

		corregirTruefalse: function(respuestaCompleta, cb) { 

		},		

		aJSON: function() {
				return Opcion.find().where({ pregunta: this.id }).populate('subopciones');
		},

		guardarRespuesta: function(respuestaCompleta, Puntos, cb) {
			Alumno.findOne({ user: respuestaCompleta.usuario })
				.then(function(alumno) {

					Respuesta.create({ alumno: alumno, cuestionario: respuestaCompleta.cuestionario, 
									   pregunta: respuestaCompleta.pregunta, valor: respuestaCompleta.answered, 
									   puntuacion: Puntos })
					 .exec(function createCB(err, created){
							cb(Puntos);
					});

				})
				.catch(function(error){
						console.log(error);
				});
		}


	},

};