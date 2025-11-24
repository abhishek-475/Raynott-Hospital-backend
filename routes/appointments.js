const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentsByEmail
} = require('../controllers/appointmentController');

// POST /api/appointments - Create new appointment
router.post('/', createAppointment);

// GET /api/appointments - Get all appointments
router.get('/', getAppointments);

// GET /api/appointments/:id - Get single appointment by ID
router.get('/:id', getAppointmentById);

// PUT /api/appointments/:id/status - Update appointment status
router.put('/:id/status', updateAppointmentStatus);

// DELETE /api/appointments/:id - Delete appointment
router.delete('/:id', deleteAppointment);

// GET /api/appointments/email/:email - Get appointments by patient email
router.get('/email/:email', getAppointmentsByEmail);

module.exports = router;