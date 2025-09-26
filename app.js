const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const routes = require('./routes');

// Middleware
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Use routes
app.use('/base/v1/test', require('./routes/test/controller'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
