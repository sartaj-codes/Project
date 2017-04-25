app.controller('myCtrl',['$scope', '$http' , function($scope, $http){
   $scope.myWelcome = [];
   $scope.Reports = [];
 
   $http({
   	method : 'GET',
   	url: 'http://localhost:8081/infor'
   })
   .then(function(response){
   	$scope.myWelcome = response.data[1];
    $scope.Pid       = response.data[1]._id;
    $scope.url       = response.data[1].secure_url;
     $http({
    method : 'GET',
    url: 'http://localhost:8081/repos/'+ $scope.Pid, 
    })
   .then(function(response){
    $scope.Reports = response.data;
   });

});
    
$scope.linkAccount = function(sender, owner, name){
  $http({
    method : 'POST',
      url    :  'http://localhost:8081/linkRequest/'+sender+'/'+ owner + '/' + name,
  })
     .then(function(response){
             $scope.myWelcome = response.data;

     });
  
};





}]);
  








