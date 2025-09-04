
        let students = [];
        let selectedIndex = -1;

        // DOM elements
        const idInput = document.getElementById('student-id');
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const courseInput = document.getElementById('course');
        const gpaInput = document.getElementById('gpa');
        const tableBody = document.querySelector('table tbody');
        const addBtn = document.querySelector('.add-btn');
        const updateBtn = document.querySelector('.update-btn');
        const deleteBtn = document.querySelector('.delete-btn');
        const clearBtn = document.querySelector('.clear-btn');
        const searchInput = document.querySelector('.search-section input');
        const searchBtn = document.querySelector('.search-section button');

        function renderTable(data = students) {
            tableBody.innerHTML = '';
            data.forEach((student, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.course}</td>
                    <td>${student.gpa}</td>
                `;
                row.onclick = () => selectRow(index);
                if (selectedIndex === index) row.classList.add('selected');
                tableBody.appendChild(row);
            });
        }

        addBtn.onclick = function() {
            const student = {
                id: idInput.value.trim(),
                name: nameInput.value.trim(),
                age: ageInput.value.trim(),
                course: courseInput.value.trim(),
                gpa: gpaInput.value.trim()
            };
            if (!student.id || !student.name) {
                alert('ID and Name are required.');
                return;
            }
            students.push(student);
            renderTable();
            clearForm();
        };

        updateBtn.onclick = function() {
            if (selectedIndex < 0) {
                
                alert('Select a student to update.');
                return;
            }
            students[selectedIndex] = {
                id: idInput.value.trim(),
                name: nameInput.value.trim(),
                age: ageInput.value.trim(),
                course: courseInput.value.trim(),
                gpa: gpaInput.value.trim()
            };
            renderTable();
            clearForm();
        };

        deleteBtn.onclick = function() {
            if (selectedIndex < 0) {
                alert('Select a student to delete.');
                return;
            }
            students.splice(selectedIndex, 1);
            renderTable();
            clearForm();
        };

        clearBtn.onclick = function() {
            clearForm();
        };

        function clearForm() {
            idInput.value = '';
            nameInput.value = '';
            ageInput.value = '';
            courseInput.value = '';
            gpaInput.value = '';
            selectedIndex = -1;
            Array.from(tableBody.children).forEach(row => row.classList.remove('selected'));
        }

        function selectRow(index) {
            selectedIndex = index;
            const student = students[index];
            idInput.value = student.id;
            nameInput.value = student.name;
            ageInput.value = student.age;
            courseInput.value = student.course;
            gpaInput.value = student.gpa;
            Array.from(tableBody.children).forEach((row, i) => {
                row.classList.toggle('selected', i === index);
            });
        }

        searchBtn.onclick = function() {
            const query = searchInput.value.trim().toLowerCase();
            const filtered = students.filter(s => s.name.toLowerCase().includes(query));
            renderTable(filtered);
        };

        renderTable();
    