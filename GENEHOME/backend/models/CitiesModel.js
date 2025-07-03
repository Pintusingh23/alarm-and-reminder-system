import mongoose from 'mongoose';

const citiesSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    projects: {
        type: String,
        required: true,
        trim: true
    },
    landmark: {
        type: String,
        required: true,
        trim: true
    },
    landmarkImage: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const City = mongoose.model('City', citiesSchema);

export default City;
