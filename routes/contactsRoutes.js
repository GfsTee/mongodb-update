const express = require('express')
const router = express.Router()

const contactsController = require('../controllers/contactsController')

router.get('/', contactsController.contacts_index)

router.get('/:id', contactsController.contacts_userdetails_get)
// router.get('/:id/delete', (req, res) => {
//     Contact.findByIdAndDelete(req.params.id)
//         .then(result => res.redirect('/contacts'))
//         .catch(err => console.log(err))
// })
router.post('/:id/edit', contactsController.contacts_edit_put)

router.delete('/:id', contactsController.contacts_userdetails_delete)

module.exports = router