require('dotenv').config();
/* Models */
require('./models/User');
require('./models/Track');
/* libraries */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/* routes */
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

/* middlewares */
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

/* mongo configuration */
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance.');
});
mongoose.connection.on('error', (err) => {
   console.error('Error connecting to mongo.', err);
});

/* routes list */
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Correctly listening on port');
});