require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser requests (no origin header) and any listed origin
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

app.use('/api/contact',  require('./routes/contact'));
app.use('/api/services', require('./routes/services'));
app.use('/api/cases',    require('./routes/cases'));
app.use('/api/stats',    require('./routes/stats'));
app.use('/api/admin',    require('./routes/admin'));

app.get('/api/health', (_, res) => res.json({ status: 'NEXORA API online', timestamp: new Date(), database: 'in-memory' }));

app.use((_, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, _, res, __) => { console.error(err.stack); res.status(err.status || 500).json({ error: err.message || 'Server error' }); });

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 NEXORA server running on port ${PORT}`);
  console.log('⚡ Running with in-memory data store (no MongoDB)');
});
