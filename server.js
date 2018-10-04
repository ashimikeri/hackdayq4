'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Constants
const PORT = 9090;
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

app.post('/devicelayer', (req, res) => {
  res.send('Working\n');
});

// app.listen(PORT, HOST);

// console.log(`Running on http://${HOST}:${PORT}`);
function resp_constructor (cve_data) 
{
  var cve_input = "["
  for (var i=0;i<cve_data.length;i++)
{
   cve_input += '{"id" : '+cve_data[i][0]+', "rating" : '+cve_data[i][1]+', "summary" : '+cve_data[i][2]+'},';
}
  var regex = /},$/g;
  cve_input.replace(regex, '}');
  cve_input += ']';
  return JSON.parse(cve_input) ;
}

     
