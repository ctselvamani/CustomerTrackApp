var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema(
  {
    firstname: {type: String, required: true, max: 100},
    lastname: {type: String, required: true, max: 100},
    bankloaction: {type: String, required: true, enum: ['BankNorth','BankEast','BankWest','BankSouth']}
  }
);

// Virtual for author's full name
EmployeeSchema
.virtual('name')
.get(function () {
  return this.firstname+ ', ' + this.lastname;
});

//Export model
module.exports = mongoose.model('employee', EmployeeSchema);
