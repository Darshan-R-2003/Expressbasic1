const express = require('express');

const app = express();
const port = 3000;

let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.get('/message', (req, res) => {
  res.send('Hello from the server!');
});

app.put('/items/:id', express.json(), (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const index = items.findIndex(item => item.id === itemId);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.put('/message', express.json(), (req, res) => {
  const updatedMessage = req.body.message;
  res.send(`Updated message: ${updatedMessage}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
