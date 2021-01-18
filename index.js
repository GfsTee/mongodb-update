require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const Contact = require('./models/contacts')
const contactsRoutes = require('./routes/contactsRoutes')

// DB Connection
mongoose.connect(process.env.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
    })
    .catch(err => console.log(err))

// Express Middleware
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.get('/', (req, res) => {
    res.render('index')
})


// Der erste Parameter spezifiziert bei welchen URLS er schauen soll, der zweite in welcher Datei
app.use('/contacts', contactsRoutes)
// Vorteil: Übersichtlicher 
// und URL Struktur im Nachhinein einfacherer zu ändern
const signupRoutes = require('./routes/signupRoutes')
app.use('/signup', signupRoutes)

// MVC - Model View Controler
// eine Art euren Code und eure Dateien zu strukturieren
// Hilft den Code modularer, wiederverwendbarer und einfacher lesbar zu gestalten
// der Controller ist ein "Mittelsmann" zwischen dem Model und dem View

app.use((req, res) => {
    res.status(404).render('404');
});