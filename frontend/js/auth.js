function showError(message) {
  const el = document.querySelector('[data-testid="error-message"]');
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  }
}

function hideError() {
  const el = document.querySelector('[data-testid="error-message"]');
  if (el) el.style.display = 'none';
}

// Login page
const loginBtn = document.querySelector('[data-testid="login-button"]');
if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    hideError();
    const email = document.querySelector('[data-testid="email-input"]').value.trim();
    const password = document.querySelector('[data-testid="password-input"]').value;
    if (!email || !password) { showError('Email and password are required'); return; }
    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.user.email);
      window.location.href = '/index.html';
    } catch (err) {
      showError(err.message || 'Login failed');
    }
  });
}

// Register page
const registerBtn = document.querySelector('[data-testid="register-button"]');
if (registerBtn) {
  registerBtn.addEventListener('click', async () => {
    hideError();
    const email = document.querySelector('[data-testid="email-input"]').value.trim();
    const password = document.querySelector('[data-testid="password-input"]').value;
    const confirm = document.querySelector('[data-testid="confirm-password-input"]').value;
    if (!email || !password) { showError('Email and password are required'); return; }
    if (password !== confirm) { showError('Passwords do not match'); return; }
    try {
      const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.user.email);
      window.location.href = '/index.html';
    } catch (err) {
      showError(err.message || 'Registration failed');
    }
  });
}

// Logout button (on product/cart pages)
const logoutBtn = document.querySelector('[data-testid="logout-button"]');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/login.html';
  });
}

// Show logged-in user email
const userEmailEl = document.querySelector('[data-testid="user-email"]');
if (userEmailEl) {
  const email = localStorage.getItem('userEmail');
  if (!email) {
    window.location.href = '/login.html';
  } else {
    userEmailEl.textContent = email;
  }
}
