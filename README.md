# Ticket Project
CMPS 415 - Enterprise Systems Ticket System Project

# Routes:
Post <br/>
/rest/ticket/	//Creates a new ticket in the database

<b>Get<b/> <br/>
/rest/list/ 		//Lists all tickets in the database <br/>
/rest/ticket/:theId	//Gets a specific ticket from the database <br/>
/create-ticket 	//Displays the ticket creation form<br/>
/rest/xml/ticket/:theId	//Gets a single ticket as an XML document<br/>

<b>Put<b/><br/>
/rest/ticket/:theId	//Updates a ticket in the database<br/>
/rest/xml/ticket/:theId //Updates a ticket by converting an xml body to json. <i>Was unable to be correctly implemented</i><br/>

<b>Delete<b/><br/>
/rest/ticket/:theId	//Deletes a ticket from the database<br/>
