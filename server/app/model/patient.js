var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
		 
	},
	password:{
		type: String,
		required: true,
		//validate: passwordValidator
	},
	secure_url:{
		type:String
	},

	link_request   :{ id     : {type: String, required: true, unique : true},
		              name   : {type : String}
	                },
	linked_account :{ id       :   {type : String, required: true, unique : true},
	                  name     :   {type : String},
	                  reports  :   {type : Number},
	                  url      :   {type : String}
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

/*------------ It's model name(Collection name also :- patients i.e stored mongoDB database) ------------------------*/
var patient = mongoose.model('patients', patientSchema);

/*-----------This function is for adding new user --------------------------------*/
module.exports.addUserP = function(callback){
new patient ({
	     name       : "Virat Kohli",
		 username   : "Kohli",
		 email      : "ViratK@gmail.com",
		 birth      : "08-12-1992",
		 password   : "Virat",
		 secure_url : "https://res.cloudinary.com/medcare/image/upload/v1492921169/z4a8csjtk3p0eoyavisk.png" 
		}).save(function(err,doc){
		if(err)
			return callback(err);
		else
			return callback(doc);
	}); 

};


/*---------------- Below all functions are for data Mainpulation in pateints database -------------------------------*/ 
module.exports.showUsers = function(name, id, callback){
	
	patient.find( {  $and : [{"_id" : { $ne : id} }, {"name" : name}] }, callback);
};

/*---------------  Detele user -------------------------*/
module.exports.delUserP = function(id, callback){
	patient.remove({"_id" : id}, function(err,doc){
       if(err)
       	  return callback(err,false);
       	else
       	  return callback(doc, true);
   });   

};


/*-----------------Update detail --------------------------*/
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

module.exports.updateUserA = function(id, username,password, callback){
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
/*------------------------------------------------------------------------------------------------------------*/

/*----------------------Adding Image function here ------------------------------------------------------------*/
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

module.exports.getPrepou = function(_name, id, callback){
	patient.find( {  $and : [{"_id" : { $ne : id} }, {"name" : _name}] },callback);
};
/*--------------------------------------------------------------------------------------------------------------*/

/*------------------- Linking Account process is below --------------------------------------------------------*/
module.exports.sendRequest = function(sender, id, name, callback){
	patient.update({"_id"   : id},
		           {"$addToSet" : 
		              {
		              	 "link_request" :
		              	   {
		              	   	  "id"    : sender ,
		              	   	   "name" : name
		              	   }
		              }
                    }, function(err,doc){
                    	if(err)
                    		return callback(err,false);
                    	else
                    		return callback(doc,true);
                    });
};

module.exports.rejectReq = function(user, id, callback){
	patient.update(  { "_id" : user}, 
		             { $pull : {"link_request" :{ "id" : id} }},
	                // { multi : true}, 
	                  function(err, doc){
                        if (err)
                          return callback(err, false);
                        else
                          return callback(doc, true);              
	                 });
};



module.exports.gotta = function(id ,callback){
   patient.find({"_id" : id}, {secure_url : 1}, callback );
};

/*------------------------------Accepting request -----------------------------------------*/
module.exports.acceptUser = function(user, id, name, len, url, callback){
	patient.update({"_id" : user },
		           {"$addToSet" :
		              {
		              	 "linked_account" :
		              	   {
		              	   	 "id"     :  id,
		              	   	 "name"   : name,
		              	   	 "reports": len,
		              	   	 "url"    : url
		              	   }
		               }
		            }, function(err,doc){
		            	if(err)
		            		return callback(err,false);
		            	else
		            		return callback(doc,true);
		            });
};

/*-------------------------------   Remove user ----------------------------------------------------*/
module.exports.removeUser = function(user, id, callback){
	patient.update(  { "_id" : user}, 
		             { $pull : {"linked_account" :{ "id" : id} }},
	                // { multi : true}, 
	                  function(err, doc){
                        if (err)
                          return callback(err, false);
                        else
                          return callback(doc, true);              
	                 });
};
/*------------------------------------ PATEINT.JS --------------------------------------------------*/