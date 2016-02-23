angular.module("evInicial")
	.controller("CuestionarioController", ["$scope", "$http", function($A, $B) {
			$A.cuestionarios = [];
			
			$B.get("http://localhost:1337/cuestionario")
			.success(function (data) {
				$A.cuestionarios = data;
				$A.Loading = false;

			})
			.error(function (error) {
				console.log(error);
				$A.Loading = false;
			});
		   
		}]);