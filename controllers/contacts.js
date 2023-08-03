const { Contact } = require('../models/contact');

const { HttpError, controllerWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
        throw new HttpError(404, 'Contact not found');
    }

    res.json(result);
};

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);

    if (!result) {
        throw new HttpError(404, 'Contact not found');
    }

    res.json({ message: 'Delete success!', result });
};

const updateContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
        throw new HttpError(404, 'Contact not found');
    }

    res.json(result);
};

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw new HttpError(404, 'Contact not found');
    }
    res.json(result);
};

module.exports = {
    getAllContacts: controllerWrapper(getAllContacts),
    getContactById: controllerWrapper(getContactById),
    addContact: controllerWrapper(addContact),
    deleteContactById: controllerWrapper(deleteContactById),
    updateContactById: controllerWrapper(updateContactById),
    updateFavorite: controllerWrapper(updateFavorite),
};