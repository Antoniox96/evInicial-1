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
        enum: ['essay', 'matching', 'matching', 'numerical', 'shortanswer', 'truefalse']

    },

    opciones: {
        collection: 'Opcion',
        via: 'pregunta'
    },

    cuestionarios : {
        collection : 'cuestionario',
        via : 'preguntas'
    },

    Matching.toJSON: function(cb) {
        
    }

  }

};

