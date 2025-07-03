import mongoose from 'mongoose';

const propertyDetailsSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    feature: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const PropertyDetail = mongoose.model('PropertyDetail', propertyDetailsSchema);

export default PropertyDetail;
