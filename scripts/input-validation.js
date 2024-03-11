function validateInput(userInput) {
  if(Boolean(userInput.trim()) == true) {
    return true
  }
  else {
    return false
  }
}

function validateEmail(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/

  if (expression.test(email) == true) {
    // Email is good
    return true
  }
  else {
    // Email is not good
    return false
  }
}

function validatePassword(password) {
  // Firebase only accepts lengths greather than 6

  if(password < 6) {
    return false
  }
  else {
    return true
  }
}

function confirmPassword(password, confirmPass) {
  if(password != confirmPass) {
    return false
  }
  else {
    return true
  }
}

function checkImageInput(input) {
  if(input.files.length == 0) {
    return false
  }
  else {
    return true
  }
}

export { validateInput, validateEmail, validatePassword, confirmPassword, checkImageInput }