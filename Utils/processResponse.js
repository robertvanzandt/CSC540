// Utility funciton for sending a resonse to the client
exports.sendResponseToClient = function(response, status, responseContent, contentType) 
{
    response.writeHead(status, { "Content-Type" : contentType });
    response.write(responseContent);
    response.end();
}