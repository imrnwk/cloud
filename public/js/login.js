document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    
    const result = await response.json();

    if (result.success) {
        if (result.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            localStorage.setItem('userEmail', email);
            window.location.href = 'index.html';
        }
    } else {
        alert(result.message);
    }
});