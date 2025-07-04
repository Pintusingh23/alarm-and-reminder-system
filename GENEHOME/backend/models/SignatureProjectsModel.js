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
    features: {  // Changed from String to Array
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

const SignatureProject = mongoose.model('SignatureProject', signatureProjectSchema);

export default SignatureProject;