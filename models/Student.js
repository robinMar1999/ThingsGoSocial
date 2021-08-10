const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact:{
    type:String,
    required: true,
  },
  subjects:[String],
  Class:{
      type: Schema.Types.ObjectId,
      ref:'class',
      required:true
  },
  societies:[
    {
      type:Schema.Types.ObjectId,
      ref:'society'
    }
  ],
  year:{
    type:Number,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = Student = mongoose.model("student", StudentSchema);
