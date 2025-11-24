require('dotenv').config()
const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')


// Import routes
const appointmentRoutes = require('./routes/appointments');
const doctorRoutes = require('./routes/doctors');
const contactRoutes = require('./routes/contact'); 
const authRoutes = require('./routes/auth')




const app = express()


app.use(cors())
app.use(express.json())


connectDB()



// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Raynott Multi Speciality Hospital API is running!',
        version: '1.0.0'
    });
});


const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);

})