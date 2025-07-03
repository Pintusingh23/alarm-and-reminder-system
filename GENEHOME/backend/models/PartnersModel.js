import mongoose from 'mongoose';

const partnersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    partnershipType: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    streetAddress: {
        type: String,
        default: '',
        trim: true
    },
    googleMapLink: {
        type: String,
        default: '',
        trim: true
    },
    area: {
        type: String,
        default: '',
        trim: true
    },
    currentLandUse: {
        type: String,
        default: '',
        trim: true
    },
    reraNumber: {
        type: String,
        default: '',
        trim: true
    },
    additionalRemarks: {
        type: String,
        default: '',
        trim: true
    },
    documents: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Partner = mongoose.model('Partner', partnersSchema);

export default Partner;
