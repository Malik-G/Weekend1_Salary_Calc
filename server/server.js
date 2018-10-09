// Require express - gives us a function
const express = require('express');

// Create an instance of express by calling the function returned above - gives us an object
const app = express();

// express static file serving - public is the folder name
app.use(express.static('server/public'));

// Create port number and start up our server
const port = 5000;
app.listen(port, function(){
  console.log('listening on port', port);
});