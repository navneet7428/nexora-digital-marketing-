const express = require('express');
const router  = express.Router();
const store   = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

router.get('/', (_, res) => {
  const active = store.services.filter(s => s.active).sort((a,b) => a.order - b.order);
  res.json(active);
});

router.post('/', authMiddleware, (req, res) => {
  const s = { id: String(Date.now()), ...req.body, active: true };
  store.services.push(s);
  res.status(201).json(s);
});

router.put('/:id', authMiddleware, (req, res) => {
  const i = store.services.findIndex(s => s.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: 'Not found' });
  store.services[i] = { ...store.services[i], ...req.body };
  res.json(store.services[i]);
});

router.delete('/:id', authMiddleware, (req, res) => {
  const i = store.services.findIndex(s => s.id === req.params.id);
  if (i !== -1) store.services.splice(i, 1);
  res.json({ success: true });
});

module.exports = router;
