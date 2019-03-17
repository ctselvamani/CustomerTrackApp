var moment = require('moment');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//customertrackSchema
let customertrackSchema = new Schema({
    firstname: {type: String, required: true, max: 100},
    lastname: {type: String, required: true, max:100},
    email: {type: String, required: true, max:100},
    iscustomer: {type: Boolean, required: true},
    city: {type: String, required: true, max:100},
    zip: {type: Number, required: true},
    typeofinter: {type: String, required: true},
    lengthofinter: {type: Number, required: true},
    dateofinter: {type: Date, required: true, default: Date.now},
    additionalcoms: {type: String, required: false, max:1000},
    banklocation: {type: String, required: true},
    empid: {type: String, required: true},


    });

// Virtual for customertrack URL
customertrackSchema
.virtual('url')
.get(function () {
  return '/customertrack/' + this._id;
});
var moment = require('moment');

//Virtual for Date format
customertrackSchema
.virtual('dateofinter_formatted')
.get(function () {
  return moment(this.dateofinter).format('YYYY-MM-DD hh:mm a');
});

module.exports = mongoose.model('customertrack', customertrackSchema);
