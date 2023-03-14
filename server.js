import  express  from "express";
import bodyParser from "body-parser";
import { config } from 'dotenv'
import { dbconnect } from './dbConnect.js'
import moment from "moment/moment.js";
//QUERIES ABOUT PATIENTS REGISTRATION FOR FAMILY PLANNING
import {NewPatient,ViewPatient,DeletePatient,GetPatientDetails,UpdateDetails} from './public/js/queries.js'
//QUERIES ABOUT  CLINICAL DATA COLLECTION FOR FAMILY PLANNING
import {SaveNewItems, display,Delete,Update,UpdateName,Allupdate} from './public/js/queries.js'


config()
const stores=express()
const port=process.env.PORT || 8080
stores.set('view engine','ejs')
stores.use('/public', express.static('public'))
stores.use(bodyParser.urlencoded({extended:true}))

stores.get('/', (req,res)=>{
    res.render('main')

})

stores.get('/Register', (req,res)=>{
  res.render('Register')

})

stores.get('/Report', (req,res)=>{
  res.render('Register')

})

stores.get('/call', (req,res)=>{
  res.render('call')

})

stores.get('/patient', (req,res)=>{
  res.render('MyPatient')

})

stores.get('/viewpatient', (req,res)=>{
  res.render('PatientListView')

})

stores.get('/view', (req,res)=>{
  res.render('UpdatePatient')

})
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//SAVE PATIENT DETAILS...................................................................................
stores.post('/patient',(req,res)=>{    
const {pname,gender,date,age,NHIS,RegNo,Tel,address,Facility,District,Region}=req.body;
const changeDob=moment(date).format('YYYY-MM-DD')
dbconnect.query(NewPatient,{Name:pname,gender:gender,dob:changeDob,age:age,NHIS:NHIS,RegNo:RegNo,Tel:Tel,address:address,Region:Region,District:District,Facility:Facility},(err,data)=>{
if(err){
  console.log(err);
  res.sendStatus(500);
  return;
}else{
res.redirect('/vp')
}
  })
})

// FP
// VIEW PATIENT RECORDS ON A TABLE LIST

stores.get('/vp', (req,res)=>{
  dbconnect.query(ViewPatient,(err,data)=>{
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }else{
      res.render('PatientListView',{ Data:data })
    }
      })
})
//  FP
//DELETE PATIENTS REGISTRATION RECORDS FP
stores.get('/pdelete',(req,res)=>{
 dbconnect.query(DeletePatient, req.query.id, (err,results)=>{
  if(err){
    console.log(err);
    res.sendStatus(500);
    return;
  }else{
 res.redirect('/vp')
  }
 })
})

// FP
//VIEW DETAILS OF  PATIENTS REGISTRATION RECORDS  FP
stores.get('/views',(req,res)=>{
  dbconnect.query(GetPatientDetails, req.query.id, (err,Details)=>{
    res.render('UpdatePatient', { Details: Details[0]})
  })
})

//FP
//UPDATE PATIENT RECORDS
stores.post('/change', (req,res)=>{
  const {pname,gender,date,age,NHIS,RegNo,Tel,address,Region,District,Facility,patientid}=req.body;
  const changeDob=moment(date).format('YYYY-MM-DD')
  const GetData=[pname,gender,changeDob,age,NHIS,RegNo,Tel,address,Region,District,Facility,patientid]
  dbconnect.query(UpdateDetails, GetData, (err,results)=>{{
    if(err){
      throw err
    }else{
    res.send({status:'success',success:'data saved successfully' +results.affectedRows})
    }
  }})
 })



stores.listen(port,()=>{
console.log(`listening at port ${port}`)
})