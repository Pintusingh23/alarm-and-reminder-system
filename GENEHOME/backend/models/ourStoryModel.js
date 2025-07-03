import mongoose from 'mongoose';

const ourStorySchema = new mongoose.Schema({
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

const OurStory = mongoose.model('OurStory', ourStorySchema);

export default OurStory;
