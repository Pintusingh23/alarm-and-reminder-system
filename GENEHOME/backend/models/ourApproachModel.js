import mongoose from 'mongoose';

const ourApproachSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
});

const OurApproach = mongoose.model('OurApproach', ourApproachSchema);

export default OurApproach;
