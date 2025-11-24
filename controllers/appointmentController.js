const Appointment = require('../models/Appointment');

// Create appointment
const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      patientEmail,
      patientPhone,
      doctor,
      department,
      appointmentDate,
      appointmentTime,
      message
    } = req.body;

    const appointment = new Appointment({
      patientName,
      patientEmail,
      patientPhone,
      doctor,
      department,
      appointmentDate,
      appointmentTime,
      message
    });

    await appointment.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Appointment booked successfully', 
      appointment 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      appointments 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Get single appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await Appointment.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appointment not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      appointment 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appointment not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Appointment status updated',
      appointment 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await Appointment.findByIdAndDelete(id);
    
    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appointment not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Appointment deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Get appointments by patient email
const getAppointmentsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    
    const appointments = await Appointment.find({ patientEmail: email }).sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      appointments 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentsByEmail
};