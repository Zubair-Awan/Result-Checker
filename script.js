document.addEventListener('DOMContentLoaded', () => {
    const adminPassword = 'admin123'; // Replace with a secure password
    let results = [];

    const adminLink = document.getElementById('admin-link');
    const adminForm = document.getElementById('admin-login-form');
    const adminPanel = document.getElementById('admin-panel');
    const addResultForm = document.getElementById('add-result-form');
    const resultForm = document.getElementById('result-form');
    const resultDiv = document.getElementById('result');
    const resultsList = document.getElementById('results-list');

    // Handle admin login
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        if (password === adminPassword) {
            adminPanel.style.display = 'block';
            adminForm.style.display = 'none';
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
        updateResultsList();
        addResultForm.reset();
    });

    // Handle student result check
    resultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rollNo = document.getElementById('rollNo').value;
        const studentResult = results.find(r => r.rollNo === rollNo);

        if (studentResult) {
            resultDiv.textContent = `Result: ${studentResult.result}`;
        } else {
            resultDiv.textContent = 'Result not found';
        }
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
                updateResultsList();
            });
            li.appendChild(removeButton);
            resultsList.appendChild(li);
        });
    }
});

