const Doctor = require('../models/Doctor');

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ 
      success: true, 
      doctors 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Get doctors by department
const getDoctorsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    
    const doctors = await Doctor.find({ department });
    res.status(200).json({ 
      success: true, 
      doctors 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Get single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const doctor = await Doctor.findById(id);
    
    if (!doctor) {
      return res.status(404).json({ 
        success: false, 
        error: 'Doctor not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      doctor 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Create new doctor
const createDoctor = async (req, res) => {
  try {
    const {
      name,
      specialization,
      department,
      experience,
      education,
      image,
      availability,
      bio
    } = req.body;

    const doctor = new Doctor({
      name,
      specialization,
      department,
      experience,
      education,
      image,
      availability,
      bio
    });

    await doctor.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Doctor created successfully', 
      doctor 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Update doctor
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      specialization,
      department,
      experience,
      education,
      image,
      availability,
      bio,
      isActive
    } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      id,
      {
        name,
        specialization,
        department,
        experience,
        education,
        image,
        availability,
        bio,
        isActive
      },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({ 
        success: false, 
        error: 'Doctor not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Doctor updated successfully',
      doctor 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Delete doctor
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    
    const doctor = await Doctor.findByIdAndDelete(id);
    
    if (!doctor) {
      return res.status(404).json({ 
        success: false, 
        error: 'Doctor not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Doctor deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Add sample doctors (for testing)
const addSampleDoctors = async (req, res) => {
  try {
    const sampleDoctors = [
      {
        name: "Dr. Sarah Johnson",
        specialization: "Cardiologist",
        department: "Cardiology",
        experience: "15 years",
        education: "MD, Cardiology - Harvard Medical School"
      },
      {
        name: "Dr. Michael Chen",
        specialization: "Neurologist",
        department: "Neurology",
        experience: "12 years",
        education: "MD, Neurology - Johns Hopkins University"
      },
      {
        name: "Dr. Emily Rodriguez",
        specialization: "Orthopedic Surgeon",
        department: "Orthopedics",
        experience: "10 years",
        education: "MD, Orthopedics - Stanford University"
      },
      {
        name: "Dr. James Wilson",
        specialization: "Pediatrician",
        department: "Pediatrics",
        experience: "8 years",
        education: "MD, Pediatrics - Boston Children's Hospital"
      },
      {
        name: "Dr. Priya Sharma",
        specialization: "Dermatologist",
        department: "Dermatology",
        experience: "11 years",
        education: "MD, Dermatology - Mayo Clinic"
      }
    ];

    await Doctor.deleteMany({}); // Clear existing
    const doctors = await Doctor.insertMany(sampleDoctors);
    
    res.status(201).json({ 
      success: true, 
      message: 'Sample doctors added', 
      doctors 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getDoctors,
  getDoctorsByDepartment,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  addSampleDoctors
};