const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [emailRegex, 'Enter a valid email.'],
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            match: [phoneRegex, 'Enter a valid phone number.'],
        },

        favorite: {
            type: Boolean,
            default: false,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
};
