const { Contact } = require('../models/contact');
const { HttpError, controllerWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, '', { skip, limit }).populate(
        'owner',
        'name email'
    );
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
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
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

const updateFavoriteContact = async (req, res) => {
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
    updateFavoriteContact: controllerWrapper(updateFavoriteContact),
};