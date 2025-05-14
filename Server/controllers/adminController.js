const adminModel = require("../models/adminModel");
const visitModel = require("../models/visitModel");

module.exports.dashboardController = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  const todaysVisits = await visitModel.findOne({ date: today });

  const allCounts = todaysVisits?.lastWeekCounts || [];
  const lastWeekCounts = allCounts.length > 7 ? allCounts.slice(-7) : allCounts;
  const yesterdaysVisitCount = lastWeekCounts[lastWeekCounts.length - 1] || 0;

    res.json({
      date: today,
      todaysCount: todaysVisits.count ,
      yesterdaysVisitCount,
      lastWeekCounts
    });
};

module.exports.uploadController = async (req, res) => {
    try {
      const video = req.file.path; // Cloudinary returns the URL in .path
      console.log(video);    
      const admin = await adminModel.findById(req.user._id);
      
      // If old video exists, delete from Cloudinary
      if (admin.videoPublicId) {
        const cloudinary = require('../utils/cloudinary');
        await cloudinary.uploader.destroy(admin.videoPublicId, { resource_type: 'video' });
      }
      // Save new video
      admin.videoUrl = video;
      admin.videoPublicId = req.file.filename; // Needed for deleting next time
      admin.videoText = req.body.text;
      
      await admin.save();
  
      res.status(200).json({ message: 'Video uploaded successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error'});
    }
};