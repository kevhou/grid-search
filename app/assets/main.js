// angular.module('grid', ['ngMaterial'])
// .controller('ctrl', function($scope){
//   $scope.pictures = [];

//   $scope.init = function(){
//     var url = 'https://api.imgur.com/3/gallery/r/';
//     var sub = 'ferrari.json';
//     var final = url + sub;

//     $.ajax({
//       url: final,
//       dataType: 'json',
//       beforeSend: function (xhr) {
//           xhr.setRequestHeader('Authorization', 'Client-ID 6ec1b25178e106f');
//       },
//       success: function(imgur){
//         $scope.pictures = imgur.data;
//       }
//     })
//   }
  
// })
// .directive('backImg', function(){
//   return function(scope, element, attrs){
//       var url = attrs.backImg;
//       var position = url.length-4;
//       var output = [url.slice(0, position), 'm', url.slice(position)].join('');

//       element.css({
//         'background-image': 'url(' + url + ')',
//         'background-size': 'cover'
//       });
//   };
// });

var app = angular.module('myapp', ['ngLoadingSpinner', 'ngMaterial']);
app.controller('MyController', function($scope, $http) {
  $scope.startAjax = function() {
    $http.defaults.headers.get = {'Authorization': 'Client-ID 6ec1b25178e106f'}
    $http.get('https://api.imgur.com/3/gallery/r/dog.json')
    .success(function(imgur){
      $scope.pictures = imgur.data;
    });
  };
});
app.directive('backImg', function(){
  return {
    link: function(scope, element, attrs){
      var url = attrs.backImg;
      var position = url.length-4;
      var output = [url.slice(0, position), 'm', url.slice(position)].join('');

      element.css({
        'background-image': 'url(' + url + ')',
        'background-size': 'cover'
      });
    }
  };
});