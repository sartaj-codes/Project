app.controller('myCtrl',['$scope', '$http' , function($scope, $http){
   $scope.myWelcome = [];
   $scope.Reports = [];
 
   $http({
   	method : 'GET',
   	url: 'http://localhost:8081/infor'
   })
   .then(function(response){
   	$scope.myWelcome = response.data[0];
    $scope.Pid       = response.data[0]._id;
    $scope.url       = response.data[0].secure_url;
     $http({
    method : 'GET',
    url: 'http://localhost:8081/repos/'+ $scope.Pid, 
    })
   .then(function(response){
    $scope.Reports = response.data;
   });

});
    

}]);
  








