const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SocietySchema = new Schema({
  name:{
    type:String,
    required:true
  },
  Class:{
    type: Schema.Types.ObjectId,
    ref:"class",
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = Society = mongoose.model("society", SocietySchema);