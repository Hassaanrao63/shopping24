function ensureLoggedOut() {
  if (localStorage.getItem('loggedIn') === 'true') window.location.href = 'home.html';
}
function ensureLoggedIn() {
  if (localStorage.getItem('loggedIn') !== 'true') window.location.href = 'index.html';
}

ensureLoggedOut();

document.getElementById('loginToggle').onclick = () => {
  document.getElementById('loginForm').classList.remove('hide');
  document.getElementById('registerForm').classList.add('hide');
  toggleActive('loginToggle','registerToggle');
};
document.getElementById('registerToggle').onclick = () => {
  document.getElementById('registerForm').classList.remove('hide');
  document.getElementById('loginForm').classList.add('hide');
  toggleActive('registerToggle','loginToggle');
};
function toggleActive(sel, un) {
  document.getElementById(sel).classList.add('active');
  document.getElementById(un).classList.remove('active');
}

document.getElementById('btnRegister').onclick = () => {
  const email = document.getElementById('regEmail').value;
  const p1 = document.getElementById('regPass').value;
  const p2 = document.getElementById('regPass2').value;
  if (p1 !== p2) return alert("Passwords don't match!");
  localStorage.setItem('user', JSON.stringify({email, password: p1}));
  alert("Registered! Please log in.");
  document.getElementById('loginToggle').click();
};

document.getElementById('btnLogin').onclick = () => {
  const stored = JSON.parse(localStorage.getItem('user'));
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;
  if (!stored || stored.email !== email || stored.password !== pass) {
    return alert('Invalid credentials!');
  }
  localStorage.setItem('loggedIn', 'true');
  window.location.href = 'home.html';
};
