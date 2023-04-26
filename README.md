# Ticket Project
CMPS 415 - Enterprise Systems Ticket System Project

#Routes:
Post
/rest/ticket/	//Create a new ticket in the database

Get
/ 		//default route
/say/:name 	//Checks if app is running
/rest/list/ 		//List all tickets in database
/rest/ticket/:theId	//Gets a specific ticket from the database
/create-ticket 	//Displays ticket creation form
/rest/xml/ticket/:theId	//Gets a single ticket as an XML document

Put
/rest/ticket/:theId	//Updates a ticket in the database
/rest/xml/ticket/:theId //Adds a ticket that was sent as an XML document

Delete
/rest/ticket/:theId	//Delete a ticket from the database
