'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
const cors = require('cors');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ "strict" : false }));
app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('UFO Tofu\n');
});

const booths = [
	{
		id: 1,
		name: 'Clark Kent',
		available: true,
	},{
    		id: 2,
    		name: 'Invisible Jet',
    		available: true,
    	}
];

// api
app.get('/api/booths', (req, res) => {
	res.send(booths);
});


app.get('/api/slack/booths', (req, res) => {
	console.log(req.query);
  	console.log('Entrando a Slack GET');

  	const { token, text, trigger_id } = req.query;
  	console.log(text);
  	const boothsFormat = booths.map(b => {
		console.log(b);
		return {
   			title: b.name,
   			color: b.available ? '00F100' : 'DD2222'
		};
	});

  	boothsFormat.push({
   		title: 'Show map',
   		title_link: 'http://booth-te.1keyes.com:8601'
   	});

	console.log(boothsFormat);

  	res.status(200).json({
   		response_type: 'ephemeral',
   		attachments: boothsFormat
  	});
});

// api
app.get('/api/booths/:id', (req, res) => {
  const id=parseInt(req.params.id);
  const requestedBooth = booths.find(b=>b.id===id);
  res.send(requestedBooth);
});

app.put('/api/booths/:id/available', (req, res) => {
	console.log("put available requested");
  const id=parseInt(req.params.id);
console.log("req.body", req.body);
	console.log("id", id);
  const availability = Boolean(req.body);

	console.log("availability", availability);
  const booth = booths.find(b=>b.id===id);
  if ( booth ) {
    	booth.available = availability;
    	res.send(booth)
  } else {
    	res.send('404');
  }
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
