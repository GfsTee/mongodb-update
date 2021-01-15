require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Contact = require('./models/contacts')
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

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.post('/signup', (req, res) => {
    console.log(req.body)
    // const newContact = new Contact({
    //     name: req.body.name,
    //     email: req.body.email,
    //     tel: req.body.tel,
    //     gender: req.body.gender,
    //     statement: req.body.statement
    // })

    // hier erstellen wir einen neuen Contact mit Hilfe unseres Models! So haben wir alle Methoden, die unser Model auch hat! (save ...)
    // req.body funktioniert NUR wenn die HTML name Attribute und die keys in unserem model übereinstimmen!
    // Sonst muss man das obere verwenden und die keys unseres models mit den name Attributen im req.body verbinden
    const newContact = new Contact(req.body)
    newContact.save()
        .then(result => res.redirect('/contacts'))
        .catch(err => console.log(err))
})
app.get('/contacts', (req, res) => {
    Contact.find()
        .then(result => res.render('contacts', { contacts: result }))
        .catch(err => console.log(err))
})
app.get('/contacts/:id', (req, res) => {
    console.log(req.params.id)
    Contact.findById(req.params.id)
        .then(result => res.render('contact', { contact: result }))
        .catch(err => console.log(err))
})
// app.get('/contacts/:id/delete', (req, res) => {
//     Contact.findByIdAndDelete(req.params.id)
//         .then(result => res.redirect('/contacts'))
//         .catch(err => console.log(err))
// })
app.post('/contacts/:id/edit', (req, res) => {
    console.log(req.body)
    const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        gender: req.body.gender,
        statement: req.body.statement
    }
    Contact.findByIdAndUpdate(req.params.id, updatedUser)
        .then(result => res.redirect(`/contacts/${req.params.id}`))
        .catch(err => console.log(err))
})

app.delete('/contacts/:id', (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(result => {
            // kein redirect möglich, da fetch ein AJAX request ist und JSON / Text erwartet!
            // Dh wir müssen JSON zurücksenden und den redirect im Frondend lösen
            res.json({
                redirect: '/contacts'
            })
        })
        .catch(err => console.log(err))
})


app.use((req, res) => {
    res.status(404).render('404');
});