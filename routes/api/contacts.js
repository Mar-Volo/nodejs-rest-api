const express = require("express");

const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateFavoriteContact,
} = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { contactSchemas } = require("../../schemas");

const router = express.Router();

router.get("/", authenticate, getAllContacts);

router.get("/:id", authenticate, isValidId, getContactById);

router.post(
  "/",
  authenticate,
  validateBody(contactSchemas.addSchema),
  addContact
);

router.delete("/:id", authenticate, isValidId, deleteContactById);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(contactSchemas.addSchema),
  updateContactById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(contactSchemas.updateFavoriteSchema),
  updateFavoriteContact
);

module.exports = router;
