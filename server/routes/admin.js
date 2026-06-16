const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const store   = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'nexora_secret_2035';

// ── POST /api/admin/login ──
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  if (username !== store.ADMIN.username || password !== store.ADMIN.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, username });
});

// ── GET /api/admin/verify ──
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, username: req.admin.username });
});

// ── GET /api/admin/dashboard ──
router.get('/dashboard', authMiddleware, (req, res) => {
  const all     = store.getContacts();
  const newOnes = all.filter(c => c.status === 'new');
  res.json({
    totalContacts:  all.length,
    newContacts:    newOnes.length,
    services:       store.services.filter(s => s.active).length,
    cases:          store.cases.length,
    recentContacts: all.slice(0, 5)
  });
});

module.exports = router;
