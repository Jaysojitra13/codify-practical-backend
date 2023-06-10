const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

// New comment
// Schema
const clientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  agencyId: {
    type: Schema.Types.ObjectId, 
    ref: 'agency',
    required: true
  },
  totalBill:{
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false,
});

const clientModel = mongoose.model('client', clientSchema);
module.exports = clientModel;
