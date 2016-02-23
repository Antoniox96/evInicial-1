module.exports = {

	load: function(req, res, next) {

		Respuesta.findOne({ where: { id: Number(req.params.respuestaId)} })
			.then(function(respuesta){
				if(respuesta) {
					req.respuesta = respuesta;
					next();
				} 
				else { next(new Error('No existe la respuesta con el id' + req.params.preguntaId)); }
			})
			.catch(function(error){
				next(error);
			});
	
	}

};