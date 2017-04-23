var express    = require('express');
var app        = express();
var cloudinary = require('cloudinary');
var path= require('path');
var fs = require('fs');
var multiparty = require('connect-multiparty'),
  multipartyMiddleware = multiparty();
  app.use(multipartyMiddleware);

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname,  'a.html'));
});

cloudinary.config({ 
  cloud_name: 'medcare', 
  api_key: '837816295715632', 
  api_secret: 'HQeV9sSiCat53BnhCwYYF2-tyUA' 
});



/*app.post('/up/:path', function(req,res){
   var file = path;
    cloudinary.uploader.upload(file, function(result) { 
     console.log(result);
     {public_id: 'single_page_pdf'};
     res.json(result.secure_url);
   });
});
*/


module.exports = {

uploadImage: function(req, res, next) {
   if(req.files.file) {
     cloudinary.uploader.upload(req.files.file.path, function(result) {
       if (result.url) {
         req.imageLink = result.url
         next();
       } else {
         res.json(error);
       }
     });
   } else {
     next();
   }
 }
};
var server = app.listen(9096, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Server is running man !!! ://%s:%s", host, port)

})