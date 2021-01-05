// Validating the form when leaving the input field using "BLUR" Event

// Event Listeners for Form Groups
document.getElementById('name').addEventListener('blur', validateName);

document.getElementById('email').addEventListener('blur', validateEmail);

document.getElementById('phone').addEventListener('blur', validatePhone);

document.getElementById('zip').addEventListener('blur', validateZip);

// Functions for Validating each fields
// Validate Name Field
function validateName() {
  const name = document.getElementById('name');

  const regularExpression = /^[a-zA-Z]{2,10}$/;

  if (!regularExpression.test(name.value)) {
    name.classList.add('is-invalid');
  }
  else {
    name.classList.remove('is-invalid');
  }
}

// Validate Email Field
function validateEmail() {
  const email = document.getElementById('email');

  const regularExpression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (!regularExpression.test(email.value)) {
    email.classList.add('is-invalid');
  }
  else {
    email.classList.remove('is-invalid');
  }
}

// Validate Phone Number Field
function validatePhone() {
  const phone = document.getElementById('phone');

  const regularExpression = /^(\(?\+\d{2}\)?\-?)?[0-9]{10}$/;

  if (!regularExpression.test(phone.value)) {
    phone.classList.add('is-invalid');
  }
  else {
    phone.classList.remove('is-invalid');
  }
}

// Validate Zip Code Field
function validateZip() {
  const zip = document.getElementById('zip');

  const regularExpression = /^([0-9]{3}\-?[0-9]{3})$/;

  if (!regularExpression.test(zip.value)) {
    zip.classList.add('is-invalid');
  }
  else {
    zip.classList.remove('is-invalid');
  }
}