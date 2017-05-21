app.controller('myCtrl',['$scope', '$http' , function($scope, $http){
   $scope.myWelcome = [];
   $scope.Reports = [];
    $scope.btn_name = "Send Request";

  /*-------------This request is for identify Logined User ------------------------*/
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
/*---------------------------------------------------------------------------------*/

/*---------------This Post request is for linking request -------------------------*/    
$scope.linkAccount = function(sender, owner, name){
  $http({
    method : 'POST',
    url    :  'http://localhost:8081/linkRequest/'+sender+'/'+ owner + '/' + name,
  })
     .then(function(response){
            // $scope.myWelcome = response.data;

     });
     $scope.change_n();
};
/*-----------------------------------------------------------------------------------*/


/*-------------This function is for access another user Reports ---------------------*/
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
/*------------------------------------------------------------------------------------*/

$scope.send_rep = function(id, name){
   //console.log("jyhedtrhjjhyjfhgvg3545" + id);
   $http({
    method : 'GET',
    url    : 'http://localhost:8081/getPrepo/' + id
   }).
   then(function(res){
       //console.log(res.data[0].title);
       
       $http({
      method : 'GET',
      url    : 'http://localhost:8081/getPrepou/'+ name,
      })
      .then(function(resu){
      
           $http({
             method  : 'POST',
             url     : 'http://localhost:8081/senReport/'+ resu.data[0]._id,
             data    :  res.data[0]
          }).then(function(response){
              console.log("Report have been sent !!!");
          });
      });
  
  });

};



$scope.change_n = function(){
    $scope.btn_name = "Request sent";
};

}]);
  








