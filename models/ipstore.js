var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kvnet');
var ips = mongoose.Schema({
  ip: String,
  time: { type: Date, default: Date.now },
  times:0
});

var ips = mongoose.model("ips", ips);
module.exports = ips;
