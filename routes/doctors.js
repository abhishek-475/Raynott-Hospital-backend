const express = require('express');
const {
  getDoctors,
  getDoctorsByDepartment,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  addSampleDoctors
} = require('../controllers/doctorController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', getDoctors);
router.get('/department/:department', getDoctorsByDepartment);
router.get('/:id', getDoctorById);
router.post('/', protect, admin, createDoctor);
router.put('/:id', protect, admin, updateDoctor);
router.delete('/:id', protect, admin, deleteDoctor);
router.post('/sample', protect, admin, addSampleDoctors);

module.exports = router;