console.log("Entered Index.js");
// Select the needed elements for submission
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const mobile = document.getElementById('mobile');
const address = document.getElementById('adress');

var submitState;

form.addEventListener('submit', function(e) {
  console.log("Entered addEventListener");
  submitState = true;
  // Prevent Form from automatic submitting
  e.preventDefault();

  checkInputs();
})

function checkInputs() {
  console.log("Entered checkInputs");
  //Get values from inputs
  var nameValue = name.value.trim();
  var emailValue = email.value.trim();
  var passwordValue = password.value.trim();
  var password2Value = password2.value.trim();
  var mobileValue = mobile.value.trim();
  var addressValue = adress.value.trim();

  //Check if name is empty, in Regex form
  // Show error in case of failure
  // Show success in case of matching needed verfication
  if (nameValue === '') {
    setErrorFor(name, "Name cannot be empty!");
  } else if (!isName(nameValue)) {
    setErrorFor(name, "Name must be at least 4 character long");
  } else {
    setSuccessFor(name);
  }

  //Check if email is empty  , in Regex form
  // Show error in case of failure
  // Show success in case of matching needed verfication
  if (emailValue === '') {
    setErrorFor(email, "Email cannot be empty!");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email form is not Valid!")
  } else {
    setSuccessFor(email);
  }

  //Check if password is empty, in Regex form
  // Show error in case of failure
  // Show success in case of matching needed verfication
  if (passwordValue === '') {
    setErrorFor(password, "Password cannot be empty!");
  } else if (!isPassword(passwordValue)) {
    setErrorFor(password, "Must contain: Lowercase/ Uppercase/ Number/8 characters min")
  } else {
    setSuccessFor(password);
  }

  //Check if password is empty, in Regex form and identical to the pre-entered password
  // Show error in case of failure
  // Show success in case of matching needed verfication
  if (password2Value === '') {
    setErrorFor(password2, "Password cannot be empty!");
  } else if (!isPassword(password2Value)) {
    setErrorFor(password2, "Must contain: Lowercase/Uppercase/Number/8 characters min")
  } else if (passwordValue !== password2Value) {
    setErrorFor(password2, "Passwords does not match!");
  } else {
    setSuccessFor(password2);
  }

  //Check if mobile is empty, in Regex form
  // Show error in case of failure
  // Show success in case of matching needed verfication
  if (mobileValue === '') {
    setErrorFor(mobile, "Mobile cannot be empty!");
  } else if (!isMobileNumber(mobileValue)) {
    setErrorFor(mobile, "Mobile form should be: 01xx xxx xxxx")
  } else {
    setSuccessFor(mobile);
  }

  //Check if address is empty, in Regex form
  // Show error in case of failure
  // Show success in case of matching needed verfication
  if (addressValue === '') {
    setErrorFor(address, "Address cannot be empty!");
  } else if (!isAddress(addressValue)) {
    setErrorFor(address, "Address form should be: 13 abc str. abc");
  } else {
    setSuccessFor(address);
  }

  if (submitState) {
    form.submit();
  }

}

function setErrorFor(input, message) {
  console.log("Entered setErrorFor");
  // Select the parent to assign te error class to it
  var formGroup = input.parentElement;
  // Select the error message
  var small = formGroup.querySelector('small');
  //  Set error message
  small.innerText = message;
  // Add error effect class
  formGroup.className = 'form-group error';
  submitState = false;
}

function setSuccessFor(input) {
  // Select the parent to assign te error class to it
  var formGroup = input.parentElement;
  // Add success effect class
  formGroup.className = 'form-group success';
}
/*
 * Function checks if the entered name matched the following Regex or not
 * Accepted names have only alphabetical characters: Sherif - SHERIF ashraf - etc.
 * Doesn't accept any special character of numbers in the name
 */
function isName(eneteredName) {
  return /([a-zA-z]{4,})([a-zA-z]*\s*){1,}$/.test(eneteredName);
}

/*
 * Function checks if the entered email matched the following Regex or not
 * The entered email should follow the standard format for any email
 */
function isEmail(enteredEmail) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(enteredEmail);
}

/*
* Function checks if the entered Password matched the following Regex or not
* Accepted emails must have the following:
  -At least 1 Lowercase character
  -At least 1 Upppercase character
  -At least 1 Number
  -At least 8 characters long
*/
function isPassword(enteredPassword) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(enteredPassword);
}
/*
* Function checks if the entered Mobile Number matched the following Regex or not
* Accepted mobile numbers must have the following:
  -Start by 01
  -Followed by 0(vodafone), 1(etisalat), 2(Orange), 5(We)
  -Followed by 8 numbers
  -Example: 010 210 47921
*/
function isMobileNumber(enteredMobileNumber) {
  return /^01[0125]{1}[0-9]{8}$/.test(enteredMobileNumber);
}
/*
* Function checks if the entered address matched the following Regex or not
* Accepted emails must have the following:
  -Can contain Numbers, Uppercase and Lowercase Letters, spaces
  -At least 3 characters needed
*/
function isAddress(enteredAdress) {
  return /([0-9a-zA-Z\s]{3,}.*){1,}$/.test(enteredAdress);
}
