// script.js

// Credenziali di accesso (demo)
const validUsername = 'admin';
const validPassword = 'password123';

// Gestione Login (usato in login.html)
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === validUsername && password === validPassword) {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'edit.html';
  } else {
    alert('Nome utente o password errati.');
  }
}

// Verifica accesso (usato in edit.html)
function checkAuthentication() {
  if (localStorage.getItem('loggedIn') !== 'true') {
    alert('Accesso non autorizzato. Effettua il login.');
    window.location.href = 'login.html';
  }
}

// Carica livelli nei campi di input (usato in edit.html)
function loadLevels() {
  document.getElementById('level1').value = localStorage.getItem('level1') || 'A';
  document.getElementById('level2').value = localStorage.getItem('level2') || 'B+';
  document.getElementById('level3').value = localStorage.getItem('level3') || 'B';
  document.getElementById('level4').value = localStorage.getItem('level4') || 'C+';
  document.getElementById('level5').value = localStorage.getItem('level5') || 'C';
}

// Salva livelli da form (usato in edit.html)
function saveLevels(event) {
  event.preventDefault();
  localStorage.setItem('level1', document.getElementById('level1').value);
  localStorage.setItem('level2', document.getElementById('level2').value);
  localStorage.setItem('level3', document.getElementById('level3').value);
  localStorage.setItem('level4', document.getElementById('level4').value);
  localStorage.setItem('level5', document.getElementById('level5').value);
  alert('Livelli aggiornati con successo!');
  window.location.href = 'index.html';
}

// Aggiorna livelli su index.html se esistono
function updateDisplayedLevels() {
  const mapping = [
    { id: 'displayLevelA', key: 'level1' },
    { id: 'displayLevelBPlus', key: 'level2' },
    { id: 'displayLevelB', key: 'level3' },
    { id: 'displayLevelCPlus', key: 'level4' },
    { id: 'displayLevelC', key: 'level5' },
  ];

  mapping.forEach(({ id, key }) => {
    const element = document.getElementById(id);
    if (element && localStorage.getItem(key)) {
      element.textContent = localStorage.getItem(key);
    }
  });
}

 
