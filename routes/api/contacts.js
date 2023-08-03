const express = require('express');

const {
    getAllContacts,
    getContactById,
    addContact,
    deleteContactById,
    updateContactById,
    updateFavorite,
} = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', getAllContacts);

router.get('/:id', isValidId, getContactById);

router.post('/', validateBody(schemas.addSchema), addContact);

router.delete('/:id', isValidId, deleteContactById);

router.put('/:id', isValidId, validateBody(schemas.addSchema), updateContactById);

router.patch(
    '/:id/favorite',
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    updateFavorite
);

module.exports = router;
