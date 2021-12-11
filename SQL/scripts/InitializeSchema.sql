DROP DATABASE mySeamlessSchedule;
CREATE DATABASE mySeamlessSchedule;
USE mySeamlessSchedule;

CREATE TABLE advisor (
	advisorID VARCHAR(20) PRIMARY KEY,
    fname VARCHAR(50),
	lname VARCHAR(50),
	email VARCHAR(60)
);

CREATE TABLE program (
	programName VARCHAR(60) PRIMARY KEY,
	deptName VARCHAR(20),
	type VARCHAR(20)
);

CREATE TABLE program_reqs (
	subject CHAR(3),
	courseNum CHAR(3),
	courseName VARCHAR(50),
    passingCondition VARCHAR(2),
    reqType VARCHAR(13),
    programName VARCHAR(60),
    PRIMARY KEY (subject, courseNum, courseName, programName),
    FOREIGN KEY (programName) REFERENCES program(programName)
);

CREATE TABLE semester (
	semesterID INT PRIMARY KEY,
	term VARCHAR(6),
    year CHAR(4)
);

CREATE TABLE student (
	studentID VARCHAR(20) PRIMARY KEY,
    fname VARCHAR(50),
	lname VARCHAR(50),
	email VARCHAR(60),
    advisorID VARCHAR(20),
    semesterID INT,
    programName VARCHAR(60),
    FOREIGN KEY (advisorID) REFERENCES advisor(advisorID),
    FOREIGN KEY (semesterID) REFERENCES semester(semesterID),
    FOREIGN KEY (programName) REFERENCES program(programName)
);

CREATE TABLE course_history (
	subject CHAR(3),
	courseNum CHAR(3),
	grade VARCHAR(2),
    studentID VARCHAR(20),
    PRIMARY KEY (subject, courseNum),
    FOREIGN KEY (studentID) REFERENCES student(studentID)
);

CREATE TABLE availability (
	studentID VARCHAR(20),
	day VARCHAR(10),
	tod VARCHAR(5),
    PRIMARY KEY (studentID, day),
    FOREIGN KEY (studentID) REFERENCES student(studentID)
);

CREATE TABLE time_blocks (
	timeOfDay INT PRIMARY KEY,
	startTime VARCHAR(20),
	endTime VARCHAR(20)
);

CREATE TABLE schedule (
	scheduleID VARCHAR(30),
    crn CHAR(5),
	subject CHAR(3),
	courseNum CHAR(3),
	section CHAR(2),
    credits CHAR(5),
    title VARCHAR(50),
    days CHAR(1),
	time CHAR(15),
    cap VARCHAR(2),
    actual VARCHAR(2),
    remaining VARCHAR(2),
    instructor VARCHAR(50),
    dateStart DATE,
    dateEnd DATE,
    location CHAR(7),
    isApproved VARCHAR(5),
    advisorID VARCHAR(20),
    studentID VARCHAR(20),
    PRIMARY KEY (scheduleID, crn),
    FOREIGN KEY (advisorID) REFERENCES advisor(advisorID),
    FOREIGN KEY (studentID) REFERENCES student(studentID)
);

CREATE TABLE login (
	email VARCHAR(60) PRIMARY KEY,
	passHash VARCHAR(30),
    #expirationDate DATE,
    #isStudent VARCHAR(5),
    userID VARCHAR(20),
    FOREIGN KEY (userID) REFERENCES student(studentID)#,
    #FOREIGN KEY (userID) REFERENCES advisor(advisorID)
);

-- Setting Up Courses Offered from Banner Web

CREATE TABLE course (
	courseID INT PRIMARY KEY,
	subj CHAR (3),
	courseNum CHAR (3),
	title VARCHAR (50),
	credits CHAR (3)
);

CREATE TABLE instructor (
	instructorID INT PRIMARY KEY,
	instructorName VARCHAR(30)
);

CREATE TABLE days (
	dayID INT PRIMARY KEY,
	dayOne VARCHAR(3),
	dayTwo VARCHAR(3),
	dayThree VARCHAR(3)
);

CREATE TABLE class_time (
	timeID INT PRIMARY KEY,
	startTime VARCHAR(20),
	endTime VARCHAR(20)
);

CREATE TABLE location (
	locationID INT PRIMARY KEY,
	classLocation VARCHAR (12)
);

CREATE TABLE courses_offered (
	crn INT PRIMARY KEY,
	courseID INT,
	instructorID INT,
	dayID INT,
    dayIdHybrid INT,
	timeID INT,
    timeIdHybrid INT,
	locationID INT,
	locationIdHybrid INT,  
	remaining INT,
    semesterID INT,
    FOREIGN KEY (courseID) REFERENCES course(courseID),
	FOREIGN KEY (instructorID) REFERENCES instructor(instructorID),
	FOREIGN KEY (dayID) REFERENCES days(dayID),
    FOREIGN KEY (dayIDHybrid) REFERENCES days(dayID),
	FOREIGN KEY (timeID) REFERENCES class_time(timeID),
    FOREIGN KEY (timeIDHybrid) REFERENCES class_time(timeID),
	FOREIGN KEY (locationID) REFERENCES location(locationID),
    FOREIGN KEY (locationIdHybrid) REFERENCES location(locationID),
    FOREIGN KEY (semesterID) REFERENCES semester(semesterID)
);


