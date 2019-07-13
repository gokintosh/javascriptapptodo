document.getElementById('noteInputForm').addEventListener('submit', saveNote);

function saveNote(e) {
  var noteTitle = document.getElementById('noteTitleInput').value;
  var noteTag = document.getElementById('noteTagInput').value;
  var noteSubject = document.getElementById('noteSubjectInput').value;
  var noteId = chance.guid();
  var noteStatus = 'Open';

  var note = {
    id: noteId,
    title: noteTitle,
    tag: noteTag,
    subject: noteSubject,
    status: noteStatus
  }

  if (localStorage.getItem('notes') == null) {
    var notes = [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  } else {
    var notes = JSON.parse(localStorage.getItem('notes'));
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  document.getElementById('noteInputForm').reset();

  fetchNotes();

  e.preventDefault();
}

function setStatusClosed(id) {
  var notes = JSON.parse(localStorage.getItem('notes'));

  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == id) {
      notes[i].status = 'Closed';
    }
  }

  localStorage.setItem('notes', JSON.stringify(notes));

  fetchNotes();
}

function deleteNote(id) {
  var notes = JSON.parse(localStorage.getItem('notes'));

  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == id) {
      notes.splice(i, 1);
    }
  }

  localStorage.setItem('notes', JSON.stringify(notes));

  fetchNotes();
}

function fetchNotes() {
  var notes = JSON.parse(localStorage.getItem('notes'));
  var notesList = document.getElementById('notesList');

  notesList.innerHTML = '';

  for (var i = 0; i < notes.length; i++) {
    var id = notes[i].id;
    var title = notes[i].title;
    var tag = notes[i].tag;
    var subject = notes[i].subject;
    var status = notes[i].status;

    notesList.innerHTML +=   '<div class="well">'+
                              '<h6>Note ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + title + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + tag + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + subject + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteNote(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}
