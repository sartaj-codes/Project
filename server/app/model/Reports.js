var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ReportSchema = new Schema({
	title:{
         type     : String,
         required : true
	},
	type:{
		 type     : String,
		 required : true
	},
	date:{
		 type     : String,
		 required : true 
	},
	Status:{
		 type     : String,
		 required : true
	},
	Sender:{
		 type     : String,
		 required : true
	},
	Owner:{
		 type     : String,
		 required : true
	},
	secure_url:{
		type     : String,
		required : true
	},
	report_url:{
		type    : String,
		required : true
	},
	png_url:{
		type     : String,
		required : true
	}
}); 

var reports = mongoose.model('reports', ReportSchema);

module.exports.getAll = function(callback){
   	reports.find({},callback);
   };


module.exports.getReports = function(id,callback){
	reports.find({ $and : [ {"Owner" : id}, {"Status" :"U" } ] }, callback);
};

module.exports.getGReports = function(id, callback){
	reports.find({ $and : [ {"Owner" : id}, {"Status" :"U" } ] },callback);
};


module.exports.gStatus = function(id, callback){
   	reports.find({ $and : [ {"Owner" : id}, {"Status" :"P" } ] },callback);
   };

module.exports.addReport = function(_id,_title, _type, url, url_2, url_3,callback){
	var id = _id.toString();
	new reports({
		    title     : _title,
		    type      : _type,
		    date      : new Date(),
		    Status    : "P",
		    Sender    : id,
		    Owner     : id,
		    secure_url: url,
		    report_url: url_2,
		    png_url   : url_3
	}).save(function(err,doc){
		if(err)
			return callback(err);
		else
			return callback(doc);
	});

};

module.exports.delRepo = function(id,callback){
	
   reports.remove({_id : id},function(err, doc){
       if(err)
       	  return callback(err);
       	else
       	  return callback(doc);
   });
 };  
 
 module.exports.addRepo = function(id,callback){

 	reports.update({"_id": id}, 
 		          {$set:{"Status": "U"}},
 	              function(err,doc){
                     if(err)
                        return callback(err);
                    else
                    	return callback(doc);
 	              });
    };

/* This fxn saved for future if any new attributes require  
module.exports.linkka = function(id, url, callback){

	reports.update({"_id" : id}, {$set:{"png_url" : url}},
		            function(err, doc){
		            	if(err)
		            		return callback(err);
		            	else
		            		return callback(doc);
		            });

};
*/
module.exports.addLink = function(id, url, callback){

	reports.update({"Owner" : id},
		            {$set: {"report_url" : url}},
		             function(err,doc){
		             	if(err)
		             		return callback(err);
		             	else
		             		return callback(doc);
		             });
};
