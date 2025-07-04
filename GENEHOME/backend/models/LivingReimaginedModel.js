import mongoose from 'mongoose';

const livingReimaginedSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    items: {
        type: [String], // Changed to array of strings
        required: true,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'Items array must contain at least one item'
        }
    }
}, {
    timestamps: true
});

const LivingReimagined = mongoose.model('LivingReimagined', livingReimaginedSchema);

export default LivingReimagined;