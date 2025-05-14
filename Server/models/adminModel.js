const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    videoUrl: {
        type: String,  // Will store the video URL from Cloudinary
    },
    videoPublicId: {
        type: String,  // Will store the Cloudinary public ID for easy reference
    },
    videoText: {
        type: String,
    }
    
})

module.exports = mongoose.model('admin', userSchema);
