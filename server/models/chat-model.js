const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: [true, 'Text is required']
  },
  date: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Chat', chatSchema);
