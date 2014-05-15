angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('LiveDataCtrl', function($scope) {
	$scope.stops = [
		{ title: 'Stop number 1', id: 1 },
		{ title: 'Stop number 2', id: 2 },
		{ title: 'Stop number 3', id: 3 },
		{ title: 'Stop number 4', id: 4 },
		{ title: 'Stop number 5', id: 5 },
		{ title: 'Stop number 6', id: 6 }
	];
})

.controller('LiveCtrl', function($scope, $stateParams) {
})


.controller('Map', function($scope, $http) {

	var apikey= "303c5945-9ee9-4255-996e-7ee03dd2324b",
		url = 'https://api.at.govt.nz/v1/public/realtime/vehiclelocations?api_key=' + apikey + '&callback=JSON_CALLBACK';


	$http.defaults.headers.common.crossDomain =  'true' ; //crossDomain:true

	$http({method:"jsonp", url: url}).
		success(function(data, status, headers, config) {
			var buses = data.response.entity;
				i = 0;

			angular.extend($scope, {
				map: {
					center: {
						latitude: -36.919038,
						longitude: 174.835257
					},
					zoom: 11,
					draggable: true
				} 
			});
			$scope.$watch('map', function(map) {
				
				if (map) {
					var markers = [];
					for (i = 0; i < buses.length; i = i + 1){
						console.log(buses[i].vehicle);
						markers.push({
							latitude: buses[i].vehicle.position.latitude,
							longitude: buses[i].vehicle.position.longitude,
							title: buses[i].vehicle.id,
							icon: 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|2|cccccc|8|_|'+buses[i].vehicle.trip.route_id
							//icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+buses[i].vehicle.trip.route_id+'|FF0000|000000'
						});
					}
					$scope.map.markers = markers;
				}
			});

		}).
		error(function(data, status, headers, config) {
			console.log('error');
			//@todo 
		});
})
