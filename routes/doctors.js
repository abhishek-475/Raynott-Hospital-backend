const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctorsByDepartment,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  addSampleDoctors
} = require('../controllers/doctorController');

// GET /api/doctors - Get all doctors
router.get('/', getDoctors);

// GET /api/doctors/department/:department - Get doctors by department
router.get('/department/:department', getDoctorsByDepartment);

// GET /api/doctors/:id - Get single doctor by ID
router.get('/:id', getDoctorById);

// POST /api/doctors - Create new doctor
router.post('/', createDoctor);

// PUT /api/doctors/:id - Update doctor
router.put('/:id', updateDoctor);

// DELETE /api/doctors/:id - Delete doctor
router.delete('/:id', deleteDoctor);

// POST /api/doctors/sample - Add sample doctors (for testing)
router.post('/sample', addSampleDoctors);

module.exports = router;