const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const mongoose = require('mongoose')


app.use(cors());

app.use(express.json()); // Middleware to handle JSON requests


const booksRouter = require('./routes/book');
app.use('/books', booksRouter);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);


// route
app.get('/', (req, res) => {
    res.send('Welcome here!')
})



// connection to database
mongoose.set("strictQuery", false)
mongoose.
    connect('mongodb+srv://admin:pc4VSkZ9UGxy7ncq@mdwasimalamdb.pwg2nxb.mongodb.net/Node-API?retryWrites=true&w=majority&appName=mdwasimalamdb')
    .then(() => {
        console.log('Connected to Mongo dB database');
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    }).catch((error) => { console.log(error) })