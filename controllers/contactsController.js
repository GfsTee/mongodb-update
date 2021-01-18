// Hier sollen ALLE Funktionen sein, die unsere contacts routes ausführen!

const Contact = require('../models/contacts')

const contacts_index = (req, res) => {
    Contact.find()
        .then(result => res.render('contacts', { contacts: result }))
        .catch(err => console.log(err))
}

const contacts_userdetails_get = (req, res) => {
    console.log(req.params.id)
    Contact.findById(req.params.id)
        .then(result => res.render('contact', { contact: result }))
        .catch(err => console.log(err))
}

const contacts_edit_put = (req, res) => {
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
}

const contacts_userdetails_delete = (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(result => {
            // kein redirect möglich, da fetch ein AJAX request ist und JSON / Text erwartet!
            // Dh wir müssen JSON zurücksenden und den redirect im Frondend lösen
            res.json({
                redirect: '/contacts'
            })
        })
        .catch(err => console.log(err))
}

module.exports = {
    contacts_index: contacts_index,
    contacts_userdetails_get,
    contacts_edit_put,
    contacts_userdetails_delete
}