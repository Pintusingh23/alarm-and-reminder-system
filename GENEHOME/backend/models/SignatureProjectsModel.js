import mongoose from 'mongoose';

const signatureProjectSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    features: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const SignatureProject = mongoose.model('SignatureProject', signatureProjectSchema);

export default SignatureProject;
