const express = require('express');
const router  = express.Router();
const store   = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

router.get('/', (_, res) => {
  res.json(store.stats.sort((a,b) => a.order - b.order));
});

router.put('/:id', authMiddleware, (req, res) => {
  const i = store.stats.findIndex(s => s.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: 'Not found' });
  store.stats[i] = { ...store.stats[i], ...req.body };
  res.json(store.stats[i]);
});

module.exports = router;
