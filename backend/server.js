if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')

const url = process.env.CONNECT_STRING;
(async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        await mongoose.connect(url, connectionParams)
        console.log('Connected to the database ')
    } catch (err) {
        console.error(`Error connecting to the database. \n${err}`);
    }
})();

const apiRoute = require('./routes/api.js');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api/', apiRoute);

app.get('/', async (req, res) => {
    res.json({ message: `Hello there! Go to ${process.env.APP_URL}/api` });
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
    console.log(`Visit ${process.env.APP_URL}:${PORT} ...`);
})