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

  useEffect(() => {
    setNotes([
      {
        id: 1,
        title: 'Note Title 1',
        content: 'Note Content 1',
      },
      {
        id: 2,
        title: 'Note Title 2',
        content: 'Note Content 2',
      },
      {
        id: 3,
        title: 'Note Title 3',
        content: 'Note Content 3',
      },
      {
        id: 4,
        title: 'Note Title 4',
        content: 'Note Content 4',
      },
    ]);
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
