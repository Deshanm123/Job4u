
const loginForm = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

// // alert 
const messageAlert = document.getElementById('message-alert');


// Show input error message
function showError(input, message) {
  input.classList.add('is-invalid');
  let x = input.parentNode.querySelector('.invalid-feedback')
  x.innerHTML = message;
}

// Show success outline
function showSuccess(input) {
  input.classList.add('is-valid')
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, 'Email is not valid');
    return false;
  }
}

// Check required fields
function checkRequired(inputArr) {
  let arrResult = true;
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${input.id} is required`);
      arrResult = false;
    } else {
      showSuccess(input);
    }
  });
  return arrResult;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${input.id} must be at least ${min}  characters`
    );
    return false;
  } else if (input.value.length > max) {

    showError(
      input,
      `${input.id} must be less than ${max} characters`
    );
    return false;
  } else {

    showSuccess(input);
    return true;
  }
}

// $(document).ready(() => {
//   $('#message-alert').hide();
// });



// Event listeners
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let requiredStatus = checkRequired([email, password]);
  console.log("is all inputs are filled ?" + requiredStatus)
  let ready = false;
  if (requiredStatus) {
    if (checkLength(password, 6, 25) && checkEmail(email)) {
      console.log("Ready to submit")
      ready = true;
    } else {
      console.log("error");
    }
  }
  if (ready) {
    console.log('submit');
  }

})


