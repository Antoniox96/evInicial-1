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

    aJSON: function(cb) {
        switch(this.tipo) {
          case 'essay':
              this.essayToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          case 'matching':
              this.matchingToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          case 'multichoice':
              this.multichoiceToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          case 'numerical':
              this.numericalToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          case 'shortanswer':
              this.shortanswerToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          case 'truefalse':
              this.truefalseToJSON(function(PreguntaJSON){cb(PreguntaJSON)});
              break;
          default:
              break;
        }      
    },

    essayToJSON: function(cb) {

    },

    matchingToJSON: function(cb) {
        var PreguntaJSON = this.toJSON();
        Opcion.find().where({ pregunta: this.id }).populate('subopciones').then(function(opciones){
            PreguntaJSON['opciones'] = opciones; 
            cb(PreguntaJSON);
        }).catch(function(error){});
    },

    multichoiceToJSON: function(cb) {

    },

    numericalToJSON: function(cb) {

    },

    shortanswerToJSON: function(cb) {

    },

    truefalseToJSON: function(cb) {

    }
  }

};