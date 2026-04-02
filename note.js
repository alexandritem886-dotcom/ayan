const addNoteButton = document.getElementById('add-note');
const noteInput = document.getElementById('note-input');
const noteList = document.getElementById('note-list');

// 1. Load notes from LocalStorage on startup
document.addEventListener('DOMContentLoaded', getNotes);

addNoteButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        createNoteElement(noteText);
        saveLocalNote(noteText); // 2. Save to LocalStorage
        noteInput.value = ''; 
    }
});

// Helper function to build the note UI
function createNoteElement(text) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    
    noteDiv.innerHTML = `
        <p>${text}</p>
        <button class="delete-btn" onclick="removeNote(this)">Done / Delete</button>
    `;
    
    noteList.appendChild(noteDiv);
}

// 3. Remove note from UI and LocalStorage
function removeNote(button) {
    const noteDiv = button.parentElement;
    const text = noteDiv.querySelector('p').innerText;
    
    noteDiv.remove();
    removeLocalNote(text);
}

// --- LOCAL STORAGE LOGIC ---

function saveLocalNote(note) {
    try {
        let notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
        console.error('Failed to save note:', error);
    }
}

function getNotes() {
    try {
        let notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
        notes.forEach(note => createNoteElement(note));
    } catch (error) {
        console.error('Failed to load notes:', error);
    }
}

function removeLocalNote(noteText) {
    try {
        let notes = JSON.parse(localStorage.getItem('notes') || '[]');
        const noteIndex = notes.indexOf(noteText);
        if (noteIndex > -1) {
            notes.splice(noteIndex, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    } catch (error) {
        console.error('Failed to remove note:', error);
    }
}