const express = require("express");
const adminModel = require("../models/adminModel");
const visitModel = require("../models/visitModel");
const router = express.Router();

router.get("/", async function (req, res) {
  const admin = await adminModel.findOne();
  const videoUrl = admin ? admin.videoUrl : ''; 
  const videoText = admin ? admin.videoText : "";

  const today = new Date().toISOString().split('T')[0];
  let visit = await visitModel.findOne();

  if (!visit) {
    visit = new visitModel({
      date: today,
      count: 1,
      lastWeekCounts: []
    });
    await visit.save();
  } else {
    if (visit.date === today) {
      // Same day: just increment the count
      visit.count += 1;
    } else {
      // New day: push yesterday's count, reset date and count
      if (visit.count > 0) {
        visit.lastWeekCounts.push(visit.count);
        // Keep only last 7 days
        if (visit.lastWeekCounts.length > 7) {
          visit.lastWeekCounts = visit.lastWeekCounts.slice(-7);
        }
      }
      visit.date = today;
      visit.count = 1;
    }
    await visit.save();
  }

  res.json({
    number: process.env.NUMBER,
    videoUrl,
    videoText
  });
});

module.exports = router;