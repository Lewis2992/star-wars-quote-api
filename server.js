//mongoDB Atlas credentials
//saintjhn
//not_a_cult

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
const PORT = 3000;

const connectionString = 'mongodb+srv://saintjhn:not_a_cult@cluster0.6a9eq85.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, (err, client) => {	//connect to MongoDB Atlas database
	if (err) return console.error(err);
	
	//Changing database from default test to something else
	const db = client.db('star-wars');

	//Create a collection
	const quotesCollection = db.collection('quotes');

	//Enable EJS template engine
	app.set('set engine', 'ejs');

	//Tell Express to make the 'public' folder accessible to the public
	app.use(express.static('public'));

	//Enable Express to handle form input
	app.use(bodyParser.urlencoded({extended: true}));

	//Enable Express to accept JSON
	app.use(bodyParser.json());

	app.listen(PORT, function() {
		console.log('ran');
	});

	app.get('/', async (req, res) => {
		// res.sendFile(__dirname + '/index.html');
		
		const cursor = await quotesCollection.find().toArray();
		res.render('index.ejs', {quotes: cursor})
	});

	app.post('/quotes', async (req, res) => {
		//Add document (entry) to database
		const data = await quotesCollection.insertOne(req.body);
		console.log(data);

		res.redirect('/')

		// quotesCollection.insertOne(req.body)
		// 	.then(res => {
		// 		console.log(res);
		// 	})
		// 	.catch(err => {
		// 		console.error(err)
		// 	})

	});

	app.put('/quotes', async (req,res) => {
		const data = await quotesCollection.findOneAndUpdate(
			{name: 'Yoda'},
			{$set: {
				name: req.body.name,
				quote: req.body.quote
			}},
			{upsert: true}
		);

		return res.json('success');
	});

	app.delete('/quotes', async (req, res) => {
		const data = await quotesCollection.deleteOne(
			{name: req.body.name}
		)
		if (data.count === 0 ) return res.json('There are no Darth vader quotes')
		return res.json('Deleted Darth Vaders\'s quote')
	})
});

//Alternative way with promises
// MongoClient.connect(connectionString, {useUnifiedTopology: true})
// 	.then(client => {
// 		console.log('Connected to database');
// 	})
// 	.catch(err => {
// 		console.error(err)
// 	})

