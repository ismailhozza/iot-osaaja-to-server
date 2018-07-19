var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var PictureSchema = new Schema(
    {
    name: { type: String, required: true, minlength: 5, maxlength: 100 },
    description: { type: String, maxlength: 100 },
    directory: { type: String, required: true, maxlength: 100 },
    date: { type: Date, default: Date.now }
    }
  );

// Export model.
module.exports = mongoose.model('Picturelist', PictureSchema);
