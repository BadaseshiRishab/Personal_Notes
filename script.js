document.getElementById('noteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the title and content values from the form
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    
    // Create a new note object
    const note = { title, content };
    
    // Get existing notes from localStorage or initialize an empty array
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    // Check if we are editing an existing note
    const editIndex = document.getElementById('noteForm').getAttribute('data-edit-index');
    
    if (editIndex !== null) {
      // If editing, update the note at the specified index
      notes[editIndex] = note;
      // Remove the edit index from the form
      document.getElementById('noteForm').removeAttribute('data-edit-index');
      document.getElementById('noteForm').querySelector('button').textContent = 'Add Note'; // Change button text back
    } else {
      // If not editing, add a new note to the array
      notes.push(note);
    }
  
    // Save the updated notes array to localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // Display the updated notes list
    displayNotes();
    
    // Clear the form fields
    document.getElementById('noteForm').reset();
  });
  
  // Function to display notes
  function displayNotes() {
    // Get the notes from localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    // Get the div where notes will be displayed
    const notesListDiv = document.getElementById('notesList');
    
    // Clear the current list
    notesListDiv.innerHTML = '';
    
    // Check if there are any notes to display
    if (notes.length > 0) {
      notes.forEach((note, index) => {
        // Create a div for each note
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
          <div>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
          </div>
          <button class="edit" onclick="editNote(${index})">Edit</button>
          <button class="delete" onclick="deleteNote(${index})">Delete</button>
        `;
        notesListDiv.appendChild(noteDiv);
      });
    } else {
      notesListDiv.innerHTML = '<p>No notes available</p>';
    }
  }
  
  // Function to delete a note
  function deleteNote(index) {
    // Get notes from localStorage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    // Remove the note from the array by its index
    notes.splice(index, 1);
    
    // Save the updated list back to localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // Display the updated list of notes
    displayNotes();
  }
  
  // Function to edit a note
  function editNote(index) {
    // Get the notes from localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    // Get the note to be edited
    const note = notes[index];
    
    // Set the form fields to the note's current values
    document.getElementById('title').value = note.title;
    document.getElementById('content').value = note.content;
    
    // Set an attribute on the form to indicate the note being edited
    document.getElementById('noteForm').setAttribute('data-edit-index', index);
    document.getElementById('noteForm').querySelector('button').textContent = 'Update Note'; // Change button text to 'Update'
  }
  
  // Display notes on page load
  window.onload = displayNotes;
  