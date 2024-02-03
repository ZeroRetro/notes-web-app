import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <form className="note-form">
        <input placeholder="Title" required />
        <textarea placeholder="Content" rows={10} required />
        <button type="submit" className="createButton">
          Add Note
        </button>
        <div className="notes-grid">
          <div className="note-item">
            <div className="notes-header">
              <button className="deleteButton">x</button>
            </div>
            <h2>Note Title</h2>
            <p>Note Content</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
