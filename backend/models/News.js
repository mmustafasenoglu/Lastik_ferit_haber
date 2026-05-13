const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'Genel' },
  imageUrl: { type: String, default: '' },
  imageCaption: { type: String, default: '' },
  additionalImages: { type: mongoose.Schema.Types.Mixed, default: [] },
  galleryCaption: { type: String, default: '' },
  date: { type: Date, default: Date.now }
});

newsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model('News', newsSchema);
