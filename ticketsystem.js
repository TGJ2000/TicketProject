const { MongoClient } = require("mongodb");

// The uri string must be the connection string for the database (obtained on Atlas).
// From MongoDB Database Page --> Connect --> Connect your application --> Copy the connection string
// Change <password> to the password that you set for your user
// Make sure that under "Network Access", the database is accessible from anywhere (for class).
const uri = "mongodb+srv://joelwhite:ypZgVswk8mhdKbmk@cluster0.a5otfso.mongodb.net/?retryWrites=true&w=majority";

// This is the standard stuff to get it to work on the browser
// When using render, use the blue link at the top of your web-service page. Ex. https://mongorender-t4qw.onrender.com
// Remember to suspend your web service when you aren't using it
const express = require('express');
const app = express();
const port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes will go here

// Default route:
app.get('/', function(req, res) {
  const myquery = req.query;
  var outstring = 'Starting... ';
  res.send(outstring);
});

// can help test if the app is running
app.get('/say/:name', function(req, res) {
  res.send('Hello ' + req.params.name + '!');
});

app.get('/rest/ticket/', function(req, res) {
const client = new MongoClient(uri);
const searchKey = "{id: '" + req.params.theId + "' }";
console.log("Looking for: " + searchKey);

async function run() {
  try {
    // From MongoDB Database Page --> Browse Collections --> Collections tab
    // client.db has the database.collection underneath it (in green font).
    // Make sure the client.db name is the same as your project's database name
    const database = client.db('Cluster0');
    const tickets = database.collection('MyDB');

    //We will use the parameter provided with the route
    const query = {id: req.params.theId };

    const ticket = await tickets.findOne(query);
    console.log(ticket);
    res.send('Found this: ' + JSON.stringify(ticket));  //Use stringify to print a json

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
});

app.get('/rest/ticket/:theId', function(req, res) {
const client = new MongoClient(uri);
const searchKey = "{id: '" + req.params.theId + "' }";
console.log("Looking for: " + searchKey);

async function run() {
  try {
    // From MongoDB Database Page --> Browse Collections --> Collections tab
    // client.db has the database.collection underneath it (in green font).
    // Make sure the client.db name is the same as your project's database name
    const database = client.db('Cluster0');
    const tickets = database.collection('MyDB');

    //We will use the parameter provided with the route
    const query = {id: req.params.theId };

    const ticket = await tickets.findOne(query);
    console.log(ticket);
    res.send('Found this: ' + JSON.stringify(ticket));  //Use stringify to print a json

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
});




// Route to access database
// This is used to display an item with a provided part number.
// Ex. https://mongorender-t4qw.onrender.com/api/mongo/12345
app.get('/api/mongo/:item', function(req, res) {
const client = new MongoClient(uri);
const searchKey = "{ partID: '" + req.params.item + "' }";
console.log("Looking for: " + searchKey);

async function run() {
  try {
    // From MongoDB Database Page --> Browse Collections --> Collections tab
    // client.db has the database.collection underneath it (in green font).
    // Make sure the client.db name is the same as your project's database name
    const database = client.db('Cluster0');
    const parts = database.collection('MyDB');

    // Hardwired Query for a part that has partID '12345'
    // const query = { partID: '12345' };
    // But we will use the parameter provided with the route
    const query = { partID: req.params.item };

    const part = await parts.findOne(query);
    console.log(part);
    res.send('Found this: ' + JSON.stringify(part));  //Use stringify to print a json

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
});
