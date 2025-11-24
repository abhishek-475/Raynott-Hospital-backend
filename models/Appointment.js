const mongoose = require('mongoose')


const appoinmentSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
            required: true
        },
        patientEmail: {
            type: String,
            required: true
        },
        patientPhone: {
            type: String,
            required: true
        },
        doctor: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        appointmentDate: {
            type: Date,
            required: true
        },
        appointmentTime: {
            type: String,
            required: true
        },
        message: {
            type: String
        },
        status: {
            type: String,

        }
    }, { timestamps: true })


module.exports = mongoose.model('Appointment', appoinmentSchema)