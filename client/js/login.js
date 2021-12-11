const urlPrefix="http://localhost:8123/";

document.getElementById("submitLogin").addEventListener("click", loginUser);
//loginUser();
function loginUser() 
{
    var userName = document.getElementById("userName").value;
    var passWord = document.getElementById("passWord").value;
    
    let AJAX = new XMLHttpRequest();
    AJAX.onload = function() 
    {
        if (this.status == 200)
        { 
            //alert(this.responseText);

            document.cookie = "studentID="+this.responseText+"; expires=Fri, 31 Dec 2021 12:00:00 UTC; path=/";
            window.location.href = urlPrefix + "student.html";
        }
        else
        {
            alert("Login Failed, please try again.");
            location.reload(); 
        }
    }
    AJAX.onerror = function() { alert("Network error"); }
    AJAX.open("GET", urlPrefix + `Login?email=${userName}&passHash=${passWord}`);
    AJAX.send();

}


