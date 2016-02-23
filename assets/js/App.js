angular.module("evInicial", ["ngRoute"])
	.config(function($routeProvider) {
		$routeProvider
			.when("/", {
			 	controller: "LayoutController",
			 	templateUrl: "Layout.html"
			})
			.when("/cuestionarios", {
			 	controller: "CuestionarioController",
			 	templateUrl: "Cuestionarios.html"
			})
	})