var app = angular.module("routeApp", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("dashboard", {
      url:"/dashboard",
      templateUrl:"templates/graph.html",
      controller:'dashboard',
    })
    
    .state("change",{
         url:"/change",
         templateUrl: "templates/change_detail.html",
         controller: 'changeDetail'
    })
     .state("viewRep", {
          url:"/viewRep",
          templateUrl:"templates/view_reports.html",
          controller: 'viewReports'
    })
     .state("change.account", {
       url:"/account",
       templateUrl:"templates/account.html",
      
     })
     .state("change.personal",{
         url:"/personal",
        templateUrl: "templates/personal.html",
        controller: 'changeDetail'
     })
      .state("share", {
        url : "/share",
        templateUrl:"templates/sendrequest.html",
        controller: 'linking'
      })
     $urlRouterProvider.otherwise('/dashboard');  
});



