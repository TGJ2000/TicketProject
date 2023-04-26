# Ticket Project
CMPS 415 - Enterprise Systems Ticket System Project

# Routes:
Post <br/>
/rest/ticket/	//Create a new ticket in the database

<b>Get<b/> <br/>
/ 		//default route <br/>
/say/:name 	//Checks if app is running <br/>
/rest/list/ 		//List all tickets in database <br/>
/rest/ticket/:theId	//Gets a specific ticket from the database <br/>
/create-ticket 	//Displays ticket creation form<br/>
/rest/xml/ticket/:theId	//Gets a single ticket as an XML document<br/>

<b>Put<b/><br/>
/rest/ticket/:theId	//Updates a ticket in the database<br/>
/rest/xml/ticket/:theId //Adds a ticket that was sent as an XML document<br/>

<b>Delete<b/><br/>
/rest/ticket/:theId	//Delete a ticket from the database<br/>
