const mongoose = require('mongoose');
require('dotenv').config();
const { MONGO_DATABASE, MONGO_HOST } = process.env

const MONGO_URI = `mongodb://${MONGO_HOST}/${MONGO_DATABASE}`;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('DB connected'))
.catch(err => console.log(err));
