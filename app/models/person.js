var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({

uzmanlik: [mongoose.Schema.Types.Mixed],
tags: [mongoose.Schema.Types.Mixed],
maas: Number,
puan: Number

}, {
    timestamps: { createdAt: 'olusturmaTarih', updatedAt: 'guncellemeTarih' } ,
    collection: 'person',
    strict: false
  });

PersonSchema.index({ id: 1}, { unique: true });

module.exports = mongoose.model('Person', PersonSchema);
