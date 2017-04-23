var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var bodyParser 	= require('body-parser'); 
app.use(express.static(__dirname ));

app.use(bodyParser.urlencoded({extended: true}));  //use body parser so we can get info from POST and/or URL parameters.
app.use(bodyParser.json());
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname,  'a.html'));
});

var Schema = new mongoose.Schema({
     name : String,
     age : Number
});

var user = mongoose.model('emp', Schema);
app.post('/new',function(req,res){
	new user({
		name : req.body.fi,
		age : req.body.se,
	}).save(function(err,doc){
		   if(err)
		   	   res.json(err);
		   	else
		   		res.json(doc);
	});
	  
});

app.get('/getMongo', function(req,res){
     user.find({}, function(err,doc){
     	if(err)
     		res.json(err);
     	else
     	res.json(doc);
     });
});

app.get('/showAll', function(req,res){
	user.find({}, function(err,doc){
           if(err)
              res.json(err);
            else
              res.json(doc);
      });
});

app.delete('/delete', function(req,res){
	user.remove({ "_id": "58c258b766387c1258b2c876"}, function(err,doc){
           if(err)
           	 res.json(err);
           	else
           		res.json(doc);
	});
});

var server = app.listen(8089, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Server is running man !!! ://%s:%s", host, port)

});