let togglePassword = document.querySelector("#togglePassword");
let EmailEnter=document.querySelector("#Email")
let PasswordEnter = document.querySelector("#Password");
let NameEnter=document.querySelector("#Name");
let myForm= document.querySelector("form");
let Btn=document.querySelector("#button");
let emptyMassage=document.querySelector("#error_empty_message");
let errorMassage=document.querySelector("#error_message")

document.addEventListener("click",function(){
    if(togglePassword){
        // toggle the type attribute
            const type = PasswordEnter.getAttribute("type") === "password" ? "text" : "password";
            PasswordEnter.setAttribute("type", type);
            // toggle the eye icon
            togglePassword.classList.toggle('fa-eye-slash');
            togglePassword.classList.toggle('fa-eye');
    
    }
})

//local storge
var signarray=[];
if(localStorage.getItem("signinBox")!=null){
    signarray=JSON.parse(localStorage.getItem("signinBox"));
}

//sumbitForm
myForm.addEventListener("submit",function(e){
    e.preventDefault();
    if(Btn.innerHTML=="Login"){
        login();
    }
    else if(Btn.innerHTML=="Sign Up"){
        signup();
    }else if(Btn.innerHTML=="Logout"){
        window.location.href="index.html"
    }
})
//input enter
myForm.addEventListener("keyup",function(e){
    if (e.target.getAttribute("id") == "Name") {
        isvalidName()
    }
    else if (e.target.getAttribute("id") == "Email") {
        isValid(emailRegex,EmailEnter)
    }
    else if (e.target.getAttribute("id") == "Password") {
        isValid(passwordRegex,PasswordEnter)
    }
})

//login
function isFoundEmail(){
    var emailUser=EmailEnter.value.toLowerCase();
    var passwordUser=PasswordEnter.value.toLowerCase();
    var foundEmail=false
    for(let i=0;i<signarray.length;i++){
        if(signarray[i].userEmail.toLowerCase()==emailUser&&signarray[i].userPass.toLowerCase()==passwordUser){
            localStorage.setItem("LoginName",signarray[i].userName);
            foundEmail=true;
            break;
        }
        }
    return foundEmail;
}
// //welcome home
// function updateWelcomeMessage() {
//   // Get the username from localStorage
//   let loginName = localStorage.getItem("LoginName");
    
//   // Check if the welcome message element and login name exist
//   if (WelcomeMessage && loginName) {
//  // Set the text content
//   }
// }

function login(){
    if(isFormEmpty()){
        emptyMassage.classList.replace("d-none","d-block");
        errorMassage.classList.replace("d-block","d-none");}
        else{
                if(isFoundEmail()){
                    window.location.href="home.html";
                    // updateWelcomeMessage()
                    console.log(updateWelcomeMessage);
                    emptyMassage.classList.replace("d-block","d-none");
                    errorMassage.classList.replace("d-block","d-none");
                }else{
                    emptyMassage.classList.replace("d-block","d-none");
                    errorMassage.classList.replace("d-none","d-block");
                }
        }
}


//signup
function signup(){
    let sucessMassage=document.querySelector("#sucess_message")
    if(isFormEmpty()){
        emptyMassage.classList.replace("d-none","d-block");
        errorMassage.classList.replace("d-block","d-none");
    }else{
        if(newEmail()){
            errorMassage.classList.replace("d-none","d-block");
        }
        else if(isValid(emailRegex,EmailEnter) && isValid(passwordRegex,PasswordEnter) && isvalidName()){
                var userInfo={
                    userName:NameEnter.value,
                    userEmail:EmailEnter.value,
                    userPass:PasswordEnter.value,
                }
                signarray.push(userInfo);
                localStorage.setItem("signinBox",JSON.stringify(signarray))
                sucessMassage.classList.replace("d-none","d-block");
                errorMassage.classList.replace("d-block","d-none");
                emptyMassage.classList.replace("d-block","d-none");
                console.log(signarray)
        }
    }
}


// isFormEmpty
    function isFormEmpty() {
        if(Btn.innerHTML=="Login"){
            if(EmailEnter.value=="" || PasswordEnter.value==""){
                return true;
            }else {
                return false;
            }
        }
        else if(Btn.innerHTML=="Sign Up"){
            if(EmailEnter.value=="" || PasswordEnter.value=="" || NameEnter.value==""){
                return true;
            }else {
                return false;
            }
        }
    }
//regex 
var emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[A-Za-z\d!@#\$%\^&\*]{8,}$/;
function isValid(regex,element){
    if(regex.test(element.value)){
        element.classList.add("border-success");
        element.classList.remove("border-danger");
        return true
    }else{
        element.classList.add("border-danger");
        element.classList.remove("border-success");
        return false
    }
}
//validation name
const isBetween = (length, min, max) => length < min || length > max ? false : true;
function isvalidName(){
    const min=4;
    const max=25;
    const regexName=/^[a-zA-Z\s]+$/;
    const nameUser=NameEnter.value.trim();
    if(isBetween(nameUser.length,min,max)&&regexName.test(nameUser)){
        NameEnter.classList.add("border-success");
        NameEnter.classList.remove("border-danger");
        return true;
    }else{
        NameEnter.classList.add("border-danger");
        NameEnter.classList.remove("border-success");
        return false;
    }
}
//newEmail
function newEmail(){
    var found=false;
    for(let i=0;i<signarray.length;i++){
        if(signarray[i].userEmail.toLowerCase()==EmailEnter.value.toLowerCase()){
            found=true;
            break;
        }
    }
    return found;
}

//inner linkes
if(myForm.nextElementSibling){
myForm.nextElementSibling.addEventListener("click",function(e){
if(e.target==document.querySelector(".signLink")){
    window.location.href="signup.html";
}else if(e.target==document.querySelector(".loginLink")){
    window.location.href="index.html";
}
})}