var express = require('express');

var app = express();
app.use(express.bodyParser({ keepExtensions: true, uploadDir:'./files'}));

app.get('/', function(req, res) {
     res.setHeader('Content-Type', 'text/html');
     res.end(
     '<form action="/upload" method="post" enctype="multipart/form-data">'+
     '<input type="file" name="uploadfile">'+
     '<input type="submit" value="Envoyer">'+
     '</form>'
 );
});

app.post('/upload', function(req, res) {
     res.setHeader('Content-Type', 'text/html');
     res.end(req.files.uploadfile.path);
});

app.listen(8000);