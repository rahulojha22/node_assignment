const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const serviceRoutes = require('./routes/service');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', serviceRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
  console.log('Database connected...');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log('Error: ' + err));
