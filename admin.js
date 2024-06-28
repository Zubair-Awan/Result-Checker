document.addEventListener('DOMContentLoaded', () => {
    const adminPassword = '@W@is123'; // Replace with a secure password
    const adminForm = document.getElementById('admin-login-form');
    const adminPanel = document.getElementById('admin-panel');
    const addResultForm = document.getElementById('add-result-form');
    const resultsList = document.getElementById('results-list');

    // Load results from local storage
    let results = JSON.parse(localStorage.getItem('results')) || [];

    // Handle admin login
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        if (password === adminPassword) {
            adminPanel.style.display = 'block';
            adminForm.style.display = 'none';
            updateResultsList();
        } else {
            alert('Incorrect password');
        }
    });

    // Handle adding results
    addResultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rollNo = document.getElementById('studentRollNo').value;
        const result = document.getElementById('studentResult').value;

        results.push({ rollNo, result });
        localStorage.setItem('results', JSON.stringify(results));
        updateResultsList();
        addResultForm.reset();
    });

    // Update the results list in the admin panel
    function updateResultsList() {
        resultsList.innerHTML = '';
        results.forEach((student, index) => {
            const li = document.createElement('li');
            li.textContent = `Roll No: ${student.rollNo}, Result: ${student.result}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                results.splice(index, 1);
                localStorage.setItem('results', JSON.stringify(results));
                updateResultsList();
            });
            li.appendChild(removeButton);
            resultsList.appendChild(li);
        });
    }
});
