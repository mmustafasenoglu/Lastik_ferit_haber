const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  profilePhoto: { type: String, default: '' },
  name: { type: String, default: 'Ferit Tercan' },
  bio: { type: String, default: '' },
  bio2: { type: String, default: '' },
  bio3: { type: String, default: '' },
  bio4: { type: String, default: '' }
});

settingsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model('Settings', settingsSchema);
