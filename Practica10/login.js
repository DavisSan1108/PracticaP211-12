document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar recarga de la página
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Verificación de usuario simple
    if (username === 'admin' && password === '1234') {
      // Guardar sesión en localStorage
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'index.html'; // Redirigir al sistema principal
    } else {
      document.getElementById('loginError').style.display = 'block';
    }
  });
  