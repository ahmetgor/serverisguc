var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({

any: {}

}, {
    timestamps: { createdAt: 'olusturmaTarih', updatedAt: 'guncellemeTarih' } ,
    collection: 'person',
    strict: false
  });

PersonSchema.index({ id: 1}, { unique: true });

module.exports = mongoose.model('Person', PersonSchema);
