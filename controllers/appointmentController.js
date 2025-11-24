const Appointment = require('../models/Appointment');

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Public
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

    // Validate required fields
    if (!patientName || !patientEmail || !patientPhone || !doctor || !department || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        error: 'Please fill all required fields'
      });
    }

    // Check for existing appointment at same date/time with same doctor
    const existingAppointment = await Appointment.findOne({
      appointmentDate,
      appointmentTime,
      doctor,
      status: { $in: ['Pending', 'Confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        error: 'This time slot is already booked with the selected doctor. Please choose another time.'
      });
    }

    const appointment = new Appointment({
      patientName,
      patientEmail,
      patientPhone,
      doctor,
      department,
      appointmentDate,
      appointmentTime,
      message,
      status: 'Pending'
    });

    await appointment.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Appointment booked successfully', 
      data: appointment 
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }
    
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: appointments.length,
      data: appointments 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// @desc    Get single appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appointment not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: appointment 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private/Admin
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: Pending, Confirmed, Cancelled, Completed'
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
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
      message: 'Appointment status updated successfully',
      data: appointment 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appointment not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Appointment deleted successfully',
      data: appointment 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// @desc    Get appointments by patient email
// @route   GET /api/appointments/email/:email
// @access  Private
const getAppointmentsByEmail = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientEmail: req.params.email }).sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: appointments.length,
      data: appointments 
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