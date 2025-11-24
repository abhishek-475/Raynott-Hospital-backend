const express = require('express');
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentsByEmail
} = require('../controllers/appointmentController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.post('/', createAppointment);
router.get('/', protect, admin, getAppointments);
router.get('/:id', protect, getAppointmentById);
router.put('/:id/status', protect, admin, updateAppointmentStatus);
router.delete('/:id', protect, admin, deleteAppointment);
router.get('/email/:email', protect, getAppointmentsByEmail);

module.exports = router;