var express    = require('express');
var app        = express();
var cloudinary = require('cloudinary');
var path       = require('path');
var fs         = require('fs');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser'); 
var P_detail   = require('./app/model/patient'); // Linking model patient
var R_Detail   = require('./app/model/Reports'); // Linking model Reports
app.use(bodyParser.urlencoded({extended: true}));  //use body parser so we can get info from POST and/or URL parameters.
app.use(bodyParser.json());

/* Its middleware used send or fetch multipart data to Backend nodejs */ 
var multiparty = require('connect-multiparty'),
  multipartyMiddleware = multiparty();
  app.use(multipartyMiddleware);

/* For Established Connection with mongoDB use mongoose */
mongoose.connect('mongodb://localhost/Repmanger');
app.use(express.static(__dirname + "/../client"));

/* Route for home page */
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '../client', 'patient.html'));
});

/* These are cloudinary API  use to store local content on cloud */
cloudinary.config({ 
  cloud_name: 'medcare', 
  api_key: '837816295715632', 
  api_secret: 'HQeV9sSiCat53BnhCwYYF2-tyUA' 
});

/**************************** These all are Patients Routes includes Manipulation of data *****************************/

/* This route is for booth user and admin to create new account */
app.post('/new',function(req,res){
	P_detail.addUserP(function(err,doc){
        if(err)
			res.json(err);
		else
			res.json({sucess:true});
    });
});

/* This route is for Admin to delete a particular User */
app.delete('/deluser/:_id', function(req,res){
	var id = req.params._id;
   P_detail.delUserP(id, function(err,doc){
        if(err)
			res.json(err);
		else
			res.json({sucess:true});

   });

});

/* This route is for Searching Patient to link their account */
app.get('/showall/:_name', function(req,res){
	var name = req.params._name;
	P_detail.showUsers(name, function(err,doc){
		if(err)
			res.json(err);
		else
			res.json(doc);
	});
});

/* This route is for to Change Detail by User PERSONAL SETTING */
app.post('/changeProfile', function(req,res){
   var id    = req.body.id;
   var name  = req.body.first;
   var email = req.body.email;
   var birth = req.body.bir;
  P_detail.updateUserP(id, name, email, birth, function(err,doc){
 	if (err) 
 		res.json(err);
 	else
 		res.json({success:true});
   });
});

/* This route is for to Change Detail by User ACCOUNT SETTING */
app.post('/changeAProfile', function(req,res){
  var id       = req.body.id1;
  var username = req.body.username;
  var password = req.body.passsword;  
  P_detail.updateUserA(id,username,password,function(err,doc){
  	     if(err)
   	         res.json(err);
   	      else
   	         res.json({succes: true});
    });
});  

/* This route is for upload an image and using Cloud to handeled Images */
app.post('/up', function(req,res){
   var file = req.files.file.path;
    console.log(file);
    cloudinary.uploader.upload(file, function(result) { 
     var url = result.secure_url;
     var id  = req.body.abc; 
     console.log(url);
     console.log(id);
     P_detail.addImageUrl(id,url, function(err,doc){
     	if(err)
     		res.json(err);
     	else
     		res.redirect('/');
     })
     
   });
});

/* This route is for Admin to check all the user in database */
app.get('/infor', function(req,res){
	P_detail.getInfo(function(err,doc){
		if(err)
			res.json(err);
		else
			res.json(doc);
	});
});

/*This route is for send Request for Link an Account */ 
app.post('/linkRequest/:_sender/:_id/:_name', function(req,res){
	var sen  = req.params._sender;
	var id   = req.params._id;
	var name = req.params._name;
	P_detail.sendRequest(sen, id, name, function(err,doc){
		if(err)
			res.json(err);
		else
			res.json(doc);
	});

});

/* This Route is for refusing link account request */
app.post('/rejectReq/:_login/:_id', function(req,res){
   var id  = req.params._id;
   var usr = req.params._login;
   P_detail.rejectReq(usr, id, function(err,doc){
   	   if(err)
   	   	  res.json(err);
   	   	else
   	   	   res.json(doc);
   });

});

/*********************************************************************************************************************/

/******************************* Below all are Reports related Routes ***********************************************/

/* This route is for adding report by using user Credentials to Database */
app.post('/newRepo/:id/:title/:type/https://res.cloudinary.com/medcare/image/upload/:ty1/:ty2',function(req,res){
  var id    = req.params.id;
  var title = req.params.title;
  var type  = req.params.type;
  var url   = "https://res.cloudinary.com/medcare/image/upload/"+req.params.ty1+"/"+req.params.ty2;
  R_Detail.addReport(id, title, type, url, function(err,doc){
       if(err)
		  res.json(err);
		else
		res.json(doc);
       
	});
	  
});


/* Seprate Route not for users for admin to check all reports in database */
app.get('/ALLrepos', function(req,res){
    
	R_Detail.getAll( function(err,doc){
		if(err)
			res.json(err);
		else
			res.json(doc);
	});
});

/* Fetching  Reports main route */
app.get('/repos/:_id', function(req,res){
    var id = req.params._id;
	R_Detail.getReports(id, function(err,doc){
		if(err)
			res.json(err);
		else
			res.json(doc);
	});
});

/* DashBoard Graph Route to fetch some particular attributes */
app.get('/Grepos/:_id', function(req,res){
	var id = req.params._id;
	R_Detail.getGReports(id, function(err,doc){
		if(err)
			res.json(err);
		else
			res.json(doc);
	});
});

/* Checking Pending Reports Status */
app.get('/status/:_id', function(req,res){
	var id = req.params._id;
	R_Detail.gStatus(id, function(err,doc){
		if(err)
			res.json(err);
		else
			res.json(doc);
	});
});

/* Accepting Report Here from different Patient Requested Repo */
app.post('/Rconfirm/:data', function(req,res){
	var id = req.params.data;
	R_Detail.addRepo(id,function(err,doc){
		if(err)
			res.json(err);
		else
			res.redirect('/');
	});
});

/* Delete Report Route */
app.delete('/delrepos/:data', function(req,res){

   var _id = req.params.data;
  // console.log("_id :");
   console.log(_id);
   R_Detail.delRepo(_id,function(err,doc){
   	   if(err)
   	   	res.json(err);
   	   else
   	   	res.json(doc);
   });
});

/* File uploading route here */
app.post('/upReportFile/:path', function(req,res){
   var file = req.files.file.path;
    cloudinary.uploader.upload(file, function(result) { 
     console.log(result);
     {public_id: 'single_page_pdf'};
     res.json(result.secure_url);
   });
});
/*********************************************************************************************************************/

/********* Server Running on 8081 Port ********/
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Server is running man !!! ://%s:%s", host, port)

});

/************************************* Report Management System ******************************************************/ 