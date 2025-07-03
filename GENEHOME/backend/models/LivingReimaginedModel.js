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
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const LivingReimagined = mongoose.model('LivingReimagined', livingReimaginedSchema);

export default LivingReimagined;
