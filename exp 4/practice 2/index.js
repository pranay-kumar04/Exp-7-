const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory array to store cards
let cards = [
  { id: 1, suit: 'Hearts', value: 'Ace' },
  { id: 2, suit: 'Spades', value: 'King' },
  { id: 3, suit: 'Diamonds', value: 'Queen' }
];

// GET all cards
app.get('/cards', (req, res) => {
  res.json(cards);
});

// GET a card by ID
app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: 'Card not found' });
  res.json(card);
});

// POST a new card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  const newCard = { id: cards.length + 1, suit, value };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// DELETE a card by ID
app.delete('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: 'Card not found' });

  const removedCard = cards.splice(index, 1)[0];
  res.json({ message: `Card with ID ${id} removed`, card: removedCard });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
