const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // Assuming you have authentication middleware

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    console.log('User ID from auth:', req.user.id); // Debug log
    
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error); // Debug log
    res.status(500).json({
      status: 'error',
      message: 'Error fetching profile',
      error: error.message
    });
  }
});

// Update user profile
router.patch('/profile', auth, async (req, res) => {
  try {
    console.log('Received update data:', req.body); // Debug log

    const updates = {};
    
    // Handle education update
    if (req.body.education) {
      updates.education = req.body.education;
    }
    
    // Handle profiles update
    if (req.body.profiles) {
      updates.profiles = req.body.profiles;
    }

    // Handle other fields if they exist
    const allowedUpdates = ['name', 'email', 'dateOfBirth', 'gender', 'phoneNumber'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    console.log('Applying updates:', updates); // Debug log

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    console.log('Updated user:', user); // Debug log

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(400).json({
      status: 'error',
      message: 'Error updating profile',
      error: error.message
    });
  }
});

module.exports = router;