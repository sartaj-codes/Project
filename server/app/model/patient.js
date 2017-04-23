var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*var bcrypt   = require('bcrypt-nodejs');
var validate = require('mongoose-validator');

var nameValidator=[
  validate({
    validator: 'matches',
    arguments: /^([a-zA-Z])+$/,
    message: 'Numbers and special characters are not allowed.'
  })
];

var emailValidator=[
  validate({
    validator: 'isEmail',
    message: 'Invalid email id.'
  })
];

var phoneValidator=[
  validate({
  	validator: 'isLength',
  	arguments: [10,10],
  	message: 'Invalid phone number.'
	}),
	validate({
		validator: 'isInt',
		message: 'Invalid phone number'
	})
];

var usernameValidator=[
  validate({
    validator:'isAlphanumeric',
    message:'Username should contain only letters and numbers'
  }),
  validate({
  	validator: 'isLength',
  	arguments: [4,],
  	message:'Username should be atleast 4 characters long.'
  })
];

var passwordValidator=[
  validate({
  	validator: 'isLength',
  	arguments: [6,50],
  	message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
	})
];
*/
var patientSchema = new Schema({
	name:{
		type: String,
		required: true,
		//validate: nameValidator
	},
	username:{
		type: String,
		required: true,
		unique: true,
		//validate: usernameValidator
	},
	email:{
		type: String,
		required: true,
		unique: true,
		//validate: emailValidator
	},
	birth :{
		 type: String,
		 required: true,
		 unique: true
	},
	password:{
		type: String,
		required: true,
		//validate: passwordValidator
	},
	secure_url:{
		type:String
	}
	/*lname:{
		type: String,
		required: true,
		validate: nameValidator
	},*/
	
	/*phone:{
		type: String,
		required: true,
		validate: phoneValidator,
	},*/
	
	
});


var patient = mongoose.model('patients', patientSchema);

module.exports.addUserP = function(callback){
new patient ({
	     name       : "Shubham Verma",
		 username   : "Shubi",
		 email      : "ShubiV@gmail.com",
		 birth      : "08-12-1996",
		 password   : "Shubham",
		 secure_url : "https://res.cloudinary.com/medcare/image/upload/v1492921169/z4a8csjtk3p0eoyavisk.png" 
		}).save(function(err,doc){
		if(err)
			return callback(err);
		else
			return callback(doc);
	}); 

};

module.exports.showUsers = function(name, callback){
	
	patient.find({"name" : name}, {name : 1, secure_url : 1},  callback);
};

module.exports.delUserP = function(id, callback){
	patient.remove({"_id" : id}, function(err,doc){
       if(err)
       	  return callback(err,false);
       	else
       	  return callback(doc, true);
   });   

};



module.exports.updateUserP = function(id,first,em,bir, callback){
	 patient.update({"_id" : id},
   	            {$set:{"name" : first,
   	                   "email" : em,
   	                   "birth" : bir
   	                   }
   	             },
   	            function(err,doc){
   	            	if(err)
   	            		return callback(err,false);
   	            	else
   	            		return callback(doc,true);
   	            });
};

module.exports.updateUserA = function(id,username,password, callback){
	 patient.update({"_id" : id},
   	            {$set:{"username" : username,
   	                   "password" : password
   	                  }
   	             },
   	            function(err,doc){
   	            	if(err)
   	            		return callback(err);
   	            	else
   	            		return callback(doc);
   	            });
};
module.exports.addImageUrl = function(id,url,callback){
	patient.update({"_id" : id},
		         {$set: {"secure_url": url}},function(err,doc){
		         	if(err)
		         		return callback(err,false);
		         	else
		         		return callback(doc,true);
		         });
};
module.exports.getInfo = function(callback){
	patient.find({},callback);
};