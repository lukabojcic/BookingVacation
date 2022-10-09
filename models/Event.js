const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  
    start: Date,
  end: Date,
  title: String

  
});


module.exports = mongoose.model('Event', EventSchema);