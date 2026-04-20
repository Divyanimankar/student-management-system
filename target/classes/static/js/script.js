const API_URL = 'http://localhost:8080/api/students';

window.onload = function() { loadStudents(); }

function loadStudents() {
    fetch(API_URL)
    .then(r => r.json())
    .then(data => {
        let body = document.getElementById('tableBody');
        body.innerHTML = '';
        if(data.length === 0) {
            body.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999">No students found</td></tr>';
            return;
        }
        data.forEach(s => {
            body.innerHTML += `<tr>
                <td>${s.id}</td><td><strong>${s.name}</strong></td>
                <td>${s.roll_no}</td><td>${s.email||'-'}</td>
                <td>${s.phone||'-'}</td><td>${s.course||'-'}</td>
                <td><button class="btn-delete" onclick="deleteStudent(${s.id},'${s.name}')">🗑️ Delete</button></td>
            </tr>`;
        });
    })
    .catch(() => showMessage('Server connect नाही!', 'error'));
}

function addStudent() {
    let name = document.getElementById('name').value.trim();
    let roll_no = document.getElementById('roll_no').value.trim();
    if(!name || !roll_no) { showMessage('Name आणि Roll Number टाका!', 'error'); return; }
    fetch(API_URL, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            name, roll_no,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            course: document.getElementById('course').value
        })
    })
    .then(r => r.json())
    .then(() => { showMessage('✅ Student Added!', 'success'); loadStudents(); clearForm(); })
    .catch(() => showMessage('Error!', 'error'));
}

function deleteStudent(id, name) {
    if(confirm(`"${name}" delete करायचा का?`)) {
        fetch(`${API_URL}/${id}`, {method:'DELETE'})
        .then(() => { showMessage('✅ Deleted!', 'success'); loadStudents(); });
    }
}

function clearForm() {
    ['name','roll_no','email','phone','course'].forEach(id => document.getElementById(id).value='');
}

function showMessage(msg, type) {
    let el = document.getElementById('message');
    el.textContent = msg; el.className = 'message ' + type;
    setTimeout(() => el.className = 'message', 4000);
}
