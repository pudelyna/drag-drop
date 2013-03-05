Drag and Drop JavaScript Application
================================

*Authors*: Andreea Miruna Sandru  
*Contact*: pudelyna@yahoo.com  
*Source code*: https://github.com/pudelyna/drag-drop  
*Version*: 1.0  
*System requirements*: JRE6/JDK6 or later, Apache Tomcat 7  
*Tested on*: Internet Explorer 8, Mozilla Firefox 19.0, Google Chrome 25.0.1364.97  

Description
-------------------------

This is a JavaScript application allowing drag & drop of a DOM object (image) from one browser document into another (from one iframe to another).  
Multiple objects can be dragged & dropped at once by selecting them using CTRL and clicking them. Upon drop, a post request (to a static json file) is sent, then both the value of the objects' Ids as well as a status message from the server response displayed in console log message.  
The HTML footprint is minimized to a single script tag, and the DOM is only be manipulated using JavaScript. Cross-browser compatibility is supported (eg. IE, Mozilla Firefox, Google Chrome).

Implementation
-------------------------  
For implementing this JS Application I used JQuery library (v1.9.1) in order to manage cross browser compatibility and DOM manipulation (selectors, attribute setting, event binding).
In principle, the main page (index.html) is splitted in three areas:
* source iframe from where the user can start dragging the objects (images)
* target iframe where user cand drop the dragged objects
* console area for application logging  

In order to implement the drag&drop functionality, I manipulated the following DOM events:
*  **dragstart** on the images - fired when the user starts dragging an object, sets the ids of dragged objects as a property on current event  
*  **click** on the images - in order to determine if the CTRL key is pressed for multiselection  
*  **dragover** on the target div - needs to be suppressed in order to capture the drop event  
* **drop** on the target div - fired when user is dropping the images, retrives the ids of dragged objects from original event and send an ajax request with those ids to the server  

Installation 
-------------------------
================= Run application without a server =================  
1. 	Download the DragAndDrop.zip archive  
2. 	Unpack the .zip file into a local directory  
3. 	Open the index.html file in your local browser  
4. 	Enjoy!  

================= Run application on a server =================  
1. 	Download and Install a Java SE Runtime Environment (JRE)  
2. 	Download and install an Application Server (eg. [Apache Tomcat](http://tomcat.apache.org/))  
3. 	Download the DragAndDrop.zip archive  
4. 	Unpack the .zip file into the working application directory of the server installed  
5. 	Start the application server  
6. 	Access the application in the browser using http://localhost:8080/DragAndDrop/  
7.	Enjoy!  

Files list
-------------------------
<pre>
DragAndDrop
	||
	||
	  css
	  ||
		drag&drop.css
	||
	||
	  html
	  ||
		draggSourceFrame.html
	  ||
		dropTargetFrame.html
	||
	||
	  images
	  ||
		computer.png
	  ||
		folder.png
	  ||
		pencil.png
	  ||
		zoom.png
	||
	||
	  scripts
	  ||
	    lib
		||
		  jquery-1.9.1.min.js
	  ||
		drag&drop.js
	  ||
		response.json
	||
	||
	  WEB-INF
	  ||
		web.xml
	||
	||
	  index.html
</pre>
	  
Known bugs
-------------------------

1. On Google Chrome when accessing the application without a server, a security problem appears due to the fact that iframe tries to access the parent window from JavaScript.  
 *Eg.: Unsafe JavaScript attempt to access frame with URL file:///... from frame with URL file:///... Domains, protocols and ports must match.*  
This problem dissapears if the application is run from an application server.

Other
-------------------------

Versions of software the application uses:  
-jQuery 1.9.1 

The license is public domain. 

