USE mySeamlessSchedule;

SELECT * FROM advisor;
SELECT * FROM program;
SELECT * FROM program_reqs;
SELECT * FROM semester;
SELECT * FROM courses_offered;
SELECT * FROM student;
SELECT * FROM course_history;
SELECT * FROM availability;
SELECT * FROM schedule;
SELECT * FROM login;
SELECT * FROM course;
SELECT * FROM instructor;
SELECT * FROM days;
SELECT * FROM class_time;
SELECT * FROM location;
SELECT * FROM semester;
SELECT * FROM courses_offered;
SELECT * FROM time_blocks;

SELECT * FROM(
    SELECT crn, subj, courseNum, title, credits, instructorName,
            d1, d2, d3, st, et, loc,
            dayOne AS d1H, dayTwo AS d2H, dayThree AS d3H,
            startTime AS stH, endTime AS etH, classLocation AS locH, semesterID
            FROM(
                SELECT * FROM(
                    SELECT * FROM(
                        SELECT crn, subj, courseNum, title, credits, instructorName, 
                            dayOne AS d1, dayTwo AS d2, dayThree AS d3, 
                            startTime AS st, endTime AS et, classLocation AS loc, 
                            dayIdHybrid, timeIdHybrid, locationIdHybrid, semesterID
                            FROM(
                                SELECT * FROM(
                                    SELECT * FROM(
                                        SELECT * FROM(
                                            SELECT * FROM(
                                                SELECT * FROM courses_offered
                                                    NATURAL JOIN course) AS hasCourses 
                                                        NATURAL JOIN instructor) AS hasInstructor 
                                                            NATURAL JOIN days) AS hasDays 
                                                                 NATURAL JOIN class_time) AS hasTime
                                                                    NATURAL JOIN location) AS hasLocation) AS needsHybridVals
                                                                        JOIN days ON needsHybridVals.dayIDHybrid = days.dayID) AS hasHybridDays 
                                                                            JOIN class_time ON hasHybridDays.timeIdHybrid = class_time.timeID) AS hasHybridTimes 
                                                                                JOIN location ON hasHybridTimes.locationIdHybrid = location.locationID) AS coursesOffered;


