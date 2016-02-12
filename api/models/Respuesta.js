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

  	puntuacion: { type: 'integer' }

  }

};

