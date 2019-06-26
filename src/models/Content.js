const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContentSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  type: {
    type: String
   },
  data: {
    type: String
  },
  hash: {
    type: String
  },
  tags: {
    type: String
  }
});

module.exports = mongoose.model('Content', ContentSchema);