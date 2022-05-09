const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const brokerSchema = new Schema({
	'brokerid' : String,
	'brokerurl' : String,
	'clientcount' : Number
},{timestamps : true});

module.exports = mongoose.model('broker', brokerSchema);

