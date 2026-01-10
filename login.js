// ===============================================
// LOGIN AUTHENTICATION
// ===============================================

// Admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '1234';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// ===============================================
// CHECK IF ALREADY LOGGED IN
// ===============================================
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        // Redirect to admin panel
        window.location.href = 'admin.html';
    }
}

// ===============================================
// LOGIN FORM HANDLER
// ===============================================
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set logged in flag
        localStorage.setItem('adminLoggedIn', 'true');

        // Add success animation
        loginForm.style.opacity = '0';
        loginForm.style.transform = 'scale(0.95)';

        // Redirect to admin panel
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 300);
    } else {
        // Show error message
        errorMessage.style.display = 'flex';

        // Shake the form
        const loginBox = document.querySelector('.login-box');
        loginBox.style.animation = 'none';
        setTimeout(() => {
            loginBox.style.animation = 'shake 0.5s ease';
        }, 10);

        // Clear password field
        passwordInput.value = '';
        passwordInput.focus();

        // Hide error after 3 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});

// ===============================================
// INITIALIZATION
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    usernameInput.focus();
});

// ===============================================
// KEYBOARD SHORTCUTS
// ===============================================
document.addEventListener('keydown', (e) => {
    // ESC to clear form
    if (e.key === 'Escape') {
        usernameInput.value = '';
        passwordInput.value = '';
        errorMessage.style.display = 'none';
        usernameInput.focus();
    }
});
