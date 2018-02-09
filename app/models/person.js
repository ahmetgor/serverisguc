var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({

uzmanlik: [mongoose.Schema.Types.Mixed],
tags: [mongoose.Schema.Types.Mixed],
maas: Number,
puan: Number,
messages : [
    {
        from : String,
        from_name : String,
        to : String,
        to_name : String,
        konu : String,
        text : String,
        tarih : Date
    }
          ]
}, {
    timestamps: { createdAt: 'olusturmaTarih', updatedAt: 'guncellemeTarih' } ,
    collection: 'person',
    strict: false
  });

PersonSchema.index({ id: 1}, { unique: true });

module.exports = mongoose.model('Person', PersonSchema);
