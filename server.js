//mongoDB Atlas credentials
//saintjhn
//not_a_cult

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
const PORT = 3000;

const connectionString = 'mongodb+srv://saintjhn:not_a_cult@cluster0.6a9eq85.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, (err, client) => {
	if (err) return console.error(err);
	
	const db = client.db('star-wars');

	app.use(bodyParser.urlencoded({extended: true}))

	app.listen(PORT, function() {
		console.log('ran');
	});

	app.get('/', (req, res) => {
		res.sendFile(__dirname + '/index.html');
		// console.log(req);
	});

	app.post('/quotes', (req, res) => {
		// console.log(req.body);
	});
});

//Alternative way with promises
// MongoClient.connect(connectionString, {useUnifiedTopology: true})
// 	.then(client => {
// 		console.log('Connected to database');
// 	})
// 	.catch(err => {
// 		console.error(err)
// 	})

