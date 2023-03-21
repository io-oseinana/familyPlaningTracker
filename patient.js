import  express  from "express";
import bodyParser from "body-parser";
import { config } from 'dotenv'
import { dbconnect } from './dbConnect.js'
import moment from "moment/moment.js";
//QUERIES ABOUT PATIENTS REGISTRATION
import {NewPatient,ViewPatient} from './public/js/queries.js'
//QUERIES ABOUT  CLINICAL DATA COLLECTION
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
  res.render('FamilyPlanning')

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
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//SAVE PATIENT DETAILS...................................................................................
stores.post('/patient',(req,res)=>{    
const {pname,gender,date,age,NHIS,RegNo,Tel,address}=req.body;
const changeDob=moment(date).format('YYYY-MM-DD')
dbconnect.query(NewPatient,{Name:pname,gender:gender,dob:changeDob,age:age,NHIS:NHIS,RegNo:RegNo,Tel:Tel,address:address},(err,data)=>{
if(err){
  console.log(err);
  res.sendStatus(500);
  return;
}else{
res.redirect('/viewpatient')
}
  })
})

// VIEW PATIENT RECORDS ON A TABLE LIST

stores.get('/viewpatient', (req,res)=>{
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


stores.post('/save',(req,res)=>{
    
    const {email,nhis,clientnumber,pdata,age,Gender,dob,lab_test,blood,weight,serve,commodity,remarks,visit}=req.body;
    const changeDob=moment(dob).format('YYYY-MM-DD')
    const changevisit=moment(visit).format('YYYY-MM-DD')
  
dbconnect.query(SaveNewItems, {email:email,nhis:nhis,clientnumber:clientnumber,pdata:pdata,age:age,Gender:Gender,dob:changeDob,lab_test:lab_test,blood:blood,weight:weight,serve:serve,commodity:commodity,remarks:remarks,visit:visit},(err,data)=>{
  if(err){
    console.log(err);
    res.sendStatus(500);
    return;
  }else{
 res.redirect('/display')
  }
    })

  })

  stores.get('/display', (req,res)=>{
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

  stores.get('/delete',(req,res)=>{
    dbconnect.query(Delete, req.query.id, (err,results)=>{
      res.redirect('/display')
    })
  })

  stores.get('/edit',(req,res)=>{
    dbconnect.query(Update, req.query.id, (err,results)=>{
      res.render('editdata', { Data: results[0]})
    })
  })

    stores.post('/search',(req,res)=>{
      const {searchbar}=req.body
      dbconnect.query(UpdateName, searchbar, (err,results)=>{
        res.render('display', { Data: results})
      })
  })


  stores.post('/update',(req,res)=>{
    const {email,nhis,clientnumber,pdata,age,Gender,dob,lab_test,blood,weight,serve,commodity,remarks,visit,userid}=req.body;
    const changeDob=moment(dob).format('YYYY-MM-DD')
    const changevisit=moment(visit).format('YYYY-MM-DD')
    dbconnect.query(Allupdate, [email,nhis,clientnumber,pdata,age,Gender,changeDob,lab_test,blood,weight,serve,commodity,remarks,changevisit,userid], (err,results)=>{
      if(err){
        throw err
      }else{
      res.send({status:'success',success:'data saved successfully' +results.affectedRows})
      }
    })
})

stores.listen(port,()=>{
console.log(`listening at port ${port}`)
})