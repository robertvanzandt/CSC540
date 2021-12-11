const urlPrefix="http://localhost:8123/";

listPrograms();

document.getElementById("submitCreateAccount").addEventListener("click", createAccount);

function createAccount() 
{
    var studentID = document.getElementById("studentID").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var programName = document.getElementById("programList").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    //alert("Program Name: " +programName);

    if (password == confirmPassword)
    {
        let AJAX = new XMLHttpRequest();
        AJAX.onload = function() 
        {
            if (this.status == 200)
            { 
                //alert(this.responseText);
                console.log(this.responseText);
            }
            else
            {
                alert(this.responseText);
                
                console.log(this.status);
                console.log(this.responseText);
            }
        }
        AJAX.onerror = function() { alert("Network error"); }
        AJAX.open("GET", urlPrefix + `CreateAccount?studentID=${studentID}&fname=${fname}&lname=${lname}&email=${email}&programName=${programName}&password=${password}`);
        AJAX.send();
        
        document.cookie = "studentID="+studentID+"; expires=Fri, 31 Dec 2021 12:00:00 UTC; path=/";

        window.location.href = urlPrefix + "student.html";

    }
    else
    {
        alert("Passwords do not match! Please re-enter password.");
    }

}


function listPrograms() 
{
    let AJAX = new XMLHttpRequest();
    AJAX.onload = function() 
    {
        if (this.status == 200)
        { 
            resObj=JSON.parse(this.responseText);

            for (let i=0; i<Object.keys(resObj).length; i++)
            {
                if (resObj[i].programName != "Breadth")
                {
                    var option = document.createElement('option');
                    option.value=resObj[i].programName;
                    option.innerHTML=resObj[i].programName;
    
                    document.getElementById("programList").appendChild(option);
                }
 
            }

            console.log(this.responseText);
        }
        else
        {
            alert(this.responseText);
            
            console.log(this.status);
            console.log(this.responseText);
        }
    }
    AJAX.onerror = function() { alert("Network error"); }
    AJAX.open("GET", urlPrefix + `ListPrograms?`);
    AJAX.send();

}


