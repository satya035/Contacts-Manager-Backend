const express = require('express');
const router = express.Router();
const {getContacts,
        createContact,
         getContact, 
        updateContact, 
        deleteContact}= require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken);        
// router.route('/').get((req,res)=>{
//     // res.send('get all the contacts'); this is not in json format
//     // res.json({message:'get all the contacts'});
//     res.status(200).json({message:'get all the contacts'});
// });
router.route('/').get(getContacts).post(createContact);
// router.route('/').post(createContact);
// router.route('/').get(getContacts);
//these lines are similar so can be combined like this

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);
// router.route('/:id').get(getContact);
// router.route('/:id').put(updateContact);
// router.route('/:id').delete(deleteContact);

module.exports = router;