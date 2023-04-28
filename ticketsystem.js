const { MongoClient, ObjectId } = require("mongodb");
const xml2js = require('xml2js');

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
app.use(express.json());
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


// Update a ticket in the database
app.put('/rest/ticket/:theId', function(req, res) {
  const client = new MongoClient(uri);
  const searchKey = { _id: new ObjectId(req.params.theId) };
  console.log("Updating: " + searchKey);

  async function run() {
    try {
      const database = client.db('Cluster0');
      const parts = database.collection('MyDB');

      // Extract the fields to update from the request body
      const {
        updated_at,
        type,
        subject,
        description,
        priority,
        status,
        recipient,
        submitter,
        assignee_id,
      } = req.body;

      // Set the fields to update
      const updateFields = {};
      if (updated_at) updateFields.updated_at = updated_at;
      if (type) updateFields.type = type;
      if (subject) updateFields.subject = subject;
      if (description) updateFields.description = description;
      if (priority) updateFields.priority = priority;
      if (status) updateFields.status = status;
      if (recipient) updateFields.recipient = recipient;
      if (submitter) updateFields.submitter = submitter;
      if (assignee_id) updateFields.assignee_id = assignee_id;

      // Update the document with the specified fields
      const result = await parts.updateOne(searchKey, { $set: updateFields });
      console.log(result);
      res.send('Updated ' + result.modifiedCount + ' document(s)');

    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});


//List all tickets in database
app.get('/rest/list/', function(req, res) {
  const client = new MongoClient(uri);

  async function run() {
    try {
      const database = client.db('Cluster0');
      const parts = database.collection('MyDB');
      const cursor = parts.find({});
      res.send(await cursor.toArray());
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

//Gets a specific ticket from the database
app.get('/rest/ticket/:theId', function(req, res) {
const client = new MongoClient(uri);
const searchKey = {_id: new ObjectId(req.params.theId)};
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
    const query = { _id: new ObjectId(req.params.theId) };
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


//Create a new ticket in the database
app.post('/rest/ticket/', function(req, res) {
  // Create a new MongoClient instance and connect to the MongoDB cluster
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
async function run() {
    try {
      const database = client.db('Cluster0');
      const collection = database.collection('MyDB');

      // Extract the fields from the request body
      const {
        created_at,
        updated_at,
        type,
        subject,
        description,
        priority,
        status,
        recipient,
        submitter,
        assignee_id,
      } = req.body;

      // Insert a new document with the specified fields
      const result = await collection.insertOne({
        _id: new ObjectId(),
        created_at,
        updated_at,
        type,
        subject,
        description,
        priority,
        status,
        recipient,
        submitter,
        assignee_id,
      });

      // Return the newly created document
      const newDocument = await collection.findOne({_id: result.insertedId});
      res.json(newDocument);

    } finally {
      await client.close();
 }
}
run().catch(console.dir);
});


//Delete a ticket from the database
app.delete('/rest/ticket/:theId', function(req, res) {
  const client = new MongoClient(uri);
  const searchKey = {_id: new ObjectId(req.params.theId)};
  console.log("Deleting: " + searchKey);

  async function run() {
    try {
      const database = client.db('Cluster0');
      const parts = database.collection('MyDB');

      const query = { _id: new ObjectId(req.params.theId) };
      const result = await parts.deleteOne(query);
      console.log(result);
      res.send('Deleted ' + result.deletedCount + ' document(s)'); 

    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});


// Default route - display form
app.get('/create-ticket', function(req, res) {
  res.send(`
    <form action="/rest/ticket" method="POST">
      <label for="type">Type:</label>
      <input type="text" id="type" name="type" required><br>
      <label for="subject">Subject:</label>
      <input type="text" id="subject" name="subject" required><br>
      <label for="description">Description:</label>
      <textarea id="description" name="description" required></textarea><br>
      <label for="priority">Priority:</label>
      <select id="priority" name="priority" required>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select><br>
      <label for="status">Status:</label>
      <select id="status" name="status" required>
        <option value="open">Open</option>
        <option value="in progress">In Progress</option>
        <option value="closed">Closed</option>
      </select><br>
      <label for="recipient">Recipient:</label>
      <input type="text" id="recipient" name="recipient" required><br>
      <label for="submitter">Submitter:</label>
      <input type="text" id="submitter" name="submitter" required><br>
      <label for="assignee_id">Assignee ID:</label>
      <input type="text" id="assignee_id" name="assignee_id"><br>
      <input type="hidden" id="created_at" name="created_at" value="${new Date().toISOString()}">
      <button type="submit">Submit</button>
    </form>
  `);
});

// Endpoint to get a single ticket returned as an XML document
app.get('/rest/xml/ticket/:theId', function(req, res) {
  const client = new MongoClient(uri);
  const searchKey = { _id: new ObjectId(req.params.theId) };
  console.log("Looking for: " + searchKey);

  async function run() {
    try {
      const database = client.db('Cluster0');
      const parts = database.collection('MyDB');

      // Use the existing /rest/ticket/:theId endpoint to get the ticket information
      const response = await parts.findOne(searchKey);
      
      // Convert the JSON response to an XML document
      const builder = new xml2js.Builder({rootName: 'ticket'});
      const xml = builder.buildObject(response);

      // Send the XML document as the response
      res.type('application/xml').send(xml);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

//Endpoint to update a ticket using XML
app.put('/rest/ticket/:theId', function(req, res) {
  const client = new MongoClient(uri);
  const searchKey = { _id: new ObjectId(req.params.theId) };
  console.log("Updating: " + searchKey);

  async function run() {
    try {
      const database = client.db('Cluster0');
      const parts = database.collection('MyDB');

      // Convert XML request body to JSON
      const xml = req.body;
      const parser = new xml2js.Parser({ explicitArray: false });
      const json = await parser.parseStringPromise(xml);

      // Extract the fields to update from the parsed JSON
      const {
        updated_at,
        type,
        subject,
        description,
        priority,
        status,
        recipient,
        submitter,
        assignee_id,
      } = json;

      // Set the fields to update
      const updateFields = {};
      if (updated_at) updateFields.updated_at = updated_at;
      if (type) updateFields.type = type;
      if (subject) updateFields.subject = subject;
      if (description) updateFields.description = description;
      if (priority) updateFields.priority = priority;
      if (status) updateFields.status = status;
      if (recipient) updateFields.recipient = recipient;
      if (submitter) updateFields.submitter = submitter;
      if (assignee_id) updateFields.assignee_id = assignee_id;

      // Update the document with the specified fields
      const result = await parts.updateOne(searchKey, { $set: updateFields });
      console.log(result);
      res.send('Updated ' + result.modifiedCount + ' document(s)');

    } catch (err) {
      console.error(err);
      res.status(400).send('Bad Request');
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});
