const express = require('express');
const router  = express.Router();
const store   = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

// ── Submit contact form (public) ──
router.post('/', (req, res) => {
  const { name, email, company, budget, message } = req.body;

  // Basic validation
  if (!name?.trim())    return res.status(422).json({ error: 'Name is required' });
  if (!email?.trim() || !/\S+@\S+\.\S+/.test(email)) return res.status(422).json({ error: 'Valid email required' });
  if (!company?.trim()) return res.status(422).json({ error: 'Company is required' });
  if (!message?.trim() || message.trim().length < 10) return res.status(422).json({ error: 'Message must be at least 10 characters' });

  const contact = store.addContact({ name: name.trim(), email: email.trim().toLowerCase(), company: company.trim(), budget: budget || '', message: message.trim() });

  console.log(`📬 New submission from ${name} <${email}> — ${company}`);

  res.status(201).json({
    success: true,
    message: 'Transmission received. We will respond within 24 hours.',
    id: contact.id
  });
});

// ── List all contacts (admin only) ──
router.get('/', authMiddleware, (req, res) => {
  const { status, page = 1, limit = 50 } = req.query;
  const all    = store.getContacts(status);
  const start  = (page - 1) * limit;
  const paged  = all.slice(start, start + Number(limit));
  res.json({ contacts: paged, total: all.length, page: Number(page), pages: Math.ceil(all.length / limit) });
});

// ── Update contact status / notes (admin only) ──
router.patch('/:id', authMiddleware, (req, res) => {
  const updated = store.updateContactById(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Contact not found' });
  res.json({ success: true, contact: updated });
});

// ── Delete contact (admin only) ──
router.delete('/:id', authMiddleware, (req, res) => {
  const deleted = store.deleteContactById(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Contact not found' });
  res.json({ success: true });
});

module.exports = router;
