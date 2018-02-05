var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({

any: {}

}, {
    collection: 'tags',
    strict: false
  });

// PersonSchema.index({ id: 1}, { unique: true });

module.exports = mongoose.model('Tag', TagSchema);
