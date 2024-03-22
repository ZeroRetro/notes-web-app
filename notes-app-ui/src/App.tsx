import React, { useEffect, useState } from 'react';
import './App.css';

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notes');
      const notes: Note[] = await response.json();
      setNotes(notes);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCreateNote = async (note: Note) => {
    try {
      await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
    } catch (error) {
      console.error(error);
    }
  }

  const fetchUpdateNote = async (note: Note) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
    } catch (error) {
      console.error(error);
    }
  }

  const fetchDeleteNote = async (noteId: number) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Note = {
      id: notes.length + 1,
      title: newTitle,
      content: newContent,
    };
    setNotes([...notes, newNote]);
    setNewTitle('');
    setNewContent('');

    fetchCreateNote(newNote);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setNewTitle(note.title);
    setNewContent(note.content);
  };

  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNote) return;

    const updatedNote: Note = {
      id: selectedNote.id,
      title: newTitle,
      content: newContent,
    };

    const updatedNotesList = notes.map((note) => {
      if (note.id === selectedNote.id) {
        return updatedNote;
      }
      return note;
    });

    setNotes(updatedNotesList);
    handleCancel();

    fetchUpdateNote(updatedNote);
  };

  const handleCancel = () => {
    setNewTitle('');
    setNewContent('');
    setSelectedNote(null);
  };

  const deleteNote = (e: React.MouseEvent, noteId: number) => {
    e.stopPropagation();
    const updatedNotesList = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotesList);
    handleCancel();

    fetchDeleteNote(noteId);
  };

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(e) =>
          selectedNote ? handleUpdateNote(e) : handleAddNote(e)
        }
      >
        <input
          placeholder="Title"
          required
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          rows={10}
          required
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit" className="updateButton">
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancelButton"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit" className="createButton">
            Add Note
          </button>
        )}
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div
            className="note-item"
            key={note.id}
            onClick={() => handleNoteClick(note)}
          >
            <div className="notes-header">
              <button
                className="deleteButton"
                onClick={(e) => deleteNote(e, note.id)}
              >
                x
              </button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
