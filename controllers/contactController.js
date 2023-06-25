const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel');
//the controllers will contain all our logic for the request response and connest with the database
//@route GET /api/contacts
//@desc get all the contacts
//@access private

const getContacts = asyncHandler(async(req,res)=>{
    const contacts =await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
});

//@route POST/api/contacts
//@desc create contacts
//@access private

const createContact = asyncHandler(async(req,res)=>{
      console.log("the request body is :",req.body);
      const {name,email,phone}=req.body;
      if(!name||!email||!phone){
        res.status(400);
        throw new Error("all fields are mandatory");
      }
      const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
      });
    res.status(201).json(contact);
});

//@route GET /api/contacts/;id
//@desc get all the contacts
//@access private

const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//@route PUT /api/contacts
//@desc update contacts
//@access private

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if(contact.user_id.toString()!== req.user.id){
        res.status(403)
        throw new Error("user do not have the permission to update other user contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});

//@route DELETE /api/contacts
//@desc delete contacts
//@access private

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
      if(contact.user_id.toString()!== req.user.id){
        res.status(403)
        throw new Error("user do not have the permission to delete other user contacts");
    }
    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json(contact);
});

module.exports= {getContacts, 
                 createContact,
                 getContact, 
                updateContact, 
                deleteContact};