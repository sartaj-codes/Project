
/*-------------------- For file upload own made directive --------------------------*/
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
/*---------------------------------------------------------------------------------------*/
  


/*------------- Service used for getting file path ------------------*/
app.service('fileUpload', ['$http', function ($scope, $http) {
   
  }]);


/*------------------Controller Start here ----------------------------------------------------*/
app.controller('myCtrl',['$scope', '$http', 'fileUpload' , function($scope, $http, fileUpload){
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
      url    : 'http://localhost:8081/getPrepou/'+ name + '/' + $scope.Pid,
      })
      .then(function(resu){
         
        if(resu.data.length != 0)
        {  
           $http({
             method  : 'POST',
             url     : 'http://localhost:8081/senReport/'+ resu.data[0]._id,
             data    :  res.data[0]
          }).then(function(response){
              console.log("Report have been sent !!!");
          });
        }
      
      });
      
  });

};


/* For button after Click */
$scope.change_n = function(){
    $scope.btn_name = "Request sent";
};

/*--------------------------------------------------FILE UPLOAD WORK HERE ------------------------------------------------*/
    $scope.uploadFile = function(){
        

        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        
       /*------ Its For form data ------------*/  
        var fd = new FormData();
        fd.append('file', file);
         
         $http.post('http://localhost:8081/up', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            
            /*For addition image-url this is used */
            $http({
                method : 'POST',
                url    : 'http://localhost:8081/upRepEx/' + $scope.Pid + '/' + response,
            }).
             then(function(res){

             });
         })
        .error(function(){
        });
        

    };
/*------------------------------------------------------------------------------------------------------------------------*/




}]);
  








