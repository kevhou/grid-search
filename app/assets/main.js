var app = angular.module('myapp', ['ngLoadingSpinner', 'ngMaterial', 'ngRoute']);

app.controller('MyController', function($scope, $http, $routeParams) {
  var search;
  if(typeof $routeParams.search == 'undefined'){
    search = 'ferrari';
  }else{
    search = $routeParams.search;
  }
  $scope.startAjax = function() {
    $http.defaults.headers.get = {'Authorization': 'Client-ID 6ec1b25178e106f'}
    $http.get('https://api.imgur.com/3/gallery/r/' + search + '.json')
    .success(function(imgur){
      $scope.pictures = imgur.data;
    });
  };
});

app.directive('backImg', function(){
  return {
    link: function(scope, element, attrs){
      var link = attrs.backImg;
      var extensionIndex = link.lastIndexOf('.');
      var extension = link.substr(extensionIndex);
      if(extension === '.png' || extension === '.jpg'){
        var url = link.substring(0, extensionIndex) + "b" + extension;
      }else{
        var url = link; 
      }
      element.css({
        'background-image': 'url(' + url + ')',
        'background-size': 'cover'
      });
    }
  };
});

app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/partials/grid.html'
    })
    .when('/r/:search', {
      templateUrl: '/partials/grid.html',
    })

    $locationProvider.html5Mode(true);
});