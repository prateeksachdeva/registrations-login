const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const formSteps = document.querySelectorAll(".form-step");


let formStepsNum = 0;
function validateForm() {
    var name = document.forms["myForm"]["name"].value;
      var mobileNumber = document.forms["myForm"]["mobileNumber"].value;
        var pwd = document.forms["myForm"]["pwd"].value;
          var email = document.forms["myForm"]["email"].value;
            var panno = document.forms["myForm"]["panno"].value;
              var fname = document.forms["myForm"]["fname"].value;
                var dob = document.forms["myForm"]["dob"].value;
                  var password = document.forms["myForm"]["password"].value;
                      var confirmPassword = document.forms["myForm"]["confirmPassword"].value;
  if (name== "" || name == null ||mobileNumber== "" || mobileNumber == null ||pwd== "" || pwd == null ||email== "" || email == null ||panno== "" || panno == null ||fname== "" || fname == null ||dob== "" || dob == null ) {
    alert("All data must be filled out");
    return false;
  }
  else if(mobileNumber.length<10 || mobileNumber.length>10){
  alert("Mobile Number must be at 10 characters long.");
  return false;
  }
  else if(panno.length<10 || panno.length>10){
  alert("Pan No must be at 10 characters long.");
  return false;
}
else if(password.length<8 ){
alert("Password must be at 8 characters long.");
return false;}
else if(password!=confirmPassword){
alert("Password is not same. Please write password and confirm password same");
return false;
}

}

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();

  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();

  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}
