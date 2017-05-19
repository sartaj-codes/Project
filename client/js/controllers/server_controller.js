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
    
$scope.linkAccount = function(sender, owner, name){
  $http({
    method : 'POST',
    url    :  'http://localhost:8081/linkRequest/'+sender+'/'+ owner + '/' + name,
  })
     .then(function(response){
            // $scope.myWelcome = response.data;

     });
  
};



/*------------------------------This function is for access another user Reports --------------------------------------*/
$scope.exactUser = function(id)
{
   $http({
      method : 'GET',
      url    : 'http://localhost:8081/repos/'+ id,
   })
   .then(function(response){
      $scope.Reports = response.data;
   });
};



}]);
  








