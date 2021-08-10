const express=require('express');
const {body, validationResult} = require('express-validator');

const Society = require('../../models/Society');

const router = express.Router();

// @route     GET api/society
// @desc      Get all societies
// @access    Public
router.get("/",async (req,res)=>{
    try{
      const societies=await Society.find();
      return res.json({societies});
    } catch(err){
      console.error(err.message);
      res.status(500).json({errors:[{msg:"Server Error"}]});
    }
})

// @route     POST api/society
// @desc      Create new society
// @access    Public
router.post("/",
[
  body("name","Name is required").not().isEmpty(),
  body("Class","Class is required").not().isEmpty()
],
  async (req,res)=>{
    try{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
      }
      const society=new Society({
        name:req.body.name,
        Class:req.body.Class
      });

      await society.save();
      res.json({society});
    } catch(err){
      console.error(err.message);
      res.status(500).json({errors:[{msg:"Server Error"}]});
    }
  }
)

module.exports=router;