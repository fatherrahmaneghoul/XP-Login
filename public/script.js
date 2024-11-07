// Get elements
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');

// Show/Hide password functionality
togglePassword.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Show password
        this.textContent = '👁️'; // Change icon to open eye
    } else {
        passwordInput.type = 'password'; // Hide password
        this.textContent = '👁️'; // Change icon to closed eye
    }
});

// Show/Hide eye icon based on input
passwordInput.addEventListener('input', function() {
    if (this.value) {
        togglePassword.style.display = 'block'; // Show the eye icon
    } else {
        togglePassword.style.display = 'none'; // Hide the eye icon
    }
});


