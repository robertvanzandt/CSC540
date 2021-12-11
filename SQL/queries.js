const mysql = require('mysql');
const connectionObj = require('./connectionObject.js');
const processResponse = require('../Utils/processResponse.js');

exports.login = function(response, queryObj)
{
	let connection_pool = mysql.createPool(connectionObj.getConnectionObject());
    connection_pool.query(`SELECT passHash, userID FROM login WHERE email='${queryObj.email}';`,
    function (error, results, fields) 
    {
        if (error)
            console.log(error);
        else
        {   
            if(queryObj.passHash == results[0].passHash)
            {
                processResponse.sendResponseToClient(response, 200, results[0].userID, "text/plain");
            }
            else
            {
                processResponse.sendResponseToClient(response, 200, "Passwords do not match, please try again.", "text/plain");

            }
        }
        connection_pool.end();
    });
}

exports.getProgramNames = function(response, queryObj)
{
    
    let connection_pool = mysql.createPool(connectionObj.getConnectionObject());            
    connection_pool.query(`SELECT programName FROM program;`,
    function (error, select_results, fields) 
    {
        if (error)
            console.log(error);
        else
        {
            processResponse.sendResponseToClient(response, 200, JSON.stringify(select_results), "application/json");
        }
        connection_pool.end();
    });
    
}

exports.getSemesterIDs = function(response, queryObj)
{
    
    let connection_pool = mysql.createPool(connectionObj.getConnectionObject());            
    connection_pool.query(`SELECT * FROM semester;`,
    function (error, select_results, fields) 
    {
        if (error)
            console.log(error);
        else
        {
            processResponse.sendResponseToClient(response, 200, JSON.stringify(select_results), "application/json");
        }
        connection_pool.end();
    });
    
}

exports.createAccount = function(response, queryObj)
{
	let connection_pool = mysql.createPool(connectionObj.getConnectionObject());
    connection_pool.query(`INSERT INTO student (studentID, fname, lname, email, programName) VALUES ('${queryObj.studentID}','${queryObj.fname}','${queryObj.lname}','${queryObj.email}','${queryObj.programName}');`,
    function (error, insert_results_student, fields) 
    {
        if (error)
            console.log(error);
        else
        {            
            connection_pool.query(`INSERT INTO login (email, passHash, userID) VALUES ('${queryObj.email}','${queryObj.password}','${queryObj.studentID}');`,
            function (error, insert_results_login, fields) 
            {
                if (error)
                    console.log(error);
                else
                {
                    processResponse.sendResponseToClient(response, 200, "Account Created!", "text/plain");
                }
                connection_pool.end();
            });
        }
    });
}

exports.getStudentInfo = function(response, queryObj)
{
    if (queryObj.studentID != "undefined")
    {
        let connection_pool = mysql.createPool(connectionObj.getConnectionObject());
        connection_pool.query(`SELECT fname FROM student WHERE studentID='${queryObj.studentID}';`,
        function (error, results, fields) 
        {
            if (error)
                console.log(error);
            else
            {
                processResponse.sendResponseToClient(response, 200, results[0].fname, "text/plain");
            }
            connection_pool.end();
        });
    }
}

exports.enterCourseHistory = function(response, queryObj)
{
    let connection_pool = mysql.createPool(connectionObj.getConnectionObject());
    connection_pool.query(`INSERT INTO course_history (subject, courseNum, grade, studentID) VALUES ('${queryObj.subject}','${queryObj.courseNum}','${queryObj.grade}','${queryObj.studentID}');`,
    function (error, insert_results_course_history, fields) 
    {
        if (error)
            console.log(error);
        else
        {            
            connection_pool.query(`SELECT * FROM course_history WHERE studentID='${queryObj.studentID}';`,
            function (error, select_results, fields) 
            {
                if (error)
                    console.log(error);
                else
                {
                    processResponse.sendResponseToClient(response, 200, JSON.stringify(select_results), "application/json");
                }
                connection_pool.end();
            });
        }
    });
}

exports.showCourseHistory = function(response, queryObj)
{
    let connection_pool = mysql.createPool(connectionObj.getConnectionObject());            
    connection_pool.query(`SELECT * FROM course_history WHERE studentID='${queryObj.studentID}';`,
    function (error, select_results, fields) 
    {
        if (error)
            console.log(error);
        else
        {
            processResponse.sendResponseToClient(response, 200, JSON.stringify(select_results), "application/json");
        }
        connection_pool.end();
    });
        
}

exports.generateSchedule = function(response, queryObj)
{
    var queryGetCoursesOfferedBySemester = "SELECT * FROM(" + 
    "SELECT * FROM(" +
    "SELECT * FROM(" + // outer SELECT of coursesOffered base query (returns all courses)
    "SELECT crn, subj, courseNum, title, credits, instructorName, " + // Remove duplicate attributes using projection
            "d1, d2, d3, st, et, loc, " +
            "dayOne AS d1H, dayTwo AS d2H, dayThree AS d3H, " + 
            "startTime AS stH, endTime AS etH, classLocation AS locH, semesterID " + 
            "FROM(" +
                "SELECT * FROM(" +
                    "SELECT * FROM(" +
                        "SELECT crn, subj, courseNum, title, credits, instructorName, " + // Remove duplicate attributes using projection
                            "dayOne AS d1, dayTwo AS d2, dayThree AS d3, " +
                            "startTime AS st, endTime AS et, classLocation AS loc, " +
                            "dayIdHybrid, timeIdHybrid, locationIdHybrid, semesterID " +
                            "FROM(" +
                                "SELECT * FROM(" +
                                    "SELECT * FROM(" +
                                        "SELECT * FROM(" +
                                            "SELECT * FROM(" +
                                                "SELECT * FROM courses_offered " + // Start of coursesOffered base query (returns all courses)
                                                    "NATURAL JOIN course) AS hasCourses " + // Get courses
                                                        "NATURAL JOIN instructor) AS hasInstructor " + // Get Instructor
                                                            "NATURAL JOIN days) AS hasDays " + // Get Days
                                                                "NATURAL JOIN class_time) AS hasTime " + // Get times
                                                                    "NATURAL JOIN location) AS hasLocation) AS needsHybridVals " + // Get all hybrid IDs
                                                                        "JOIN days ON needsHybridVals.dayIDHybrid = days.dayID) AS hasHybridDays " + // Get hybrid days
                                                                            "JOIN class_time ON hasHybridDays.timeIdHybrid = class_time.timeID) AS hasHybridTimes " + // Get hybrid times
                                                                                "JOIN location ON hasHybridTimes.locationIdHybrid = location.locationID) AS coursesOffered " + 
                                                                                // End of coursesOffered base query
                                                                                    
                                                                                    // Start Student Queries
                                                                                    // Get courses by:
                                                                                    //      1. Semester
                                                                                    //      2. Student program
                                                                                    //      3. Student course history
                                                                                    //      4. Preference: number of courses
                                                                                    `WHERE courseNum IN (SELECT courseNum FROM program_reqs WHERE programName=(SELECT programName 
                                                                                        FROM student WHERE studentID='${queryObj.studentID}') OR programName="Breadth")) AS inProgram
                                                                                            WHERE courseNum NOT IN (SELECT courseNum FROM course_history WHERE studentID='${queryObj.studentID}')) AS notTaken
                                                                                                WHERE semesterID='${queryObj.semesterID}' ORDER BY RAND() LIMIT ${queryObj.numOfCourses};`;


    let connection_pool = mysql.createPool(connectionObj.getConnectionObject());            
    connection_pool.query(queryGetCoursesOfferedBySemester,
    function (error, select_results_courses_offered, fields) 
    {
        if (error)
            console.log(error);
        else
        {
            processResponse.sendResponseToClient(response, 200, JSON.stringify(select_results_courses_offered), "application/json");
        }
        connection_pool.end();
    });   
}


