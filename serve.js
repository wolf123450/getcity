var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";
http.createServer(function(req,res){
  var urlObj = url.parse(req.url, true, false);
  if (urlObj.pathname.indexOf("getcity") != -1){
    //console.log(urlObj);
    //console.log("In getCity");
    fs.readFile("cities.dat.txt", function(err,data){
      if (err) throw err;
      var myRe = new RegExp("^"+urlObj.query.q);
      //console.log(myRe);
      var ret = [];
      var cities = data.toString().split("\n");
      for (var i in cities){
        var result = cities[i].search(myRe);
        if (result != -1) {
          ret.push({city: cities[i]});
        }
      }
      console.log(JSON.stringify(ret));
      res.writeHead(200);
      
      res.end(JSON.stringify(ret));
    });
  } else {
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
    
      res.writeHead(200);
      res.end(data);
  });
  }
}).listen(80);
