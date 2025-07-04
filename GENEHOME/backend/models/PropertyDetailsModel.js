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
    features: {  // Changed from 'feature' to 'features' array
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'At least one feature is required'
        }
    }
}, {
    timestamps: true
});

const PropertyDetail = mongoose.model('PropertyDetail', propertyDetailsSchema);

export default PropertyDetail;