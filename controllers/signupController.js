const Contact = require('../models/contacts')

const signup_get = (req, res) => {
    res.render('signup')
}
const signup_post = (req, res) => {
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
}

module.exports = {
    signup_get,
    signup_post
}