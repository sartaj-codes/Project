app.controller('linking',['$scope', '$http' , function($scope, $http){


$scope.findUser = function(){
	$http({
		method : 'GET',
		url    : 'http://localhost:8081/showall/'+ $scope.Pname + '/' + $scope.Pid,
	})
	.then(function(response){
         $scope.Users = response.data;
     });
};






  console.log("Under Linking");
}]);