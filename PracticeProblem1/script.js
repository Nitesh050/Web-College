const form = document.getElementById("loginform");
const  email=document.getElementById("email");
const password=document.getElementById("password");
const errorMessages = document.querySelectorAll(".error");

form.addEventListener("submit",function(e)){
    e.preventDefault();

    let isValid=true;

    errorMessages.forEach(function(msg) {
        msg.innerText = "";
    });

    if(email.ariaValueMax.trim()===""){
        showError(email,"Email is required");
        isValid=false;
    }
    else if(!validateEmail(email.value)){
        showError
    }

}