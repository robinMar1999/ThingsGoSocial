const express=require('express');
const {body, validationResult} = require('express-validator');

const Student = require('../../models/Student');
const Class = require('../../models/Class');
const Society = require('../../models/Society');

const router = express.Router();

// @route     POST api/student
// @desc      Create new student
// @access    Public
router.post("/",[
  body("name","Name is required").not().isEmpty(),
  body("contact","Contact is required").not().isEmpty(),
  body("Class","Class is required").not().isEmpty(),
  body("year","year is required").not().isEmpty()
],
  async (req,res)=>{
    try{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
      }

      // check if the Class exists
      const class1=await Class.findById(req.body.Class);
      if(!class1){
        return res.status(400).json({errors:[{msg:"Class Not Found"}]});
      }

      // check if all the societies exists and belong to class1

      req.body.societies.forEach(async society=>{
        const foundSociety=await Society.findById(society);
        if(!foundSociety || !foundSociety.Class.equals(req.body.Class)){
          return res.status(400).json({errors:[{msg:"Society does not belong to student class"}]});
        }
      })

      const student=new Student({
        name:req.body.name,
        contact:req.body.contact,
        subjects:req.body.subjects,
        Class:req.body.Class,
        societies:req.body.societies,
        year:req.body.year
      });

      await student.save();
      res.json({student});
    } catch(err){
      console.error(err.message);
      res.status(500).json({errors:[{msg:"Server Error"}]});
    }
})

// @route     GET api/student
// @desc      Get students with parameters
// @access    Public
router.get('/',async (req,res)=>{
  try {
    const students=await Student.find();
    console.log(req.query);
    let societies=[];
    if(req.query.societies){
      societies=req.query.societies.split(',');
    }
    const retStudents=[];
    const today=new Date();
    students.forEach(async student=>{
      let can=true;
      if(req.query.age){
        let currAge=Number(today.getFullYear()) - Number(student.year);
        if(currAge<Number(req.query.age)){
          can=false;
        } 
      }
      if(req.query.Class && !student.Class.equals(req.query.Class)){
        can=false;
      }
      societies.forEach(society=>{
        let found=false;
        student.societies.forEach(stSociety=>{
          if(!stSociety.equals(society)){
            found=true;
          }
        })
        if(!found){
          can=false;
        }
      })
      if(can){
        retStudents.push(student);
      }
    })
    res.json(retStudents);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({errors:[{msg:"Server Error"}]});
  }
})

module.exports=router;