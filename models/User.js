const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'recruiter', 'admin'],
    default: 'student'
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  phoneNumber: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },


  //educaion section 
  education: [{
    instituteName: {
      type: String,
      required: [true, 'Please provide institute name']
    },
    marksObtained: {
      type: Number,
      required: [true, 'Please provide marks obtained'],
      min: 0,
      max: 100
    },
    yearOfCompletion: {
      type: Number,
      required: [true, 'Please provide year of completion']
    }
  }],


  //profile section 
  profiles: {
    github: {
      type: String,
      trim: true
    },
    leetcode: {
      type: String,
      trim: true
    },
    hackerrank: {
      type: String,
      trim: true
    },
    hackerearth: {
      type: String,
      trim: true
    },
    codechef: {
      type: String,
      trim: true
    },
    portfolio: {
      type: String,
      trim: true
    }
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);