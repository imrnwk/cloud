document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('/users');
    const users = await response.json();

    const userTable = document.getElementById('userTable');

    users.forEach(user => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const passwordCell = document.createElement('td');
        const roleCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const roleSelect = document.createElement('select');
        const deleteButton = document.createElement('button');

        nameCell.textContent = user.name;
        emailCell.textContent = user.email;
        passwordCell.textContent = user.password;

        roleSelect.innerHTML = `
            <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
        `;
        roleSelect.addEventListener('change', async function() {
            const newRole = roleSelect.value;
            const response = await fetch(`/updateRole/${user.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole })
            });
            const result = await response.json();
            if (result.success) {
                alert(`Role of ${user.email} updated to ${newRole}`);
            } else {
                alert(result.message);
            }
        });

        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async function() {
            const confirmed = confirm(`Are you sure you want to delete user ${user.email}?`);
            if (confirmed) {
                const response = await fetch(`/delete/${user.email}`, {
                    method: 'DELETE'
                });
                const result = await response.json();
                if (result.success) {
                    alert(`User ${user.email} deleted successfully`);
                    location.reload(); // Sayfayı yenile
                } else {
                    alert(result.message);
                }
            }
        });

        roleCell.appendChild(roleSelect);
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(passwordCell);
        row.appendChild(roleCell);
        row.appendChild(actionCell);
        userTable.appendChild(row);
    });
});