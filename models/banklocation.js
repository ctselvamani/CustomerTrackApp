var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BanklocationSchema = new Schema(
  {
    branch: {type: String, required: true, max: 100},
    address: {type: String, required: true, max: 500},
  }
);

//Export model
module.exports = mongoose.model('banklocation', BanklocationSchema);
