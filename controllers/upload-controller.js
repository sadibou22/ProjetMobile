
var http = require('http');
var express = require('express'),
fs = require('fs');
var csv=require('csv2json-convertor');//importing csv2json-
var serviceConsultant = require('../Models/Consultant-Model.js');
var mongoose = require('mongoose');


//get un consultant by id
exports.getConsultant = function(id, callback) {
    serviceConsultant.ConsultantModel.findById(id, function(err, consultant){
		if(err) {
			console.log(err);
		} else if(consultant == null) {
			console.log('Désolé, consultant inexistant');
			callback.json(consultant);		
		} else{callback.json(consultant); }
	});
    console.log('test jai trouv� un consultant avec son id');
};

//get tous les consultants
exports.getAllConsultants = function(req, res) {
    serviceConsultant.ConsultantModel.find(null)
	.exec(function(error, consultants){
		if(error) {
			res.send('error');
			console.log(error);
		} else {
			res.json(consultants);
		}
	});
    console.log('test Tous les consultants');
};

//test upload
exports.upload = function(FileName){
	var data1=csv.csvtojson(FileName); //csvtojson is function that accepts csv filenames and returns JSON object
	console.log(data1);
	//save data in mongo
   	saveInMongo(data1);
	//ensuite delete le file pour ne pas encombré a activer apres
	fs.unlink(FileName, function(err) {
		if (err) {
		return console.error(err);
		}
		console.log("File deleted successfully!");
	});
	
}

//methode pour sauvegarder dans mongodb a optimiser after 
var saveInMongo = function (data){ 
    for (var i=0; i< data.length; i++){
		findConsultant(data, i);
	}   
}
//fonction qui teste si consultant existe le save ou le update
var findConsultant = function(data,j){
	
	var c = new serviceConsultant.ConsultantModel({
		
		_id :  data[j].EmpId,
		Prenom : data[j].Prenom,
		Nom : data[j].Nom,
		Competences: [data[j].Competences],
		Projets : [data[j].Projet]
	});
	//c.Competences.push(data[j].Competences);
	//c.Projets.push(data[j].Projet);
	
	serviceConsultant.ConsultantModel.findById(data[j].EmpId, function(err, consultant){
		if(err) {
			console.log(err);
		} else if(consultant == null) {
			console.log('Désolé, consultant inexistant donc save like insert');
			c.save(function (err) {
			if(err) {console.log(err);throw err;}
			console.log('saved!!!! yeah');
			});
		} else{
			console.log('yes, consultant existe donc save like update');
		 	c.update({
		
				//_id :  data[j].EmpId,
				Prenom : data[j].Prenom,
				Nom : data[j].Nom,
				Competences: [data[j].Competences],
				Projets : [data[j].Projet]
				},function (err) {
					if(err) {console.log(err);throw err;}
					console.log('saved!!!! yeah');
			}); 
		}
	});
	
}