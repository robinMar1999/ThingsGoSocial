const express=require('express');
const {body, validationResult} = require('express-validator');

const Class = require('../../models/Class');

const router = express.Router();

// @route     GET api/class
// @desc      Get all classes
// @access    Public
router.get("/",async (req,res)=>{
    try{
      const classes=await Class.find();
      return res.json({classes});
    } catch(err){
      console.error(err.message);
      res.status(500).json({errors:[{msg:"Server Error"}]});
    }
})

// @route     POST api/class
// @desc      Create new class
// @access    Public
router.post("/",[body("name","Name is required").not().isEmpty()],
  async (req,res)=>{
    try{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
      }

      const class1=new Class({
        name:req.body.name
      });

      await class1.save();
      res.json({class1});
    } catch(err){
      console.error(err.message);
      res.status(500).json({errors:[{msg:"Server Error"}]});
    }
})

module.exports=router;