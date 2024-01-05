// const express = require('express');
// const app = express();
// const port = 5000;

// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// backend/app.js


const express = require('express');
const mongoose = require('mongoose');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/real-estate-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api', propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

