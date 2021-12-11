# MySeamlessSchedule

## About
This repository contains a schedule generator application built by team members and me as our final project in CSC 540.

## Development Environment Setup

1. Download and install an IDE or text editor. (VS code recommended: https://code.visualstudio.com/)
2. Download and install MySQL Server from: https://dev.mysql.com/downloads/installer/
3. Download and install Node.js from: https://nodejs.org/en/download/

## Installing My Seamless Schedule
1. Create a directory on your desktop entitled "MySeamlessSchedule"
2. Open a command prompt and CD into the "MySeamlessSchedule" directory
3. Run the following comand to clone this repo: "git clone https://github.com/EJBarbin/MySeamlessSchedule.git ."
4. Run the following command to ensure you are on the master branch: "git branch"
5. Run the following command to install the Node.js MySQL module: "npm install mysql"

## Launching My Seamless Schedule
1. From the same terminal, run the following command to start the server: "node app.js
   NOTE: You should see output stating: "Server listening on port 8123..."
2. Open a web browser and enter the following URL: "http://localhost:8123
   NOTE: This will take you to the My Seamless Schedule home page

## Initializing the database
1. Open SQL\connectionObject.js and take note of the test credentials
2. Open MySQL Workbench and setup a new connection using these credentials
3. Connect to the server through MySQL Workbench
4. In MySQL workbench, open the following .sql scripts from the SQL\scripts directory
   a. InitializeSchema.sql - this file is used to create the schema
   b. InsertStaticData.sql - this file is used to populate tables with static data
   c. SelectDataFromAllTables.sql - this file is used to verify static data is populated
5. Run InitializeSchema.sql and ensure there are no errors
6. Run InsertStaticData.sql and ensure there are no errors
7. Run SelectDataFromAllTables.sql and ensure there are no errors

## Testing application Functionality
1. Open the "TestUsers.txt" file located in the Test directory
2. Open the browser running My Seamless Schedule
   NOTE: Maximize the browser to ensure that input fields are fully visible.
3. Select "Create Account" from the menu bar at the top of the screen
4. Enter information for Test User 1 as shown in TestUsers.txt
5. Click "Submit"
   NOTE: This will take you to the profile page for Test User 1 (John's Profile)
6. Optionally enter course history as specified in TestUsers.txt
7. Click "Submit" if for each course entered.
5. Optionlly enter availability (this is not fully functional)
6. Select Semester "Spring 2022" from the "Please Select Semester" dropdown
   NOTE: Only Winter and Spring semesters are active
7. Select any number of courses for the semester from the "Please Select Number of Courses" dropdown
8. Click the "Generate Schedule" button to view potential schedules
   NOTE: this shows schedules based on course history entered by the user, the semester, and the number of courses selected
9. Click the Logout button from the menu bar (you will be taken back to the home page)
10. Click the login button in the upper right corner.
11. Login with test User 1 Email and password to see user 1 profile
    NOTE: Notice COurse History persists
12. Click the Logout button from the menu bar (you will be taken back to the home page)
13. Select "Create Account" from the menu bar at the top of the screen
14. Enter information for Test User 2 as shown in TestUsers.txt
15. Click "Submit"
   NOTE: This will take you to the profile page for Test User 2 (Bill's Profile)
16. Optionally enter course history as specified in TestUsers.txt
17. Click "Submit" for each course entered.
15. Optionlly enter availability (this is not fully functional)
16. Select Semester "Winter 2022" from the "Please Select Semester" dropdown
   NOTE: Only Winter and Spring semesters are active
17. Select any number of courses for the semester from the "Please Select Number of Courses" dropdown
   NOTE: Only three courses will show maximum because there are only 3 allocated ot the Winter 2022 semester for Bill's program
   NOTE: Entering course history as specified in TestUsers.txt will cause these not to show because Bill has already taken these courses.
18. Click the "Generate Schedule" button to view potential schedules
   NOTE: this shows schedules based on course history entered by the user, the semester, and the number of courses selected
   NOTE: This also shows the case of Hybrd courses displaying with different days, times, and locations.
19. Click the Logout button from the menu bar to navigate back to the home page.
   
   