var express = require('express');
var router = express.Router();
var request = require('request');
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var dbUrl = 'mongodb://localhost:27017/pokemon';

var collection

MongoClient.connect(dbUrl, function (err, db) {
	if (err) {
	  console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
	  console.log('Connection established to', dbUrl);

	  collection = db.collection('tracker');

	  collection.insert(tracker, function (err, result) {
	    if (err) {
		console.log(err);
	    } else {
		console.log('Inserted documents into the "tracker" collection. The documents inserted with "_id" are:', result.length, result);
	   }
	});
	}
});
	
/* GET home page. */
router.get('/tracker', function(req, res) {
	console.log("In Tracker");
	collection.find().toArray(function(err, result) {
		if(err) {
		  console.log(err);
		} else if(result.length) {
		  console.log("Query worked");
		  console.log(result);
		  res.send(result);
		} else {
		  console.log("No Documents found");
		}
	});
});

router.get('/tracker', function(req, res) {
	console.log("In Tracker Get");
	res.send(tracker);
	});

router.post('/tracker', function(req, res) {
	console.log("In Tracker Post");
	console.log(req.body);
	collection.insert(req.body, function(err, result) {
		if (err) {
		  console.log(err);
		} else {
		  console.log('Inserted documents into the "tracker" collection. The documents inserted with "_id" are:', result.length, result);
		  res.end('{"csuccess" : "Updated Successfully", "status" : 200}');
		}
	});
});

module.exports = router;

var tracker = [
	{
	  name: 'Ersebet Szabo',
	  Birthplace: 'Borsod, Szendro Hungary'
	}
];

