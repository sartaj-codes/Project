app.controller('changeDetail', ['$scope', '$http', function($scope,$http){

     /*  $http({
       	   url:'http://localhost:8081/changeProfile',
       	   method: 'PUT',

       })
   */
   $scope.Udata = [];
    $http({
   	method : 'GET',
   	url: 'http://localhost:8081/infor'
   })
   .then(function(response){
   	$scope.Udata    = response.data;
   	$scope.Uname2   = response.data[0]._id;
   	$scope.Uname    = response.data[0].name;
   	$scope.Uemail   = response.data[0].email;
   	$scope.Uphone   = "7696964811"
   	$scope.Ubirth   = response.data[0].birth;
   	$scope.Usrname  = response.data[0].username;
   	$scope.UsrPass  = response.data[0].password;
   	$scope.UsrCPass = response.data[0].password;
   });
   $scope.message = "Controller for changeDetail" ;
    console.log("Inside compare");
        
}]);