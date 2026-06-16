const express = require('express');
const router  = express.Router();
const store   = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

router.get('/', (_, res) => {
  res.json(store.cases.sort((a,b) => a.order - b.order));
});

router.post('/', authMiddleware, (req, res) => {
  const c = { id: String(Date.now()), ...req.body };
  store.cases.push(c);
  res.status(201).json(c);
});

router.put('/:id', authMiddleware, (req, res) => {
  const i = store.cases.findIndex(c => c.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: 'Not found' });
  store.cases[i] = { ...store.cases[i], ...req.body };
  res.json(store.cases[i]);
});

router.delete('/:id', authMiddleware, (req, res) => {
  const i = store.cases.findIndex(c => c.id === req.params.id);
  if (i !== -1) store.cases.splice(i, 1);
  res.json({ success: true });
});

module.exports = router;
