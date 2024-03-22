import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const notes = [
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
]

app.get('/api/notes', async (req, res) => {
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const { title, content, id } = req.body;

  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }

  const newNote = {
    id,
    title,
    content,
  };

  notes.push(newNote);
  res.json(newNote);
});

app.put('/api/notes/:id', async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }

  if (!id || isNaN(id)) {
    return res.status(400).send('Invalid note id');
  }

  const updatedNote = {
    id,
    title,
    content,
  };

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return res.status(404).send('Note not found');
  }

  notes[noteIndex] = updatedNote;
  res.json(updatedNote);
});

app.delete('/api/notes/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send('Invalid note id');
  }

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return res.status(404).send('Note not found');
  }

  notes.splice(noteIndex, 1);
  res.status(200).send('Note deleted');
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
