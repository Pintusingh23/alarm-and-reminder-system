import mongoose from 'mongoose';

const ourCoreSchema = new mongoose.Schema({
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

const OurCore = mongoose.model('OurCore', ourCoreSchema);

export default OurCore;
