import Partner from '../models/PartnersModel.js';

// ➤ Create Partner
export const createPartner = async (req, res) => {
    try {
        const {
            fullName,
            partnershipType,
            contactNumber,
            email,
            city,
            state,
            streetAddress,
            googleMapLink,
            area,
            currentLandUse,
            reraNumber,
            additionalRemarks
        } = req.body;

        const documents = req.file ? req.file.filename : '';

        if (!fullName || !partnershipType || !contactNumber || !email || !city || !state) {
            return res.status(400).json({ message: 'Full Name, Partnership Type, Contact Number, Email, City, and State are required' });
        }

        const newPartner = new Partner({
            fullName,
            partnershipType,
            contactNumber,
            email,
            city,
            state,
            streetAddress,
            googleMapLink,
            area,
            currentLandUse,
            reraNumber,
            additionalRemarks,
            documents
        });

        const savedPartner = await newPartner.save();
        res.status(201).json(savedPartner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Partners
export const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find().sort({ createdAt: -1 });
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Partner by ID
export const getPartnerById = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) return res.status(404).json({ message: 'Partner not found' });
        res.status(200).json(partner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Partner
export const updatePartner = async (req, res) => {
    try {
        const {
            fullName,
            partnershipType,
            contactNumber,
            email,
            city,
            state,
            streetAddress,
            googleMapLink,
            area,
            currentLandUse,
            reraNumber,
            additionalRemarks
        } = req.body;

        const documents = req.file ? req.file.filename : null;

        const updatedData = {
            fullName,
            partnershipType,
            contactNumber,
            email,
            city,
            state,
            streetAddress,
            googleMapLink,
            area,
            currentLandUse,
            reraNumber,
            additionalRemarks
        };

        if (documents) {
            updatedData.documents = documents;
        }

        const updatedPartner = await Partner.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedPartner) return res.status(404).json({ message: 'Partner not found' });

        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Partner
export const deletePartner = async (req, res) => {
    try {
        const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
        if (!deletedPartner) return res.status(404).json({ message: 'Partner not found' });

        res.status(200).json({ message: 'Partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
