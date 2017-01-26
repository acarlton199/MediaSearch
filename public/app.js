var mediaApp = angular.module("mediaApp", ["ngRoute", "ui.bootstrap"]);

mediaApp.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "search.html",
			controller: "searchController"
		}).when("/media/:id", {
			templateUrl: "details.html",
			controller: "detailsController"
		}).otherwise({redirectTo: "/"});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

mediaApp.controller("searchController", function ($scope, $http) {	
	
	$scope.search = function (searchString) {
		$scope.searchResults = [];
		var url = "http://www.omdbapi.com/?s=" + searchString.replace(/\s/g, "+");
		
		$http.get(url).then(function(response) {
			$scope.searchResults = response.data.Search;
		});
	};
});

mediaApp.controller("detailsController", function ($scope, $http, $routeParams) {
	var url = "http://www.omdbapi.com/?i=" + $routeParams.id + "&plot=full&r=json";
	$http.get(url).then(function (response) {
		$scope.media = response.data;	
	});
});