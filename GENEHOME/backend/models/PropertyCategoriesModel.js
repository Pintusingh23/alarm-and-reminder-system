import mongoose from 'mongoose';

const propertyCategorySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    stats: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const PropertyCategory = mongoose.model('PropertyCategory', propertyCategorySchema);

export default PropertyCategory;
