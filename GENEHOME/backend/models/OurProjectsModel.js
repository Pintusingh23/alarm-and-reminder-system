import mongoose from 'mongoose';

const ourProjectsSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const OurProject = mongoose.model('OurProject', ourProjectsSchema);

export default OurProject;
