// Create a connection object with 
// server credentials and DB name.
const connectionObj = {
    host : 'localhost',
    user : 'Team1User',
    password : 'Team1User!Pass',
    database : 'mySeamlessSchedule',
    connectionLimit : 10
};

exports.getConnectionObject = function () 
{
    return connectionObj;
}