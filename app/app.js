angular.module('OWMApp', ['ngRoute'])

.value('owmCities', [
    'New York',
    'Dallas',
    'Chicago',
    'San Francisco',
    'Los Angeles',
    'Houston'
])

.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: 'home.html',
                controller: 'HomeCtrl'
            })
            .when('/error', {
                template: '<p>You messed up now, that city doesn\'t EXIST!</p>'
            })
            .when('/cities/:city', {
                templateUrl: 'city.html',
                controller: 'CityCtrl',
                resolve: {
                    city: function(owmCities, $route, $location) {
                        var city = $route.current.params.city;

                        if (owmCities.indexOf(city) === -1) {
                            $location.path('/error');
                            return;
                        }
                        return city;
                    }
                }
            });
    }])
    .controller('HomeCtrl', ['$scope', function($scope) {
        //empty for now
    }])
    .controller('CityCtrl', ['$scope', 'city', function($scope, city) {
        $scope.city = city;
    }])
    .run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path('/error');
    });
});
