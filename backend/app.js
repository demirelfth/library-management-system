const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const borrowRoutes = require('./routes/borrow');
const cors = require('cors');

const app = express();

// CORS settings
app.use(cors({
  origin: 'http://localhost:3200',
}));

app.use(bodyParser.json());
app.use('/', borrowRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});