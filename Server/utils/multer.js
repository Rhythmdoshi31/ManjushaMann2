const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads/videos',   // Folder inside Cloudinary
    resource_type: 'video',     // Important! For videos
    allowed_formats: ['mp4', 'mov', 'avi'],
  },
});

const upload = multer({ storage });

module.exports = upload;
