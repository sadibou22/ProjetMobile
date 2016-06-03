//on requiert nos modules
var http = require('http');
var express = require('express'),
fs = require('fs'),
mongoose = require('mongoose'),
app = express();
var port= 8080;
var destinationFile = 'files';


//Mon module perso
var Model = require('./Models/Consultant-Model.js')
var ConsultantController = require('./controllers/upload-controller.js')

app.use(express.bodyParser());
app.use(express.bodyParser({ keepExtensions: true, uploadDir:'./files'}));


/*****API****/
Model.connect();
//Affichage index
app.get('/', function(req, res){
	//res.render('index');
	res.sendfile(__dirname+'/views/index.html');
});

//upload fichier + depot dans un dossier + extraction data + save dans mongo
app.post('/upload', function(req, res){
	var filename = req.files.myfile.path
	ConsultantController.upload(filename);
	res.end(req.files.myfile.path);
}); 


//Afficher la liste des consultants 
app.get('/AfficheConsultants', function (req, res){ConsultantController.getAllConsultants(req, res)});
//Afficher un consultant
app.get('/AfficheConsultants/:id', function(req, res) {
	ConsultantController.getConsultant(req.params.id, res);
});


app.listen(port);
console.log('Application running on http://localhost:'+port);
