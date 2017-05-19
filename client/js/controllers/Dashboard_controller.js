app.controller('dashboard',['$scope', '$http' , function($scope, $http){
  /* These are model for data binding */
   $scope.Reports  = [];
   $scope.data     = [];
   $scope.pending  = [];
   $scope._total   = 1;
   $scope._pending = 0;
   $scope.flag     = false;





$http({
    method : 'GET',
    url: 'http://localhost:8081/infor'
   })
   .then(function(response){
    $scope.Pid       = response.data[0]._id;
    $scope.linkreq   = response.data[0].link_request.length;
    
/* This reuest is for graph while checking Reports */  
    $http({
     	method : 'GET',
   	    url: 'http://localhost:8081/Grepos/'+ $scope.Pid,
    })
   .then(function(response){

     /* Here am getting Response going to create array accoording to graph format */
   	$scope.Reports = response.data;
    if(response.data.length != 0)
    {  
   	   var _date      = response.data[0].date;
   	   var start_date = (parseInt(10*_date[8])+parseInt(_date[9]));
   	   var length     = response.data.length; 
   	   var _y  = 1; 
   	   var cal = 0;

   	   /* this is main logic behind graph i.e traverse response adding repo's in _y according to date */
   	   for(var i = 1 ; i < length; i++)
       {
     	
   	      var arr       = {x: '', y: ''};
   	      var get_date  = $scope.Reports[i].date;
   	      var _date_int = (parseInt(10*get_date[8])+parseInt(get_date[9]));
   	   
   	   /* when next day occur we 've to intallise start_date & _y */
   	      if(start_date != _date_int)
   	      {    arr.x     = new Date($scope.Reports[i-1].date);
               arr.y     = _y;
               cal      += _y; 
               start_date = _date_int;
               _y = 1;             
               $scope.data.push(arr);
   	      }

   	   /* here counting untill date is same */ 
   	     else
   	       _y++;

   	  }

   	 /* here we also have to add last date report */
   	 var temp = {x: '', y: ''};
   	 temp.x   = new Date($scope.Reports[length-1].date);
   	 temp.y   = _y;
   	 cal     += _y; 
   	 $scope._total = cal;
   	 $scope.data.push(temp);
   }
     
  });



   /* For getting Pending status of reports */
   $http({
    method : 'GET',
    url: 'http://localhost:8081/status/' + $scope.Pid,
   })
   .then(function(response){
        $scope.pending       = response.data;
        $scope._pending_link = $scope.linkreq;
        $scope._pending      = response.data.length ; 
        
        if($scope._pending_link != 0)
           $scope.flag_link = true;
        
        if($scope._pending != 0)
          $scope.flag = true;
   });



/* This function is used for delete Reports that are shown in notification */
 $scope.delReport = function(id){
   	  
   	  $http({
   	    method : 'DELETE',
   	    url: 'http://localhost:8081/delrepos/' +  id,
   	  })
      .then(function(response){
         $scope.Reports  = response.data;
      });
  
/* For instant change we've to do Get request on the spot */ 
    $http({
   	method : 'GET',
   	url: 'http://localhost:8081/status/' + $scope.Pid,
   })
   .then(function(response){
   	    $scope.pending  = response.data;
       	$scope._pending = response.data.length; 
       	if($scope._pending != 0)
       		$scope.flag = true;
       	else
       		$scope.flag = false;
   });
};


/* This function is used for Upload Reports  */
$scope.uploadRepo = function(title, type, url){
     $http({
       method : 'POST',
       url    : 'http://localhost:8081/newRepo/'+$scope.Pid+'/'+title+'/'+type+'/'+url,
     }).then(function(response){
     	$scope.Reports = response.data;
     });

  /* For instant change we've to do Get request on the spot */ 
    $http({
   	method : 'GET',
   	url: 'http://localhost:8081/status/' + $scope.Pid,
    })
    .then(function(response){
   	      $scope.pending  = response.data;
          $scope._pending = response.data.length; 
       	  if($scope._pending != 0)
       	 	$scope.flag = true;
       	  else
       		$scope.flag = false;
   });
};


/* This fxn is used to add Notification report */ 
$scope.AddReport = function(id){
   	  
   	 $http({
   	    method : 'POST',
   	    url: 'http://localhost:8081/Rconfirm/' +  id,
   	  })
    .then(function(response){
         $scope.Reports  = response.data;
     });

  /* For instant change we've to do Get request on the spot */  
    $http({
   	method : 'GET',
   	url: 'http://localhost:8081/status/' + $scope.Pid,
   })
   .then(function(response){
   	    $scope.pending  = response.data;
       	$scope._pending = response.data.length; 
       	if($scope._pending != 0)
       		$scope.flag = true;
       	else
       		$scope.flag = false;
   });
};

});



/*---------------------------- This function is for reject Link request -------------------------------------------*/
$scope.rejectReq = function(user, _id)
{

 $http({
    method : "POST",
    url    : 'http://localhost:8081/rejectReq/'+user+'/'+_id,
 })
   .then(function(response){

  /* for instant change these call are excuted */
  /* -------------------------------------*/      
       $http({
         method : 'GET',
         url: 'http://localhost:8081/infor'
      })
   .then(function(response){
       $scope.myWelcome = response.data[0];  // update user detail
       $scope.linkreq   = response.data[0].link_request.length; // update linking request
   });
  /*--------------------------------------*/

  /*-----------------------------------------*/
  $http({
    method : 'GET',
    url: 'http://localhost:8081/status/' + $scope.Pid,
   })
   .then(function(response){
        $scope.pending       = response.data;
        $scope._pending_link = $scope.linkreq; // upadte size of linking account requests
        $scope._pending      = response.data.length ; //update reports requests
        
        /* flag used for indication */
        if($scope._pending_link != 0)
           $scope.flag_link = true;
        else
          $scope.flag_link = false;

        if($scope._pending != 0)
          $scope.flag = true;
        else
          $scope.flag = false;
   });
  /*----------------------------------------*/
 });

};
/*--------------------------------------------------------------------------------------------------*/
$scope.acceptUser = function(user, _id, name)
{  
   $http({
          method : 'GET',
          url    : 'http://localhost:8081/getUrl/'+ _id,  
      })
      .then(function(url){
         $scope.url = url.data[0].secure_url;
        
      });
    
  
  $http({
       method : 'GET',
       url    : 'http://localhost:8081/repos/' + _id,
   })
   .then(function(response){
      
      $scope._leng = response.data.length;
      
      $http({
      method : 'POST',
      url    : 'http://localhost:8081/accept/'+ user +'/'+ _id +'/'+ name +'/'+$scope._leng+'/' + $scope.url, 
    })
    .then(function(res){
      
    });
  }); 
   $scope.rejectReq(user, _id);
};


/* Keep this fxn for when need to add new attribute */
/*
$scope.linkkaPng = function()
{
    $http({
      method : 'GET',
      url    : 'http://localhost:8081/ALLrepos',
    })
    .then(function(response){
        for(var i = 0; i < response.data.length; i++)
        {

            $http({
               method : 'POST',
               url    : 'http://localhost:8081/linkka/'+response.data[i]._id +'/'+ response.data[i].report_url
            })
            .then(function(res){

            });
        }  
    });
};

*/


}]);