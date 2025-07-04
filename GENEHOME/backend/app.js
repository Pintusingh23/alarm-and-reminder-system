import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDb } from './config/dB.js';
import bannerRoutes from './routes/bannerRoutes.js';
import livingSpaceRoutes from './routes/livingSpaceRoutes.js';
import journeyRoutes from './routes/journeyRoutes.js';
import whyChooseRoutes from './routes/WhyChooseRoutes.js';
import featuresRoutes from './routes/featuresRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import ourStoryRoutes from './routes/OurStoryRoutes.js';
import ourCoreRoutes from './routes/ourCoreRoutes.js';
import ourApproachRoutes from './routes/ourApproachRoutes.js';
import teamRoutes from './routes/TeamRoutes.js';
import propertyCategoriesRoutes from './routes/PropertyCategoriesRoutes.js';
import propertyDetailsRoutes from './routes/PropertyDetailsRoutes.js';
import signatureProjectsRoutes from './routes/SignatureProjectsRoutes.js';
import livingReimaginedRoutes from './routes/LivingReimaginedRoutes.js';
import ourProjectsRoutes from './routes/OurProjectsRoutes.js';
import servicesRoutes from './routes/ServicesRoutes.js';
import partnersRoutes from './routes/PartnersRoutes.js';
import citiesRoutes from './routes/CitiesRoutes.js';
import usersRoutes from './routes/UsersRoutes.js';



const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const PORT = 5001

connectDb();
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



app.use('/api/banners', bannerRoutes);
app.use('/api/livingspaces', livingSpaceRoutes);
app.use('/api/journeys', journeyRoutes); 
app.use('/api/whychoose', whyChooseRoutes);
app.use('/api/features', featuresRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/ourstory', ourStoryRoutes);
app.use('/api/ourcore', ourCoreRoutes);
app.use('/api/ourapproach', ourApproachRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/propertycategories', propertyCategoriesRoutes);
app.use('/api/property-details', propertyDetailsRoutes);
app.use('/api/signatureprojects', signatureProjectsRoutes);
app.use('/api/livingreimagined', livingReimaginedRoutes);
app.use('/api/ourprojects', ourProjectsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/cities', citiesRoutes);
app.use('/api/users', usersRoutes);



app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});