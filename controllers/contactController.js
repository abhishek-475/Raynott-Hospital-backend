const Contact = require('../models/Contact');

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Save to database only
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    await contact.save();
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Get all contact messages (for admin)
const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      messages 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = { submitContactForm, getContactMessages };