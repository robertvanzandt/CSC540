const fs = require('fs');
const utils = require('./processResponse.js');

// Utility function for serving static HTML files
exports.serveHTML = function(response, pathToFile)
{
    fs.readFile(pathToFile, 
        function(err, data) 
        {
            if (err) 
            {
                utils.sendResponseToClient(response, 404, "File not found!", "text/plain");
            }
            else 
            {
                utils.sendResponseToClient(response, 200, data, "text/html");
            }
        }
    );
}