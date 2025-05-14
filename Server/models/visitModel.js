const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    date: {
        type: String, // format: YYYY-MM-DD
        required: true,
        unique: true,
      },
      count: {
        type: Number,
        default: 0,
      },
      lastWeekCounts: [{
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        },
      }]
});

module.exports = mongoose.model('visit', visitSchema);
