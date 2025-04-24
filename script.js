// Dati di login fittizi
const validUsername = 'admin';
const validPassword = 'password123';

// Gestione del login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
      // Salva lo stato di login
      localStorage.setItem('loggedIn', 'true');
      // Reindirizza alla pagina di modifica
      window.location.href = 'edit.html';
    } else {
      alert('Nome utente o password errati.');
    }
  });
}

// Verifica lo stato di login su edit.html
const editForm = document.getElementById('editForm');
if (editForm) {
  // Controlla se l'utente è loggato
  if (localStorage.getItem('loggedIn') !== 'true') {
    alert('Accesso non autorizzato. Effettua il login.');
    window.location.href = 'login.html';
  }

  // Carica i livelli esistenti nei campi di input
  document.getElementById('level1').value = localStorage.getItem('level1') || 'A';
  document.getElementById('level2').value = localStorage.getItem('level2') || 'B+';
  document.getElementById('level3').value = localStorage.getItem('level3') || 'B';
  document.getElementById('level4').value = localStorage.getItem('level4') || 'C+';
  document.getElementById('level5').value = localStorage.getItem('level5') || 'C';

  // Salva le modifiche
  editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    localStorage.setItem('level1', document.getElementById('level1').value);
    localStorage.setItem('level2', document.getElementById('level2').value);
    localStorage.setItem('level3', document.getElementById('level3').value);
    localStorage.setItem('level4', document.getElementById('level4').value);
    localStorage.setItem('level5', document.getElementById('level5').value);
    alert('Modifiche salvate.');
    window.location.href = 'index.html';
  });
}

// Aggiorna i livelli su index.html
const levelsList = document.getElementById('levelsList');
if (levelsList) {
  document.getElementById('level1').textContent = localStorage.getItem('level1') ||
::contentReference[oaicite:16]{index=16}
 
