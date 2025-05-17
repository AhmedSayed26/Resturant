import { Aside, clicks } from "../aside.js";
Aside();
clicks();
let userName = document.querySelector(".name");
let userEmail = document.querySelector(".email");
let userPhone = document.querySelector(".phone");
let userAge = document.querySelector(".age");
let userPassword = document.querySelector(".password");
let userRePassword = document.querySelector(".repassword");
let submitBtn = document.querySelector(".submit-btn");

let nameError = document.querySelector(".name-error");
let emailError = document.querySelector(".email-error");
let phoneError = document.querySelector(".phone-error");
let ageError = document.querySelector(".age-error");
let passwordError = document.querySelector(".password-error");
let rePasswordError = document.querySelector(".repassword-error");
// let errormessage = document.querySelectorAll(".error-message");

let nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let phoneRegex = /^\d{11}$/;
let ageRegex = /^(1[0-9]|[2-9][0-9]|100)$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

function showError(input, regex, errorElement, message) {
  input.addEventListener("input", () => {
    if (regex.test(input.value)) {
      errorElement.textContent = "";
    } else {
      errorElement.textContent = message;
    }
    checkFormValidity();
  });

  input.addEventListener("blur", () => {
    if (!regex.test(input.value)) {
      errorElement.textContent = message;
    }
  });
}

function validateRePassword() {
  userRePassword.addEventListener("input", () => {
    if (userRePassword.value === userPassword.value) {
      rePasswordError.textContent = "";
    } else {
      rePasswordError.textContent = "Passwords do not match.";
    }
    checkFormValidity();
  });

  userRePassword.addEventListener("blur", () => {
    if (userRePassword.value !== userPassword.value) {
      rePasswordError.textContent = "Passwords do not match.";
    }
  });
}

function checkFormValidity() {
  if (
    nameRegex.test(userName.value) &&
    emailRegex.test(userEmail.value) &&
    phoneRegex.test(userPhone.value) &&
    ageRegex.test(userAge.value) &&
    passwordRegex.test(userPassword.value) &&
    userPassword.value === userRePassword.value
  ) {
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.remove("btn-secondary");
    submitBtn.classList.add("btn-primary");
    submitBtn.textContent = "Submit Success";
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.classList.remove("btn-primary");
    submitBtn.classList.add("btn-secondary");
  }
}

// run validators
showError(userName, nameRegex, nameError, "Name must be at least 3 letters.");
showError(userEmail, emailRegex, emailError, "Enter a valid email.");
showError(userPhone, phoneRegex, phoneError, "Enter a valid phone 11 number.");
showError(userAge, ageRegex, ageError, "Age must be 10 to 100.");
showError(
  userPassword,
  passwordRegex,
  passwordError,
  "Password must include uppercase, lowercase and number."
);
validateRePassword();

document.querySelector("form").addEventListener("submit", function (e) {
  if (submitBtn.hasAttribute("disabled")) {
    submitBtn.removeAttribute("disabled");
  }
});
