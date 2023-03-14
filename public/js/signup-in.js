const loginButton = document.querySelector('#tab-login');
const registerButton = document.querySelector('#tab-register');

const loginForm = document.querySelector('#pills-login');
const registerForm = document.querySelector('#pills-register');

loginButton.addEventListener('click', showLoginForm);
registerButton.addEventListener('click', showRegisterForm);

// Function to show the Login form and hide the Register form
function showLoginForm() {
  loginButton.classList.add('active');
  registerButton.classList.remove('active');

  loginForm.classList.remove('d-none');
  registerForm.classList.add('d-none');
}

// Function to show the Registration form and hide the Login form
function showRegisterForm() {
  registerButton.classList.add('active');
  loginButton.classList.remove('active');

  registerForm.classList.remove('d-none');
  loginForm.classList.add('d-none');
}

showLoginForm()
showRegisterForm()
