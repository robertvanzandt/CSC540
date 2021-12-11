const urlPrefix="http://localhost:8123/";

showStudentName();
showCourseHistory();
listSemesters();

var courseHist = [];

document.getElementById("logout").addEventListener("click", logout);
document.getElementById("submitCourseHistory").addEventListener("click", enterCourseHistory);
document.getElementById("generateSchedule").addEventListener("click", generateStudentSchedule);

function showStudentName() 
{
    var studentID = document.cookie.split("=")[1];

    let AJAX = new XMLHttpRequest();
    AJAX.onload = function() 
    {
        if (this.status == 200)
        { 
            document.getElementById("studentProfileHeader").innerText=this.responseText + "'s Profile";
        }
        else
        {
            alert(this.responseText);
            
            console.log(this.status);
            console.log(this.responseText);
        }
    }
    AJAX.onerror = function() { alert("Network error"); }
    AJAX.open("GET", urlPrefix + "StudentName?studentID="+studentID);
    AJAX.send();

}

function enterCourseHistory()
{
    var subject = document.getElementById("subject").value;
    var courseNum = document.getElementById("courseNum").value;
    var grade = document.getElementById("grade").value;

    //alert(subject + " " + courseNum + " " + grade)

    var studentID = document.cookie.split("=")[1];

    let AJAX = new XMLHttpRequest();
    AJAX.onload = function() 
    {
        if (this.status == 200)
        { 
            //alert(this.responseText);

            showCourseHistory()
        }
        else
        {
            alert(this.responseText);
            
            console.log(this.status);
            console.log(this.responseText);
        }
    }
    AJAX.onerror = function() { alert("Network error"); }
    AJAX.open("GET", urlPrefix + `EnterCourseHistory?studentID=${studentID}&subject=${subject}&courseNum=${courseNum}&grade=${grade}`);
    AJAX.send();


    location.reload(); 

}

function showCourseHistory()
{
    //alert(subject + " " + courseNum + " " + grade)

    var studentID = document.cookie.split("=")[1];

    let AJAX = new XMLHttpRequest();
    AJAX.onload = function() 
    {
        if (this.status == 200)
        { 
            //alert(this.responseText);
            
            var history=""

            resObj=JSON.parse(this.responseText);
            
            for (let i=0; i<Object.keys(resObj).length; i++)
            {
                //alert(resObj[i].subject);

                history=history + resObj[i].subject + " "
                history=history + resObj[i].courseNum + " "
                history=history + resObj[i].grade + "\n"

                courseHist.push(resObj[i].courseNum);
            }

            document.getElementById("courseHistoryResults").innerText=history;
        }
        else
        {
            alert(this.responseText);
            
            console.log(this.status);
            console.log(this.responseText);
        }
    }
    AJAX.onerror = function() { alert("Network error"); }
    AJAX.open("GET", urlPrefix + `ShowCourseHistory?studentID=${studentID}`);
    AJAX.send();

}


function generateStudentSchedule()
{
    var table = document.getElementById("scheduleResults");
 

    for (let i=table.rows.length; i > 1; i--)
    {
        table.deleteRow(i-1);
    }

    //alert("Generate Student Schedule!");

    var studentID = document.cookie.split("=")[1];

    var semesterID = document.getElementById("semesterList").value;
    var numOfCourses = document.getElementById("numOfCourses").value;

    let AJAX = new XMLHttpRequest();
    AJAX.onload = function() 
    {
        if (this.status == 200)
        { 
            resObj=JSON.parse(this.responseText);
            
            for (let i=0; i<Object.keys(resObj).length; i++)
            {
                
                var row = table.insertRow(-1);

                var crn = row.insertCell(0);
                var subj = row.insertCell(1);
                var courseNum = row.insertCell(2);
                var title = row.insertCell(3);
                var credits = row.insertCell(4);
                var instructorName = row.insertCell(5);
                var days = row.insertCell(6);
                var startTime = row.insertCell(7);
                var endTime = row.insertCell(8);
                var location = row.insertCell(9);

                crn.innerText = resObj[i].crn;
                crn.style.width = "100px";
                crn.style.border = "thin solid #000000"; 

                subj.innerText = resObj[i].subj;
                subj.style.width = "100px";
                subj.style.border = "thin solid #000000"; 

                courseNum.innerText = resObj[i].courseNum;
                courseNum.style.width = "100px";
                courseNum.style.border = "thin solid #000000"; 
                
                title.innerText = resObj[i].title;
                title.style.width = "100px";
                title.style.border = "thin solid #000000"; 
                
                credits.innerText = resObj[i].credits;
                credits.style.width = "100px";
                credits.style.border = "thin solid #000000"; 
                
                instructorName.innerText = resObj[i].instructorName;
                instructorName.style.width = "100px";
                instructorName.style.border = "thin solid #000000"; 
                
                days.innerText = resObj[i].d1 + resObj[i].d2 + resObj[i].d3;
                days.style.width = "100px";
                days.style.border = "thin solid #000000"; 
                
                startTime.innerText = resObj[i].st;
                startTime.style.width = "100px";
                startTime.style.border = "thin solid #000000"; 
                
                endTime.innerText = resObj[i].et;
                endTime.style.width = "100px";
                endTime.style.border = "thin solid #000000"; 
                
                location.innerText = resObj[i].loc;
                location.style.width = "100px";
                location.style.border = "thin solid #000000"; 

                if (resObj[i].d1H != "")
                {
                    var rowH = table.insertRow(-1);
                    
                    crnH = rowH.insertCell(0);
                    subjH = rowH.insertCell(1);
                    courseNumH = rowH.insertCell(2);
                    titleH = rowH.insertCell(3);
                    creditsH = rowH.insertCell(4);
                    instructorNameH = rowH.insertCell(5);
                    daysH = rowH.insertCell(6);
                    startTimeH = rowH.insertCell(7);
                    endTimeH = rowH.insertCell(8);
                    locationH = rowH.insertCell(9);
                    
                    daysH.innerText = resObj[i].d1H + resObj[i].d2H + resObj[i].d3H;
                    daysH.style.width = "100px";
                    daysH.style.border = "thin solid #000000"; 
                    
                    startTimeH.innerText = resObj[i].stH;
                    startTimeH.style.width = "100px";
                    startTimeH.style.border = "thin solid #000000"; 
                    
                    endTimeH.innerText = resObj[i].etH;
                    endTimeH.style.width = "100px";
                    endTimeH.style.border = "thin solid #000000"; 
                    
                    locationH.innerText = resObj[i].locH;
                    locationH.style.width = "100px";
                    locationH.style.border = "thin solid #000000"; 
                }



            }
            
    
        }
        else
        {
            alert(this.responseText);
            
            console.log(this.status);
            console.log(this.responseText);
        }
    }
    AJAX.onerror = function() { alert("Network error"); }
    AJAX.open("GET", urlPrefix + `GenerateSchedule?studentID=${studentID}&semesterID=${semesterID}&numOfCourses=${numOfCourses}`);
    AJAX.send();
}



function listSemesters()
{
    var semesterList = document.getElementById("semesterList");

    let AJAX = new XMLHttpRequest();
    AJAX.onload = function() 
    {
        if (this.status == 200)
        { 
            resObj=JSON.parse(this.responseText);
            
            for (let i=0; i<Object.keys(resObj).length; i++)
            {
                var opt = document.createElement('option');
                opt.value = resObj[i].semesterID;
                opt.innerText = resObj[i].term + " " + resObj[i].year;
                semesterList.appendChild(opt);
            }


        }
        else
        {
            alert(this.responseText);
            
            console.log(this.status);
            console.log(this.responseText);
        }
    }
    AJAX.onerror = function() { alert("Network error"); }
    AJAX.open("GET", urlPrefix + `ListSemesterIDs?`);
    AJAX.send();
}







function logout()
{
    document.cookie = "studentID=; expires=Fri, 5 Nov 2021 12:00:00 UTC; path=/";

    window.location.href = urlPrefix + "index.html";
}