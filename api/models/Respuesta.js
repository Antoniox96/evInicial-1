/**
* Respuesta.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	alumno: { model: 'Alumno' },

  	cuestionario: { model: 'Cuestionario' },

  	pregunta: { model: 'Pregunta' },

  	valor: { type: 'string', size: 255, required: true },

  	puntuacion: { type: 'integer' },

  	asignarPuntuacion: function(cb) { 			
        
	    var newValor;
	    var newPuntuacion;   

        Respuesta.create({ alumno: req.alumno.id, cuestionario: req.cuestionario.id, pregunta: req.pregunta.id,
        				   valor: newValor, puntuacion: newPuntuacion })
	        .exec(function create(err, created){
		      	if (err) return cb(err);
				cb(null, created);
		    })
    }

  }

};

