const http = require('http');
const url = require('url');
const queries = require('../SQL/queries.js');
const fileServer = require('../Utils/fileServer.js');

// Process request from web client
function processClientRequest(request, response) 
{ 
    // request: an object to recieve data from the client
    // response: an object to send data to the client

    //console.log('Processing client request...'); // Debug

    // request.url: holds the url string sent by client
    const requestURL = request.url;
    const path = url.parse(requestURL).pathname;

    // queryObj: holds the query contained in the URL
    const queryObj = url.parse(requestURL,"true").query;

    //console.log("request.url: " + requestURL); // Debug
    //console.log("ru.pathname: " + path); // Debug
    
    switch (path) 
    {
        case "/Login" :
            queries.login(response, queryObj);
            break;
        case "/ListPrograms" :
            queries.getProgramNames(response, queryObj);
            break;
        case "/ListSemesterIDs" :
            queries.getSemesterIDs(response, queryObj);
            break;
        case "/CreateAccount" :
            queries.createAccount(response, queryObj);
            break;
        case "/StudentName" :
            queries.getStudentInfo(response, queryObj);
            break;
        case "/EnterCourseHistory" :
            queries.enterCourseHistory(response, queryObj);
            break;
        case "/ShowCourseHistory" :
            queries.showCourseHistory(response, queryObj);
            break;   
        case "/GenerateSchedule" :
            queries.generateSchedule(response, queryObj);
            break;                
        case "/" :
            fileServer.serveHTML(response, "client/index.html");
        default:
            fileServer.serveHTML(response, "client" + path);
    }
}

// Initialize http server
const server = http.createServer(processClientRequest);

// Start server on port 8123
exports.startServer = function ()
{   
    const serverPort=8123;
    server.listen(serverPort, 
        function() 
        {
            console.log('Server listening on port 8123...');
        }
    )
};