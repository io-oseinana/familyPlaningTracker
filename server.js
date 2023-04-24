import express, { query } from "express";
import shedule from "node-schedule";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { dbconnect } from "./dbConnect.js";
import moment from "moment/moment.js";
import fetch from "node-fetch";
import PDFDocument from "pdfkit"
import fs from  "fs"
import easyinvoice from 'easyinvoice';

//QUERIES ABOUT PATIENTS REGISTRATION FOR FAMILY PLANNING
import {
  NewPatient,
  ViewPatient,
  DeletePatient,
  GetPatientDetails,
  UpdateDetails,
  DisplayAll,
  DisplayAllCount,
  namesearch,
  mobilesearch,
  regsearch,
  TimeUp,
  UpdateSmsStatus,
  FAll,
  Fmobilesearch,
  Fregsearch,
  Fnamesearch,
  Fpregsearch,
  Fpmobilesearch,
  Fpnamesearch,
  PeridicReport,
  FirstEver,
  ClientsInfo,
  ClientsNum,
  PatientsAll,
  PatientsReportTel,
  PatientsReportName,
  searchTelephone,
  SignUp,
  Login,
} from "./public/js/queries.js";
//QUERIES ABOUT  CLINICAL DATA COLLECTION FOR FAMILY PLANNING
import {
  SaveNewItems,
  display,
  Delete,
  Update,
  UpdateName,
  Allupdate,
  SaveSend,
  Updatep,
  PAll,
} from "./public/js/queries.js";
//SMS ALERT MESSAGE PROPERTIES FROM SenderID.JS FILE
import { Facility, Message, SenderID, Contact, key} from "./send.js";

config();
const stores = express();
const port = process.env.PORT || 8080;
stores.set("view engine", "ejs");
stores.use("/public", express.static("public"));
stores.use(bodyParser.urlencoded({ extended: true }));

stores.get("/", (req, res) => {
  res.render("signin",{errorMessage:''});
});

stores.get("/dashboard", (req, res) => {
  res.render("Dashboard");
});

stores.get("/main", (req, res) => {
   res.render("panel");
});

stores.get("/signup", (req, res) => {
  res.render("signUp");
});

stores.get("/signin", (req, res) => {
  res.render("signIn", {errorMessage:''});
});


stores.get("/Register", (req, res) => {
  res.render('FamilyPlanning', {Data: '' })
});

stores.get("/Report", (req, res) => {
  res.render("Register");
});

stores.get("/call", (req, res) => {
  res.render("call");
});

stores.get("/patient", (req, res) => {
  res.render("MyPatient");
});

stores.get("/viewpatient", (req, res) => {
  res.render("PatientListView");
});

stores.get("/view", (req, res) => {
  res.render("UpdatePatient");
});

stores.get("/Send", (req, res) => {
  res.render("Send");
});


stores.get("/getreport", (req, res) => {
  res.render("GetReport");
});

stores.get("/getreportfp", (req, res) => {
  res.render("GetReportFP");
});

stores.get("/getreportclient", (req, res) => {
  res.render("GetReportClient");
});

stores.get("/reportoption", (req, res) => {
  res.render("ReportOptions");
});

stores.get("/AllReportOptions", (req, res) => {
  res.render("AllReportOptions");
});

stores.get("/POptions", (req, res) => {
  res.render("PatientsReport/PatientOptions");
});

stores.get("/GetClientsDetails", (req, res) => {
  res.render("PatientsReport/GetClientsDetails");
});

stores.get("/clientdate", (req, res) => {
  res.render("PatientsReport/GetPatients");
});

stores.get("/success", (req, res) => {
  res.render("successpage");
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////

// SAVING LOGIN AND SIGNUP DATA

stores.post('/Account',(req,res)=>{    
  const {Name,email,Tel,Facility,District,Region,password,Accessibility}=req.body;
  dbconnect.query(SignUp,{Name:Name,Email:email,Facility:Facility,Tel:Tel,Region:Region,District:District,Accessibility: Accessibility,Password:password},(err,data)=>{
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }else{
      res.redirect('/signin')
    }
  })
})


// LOGIN TO MAIN PAGE

stores.post('/login',(req,res)=>{    
  const {email,password}=req.body;
  dbconnect.query(Login,[email,password],(err,data)=>{
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }else{
      if(data[0]){
      res.redirect('/dashboard')
      }else{
        res.render('signIn', {errorMessage:'Incorrect Email or Password!'})
      }
    }
  })
})




//SAVE PATIENT DETAILS...................................................................................
stores.post("/patient", (req, res) => {
  const {
    pname,
    gender,
    date,
    age,
    NHIS,
    RegNo,
    Tel,
    address,
    Facility,
    District,
    Region,
  } = req.body;
  const changeDob = moment(date).format("YYYY-MM-DD");
  dbconnect.query(
    NewPatient,
    {
      Name: pname,
      gender: gender,
      dob: changeDob,
      age: age,
      NHIS: NHIS,
      RegNo: RegNo,
      Tel: Tel,
      address: address,
      Region: Region,
      District: District,
      Facility: Facility,
    },
    (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      } else {
        dbconnect.query(searchTelephone, Tel, (err,results)=>{
          res.render('FamilyPlanning', { Data: results[0]})
        })
      }
    }
  );
});

// FP
// VIEW PATIENT RECORDS ON A TABLE LIST

stores.get("/vp", (req, res) => {
  dbconnect.query(
    "select count(Name) as 'count'  from  Patient;select * from  Patient",
    (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      } else {
        const Count = data[0];
        const All = data[1];
        res.render("PatientListView", { Data: All, Count: Count });
      }
    }
  );
});
//  FP
//DELETE PATIENTS REGISTRATION RECORDS FP
stores.get("/pdelete", (req, res) => {
  dbconnect.query(DeletePatient, req.query.id, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } else {
      res.redirect("/vp");
    }
  });
});

// FP
//VIEW DETAILS OF  PATIENTS REGISTRATION RECORDS  FP
stores.get("/views", (req, res) => {
  dbconnect.query(GetPatientDetails, req.query.id, (err, Details) => {
    res.render("UpdatePatient", { Details: Details[0] });
  });
});

//FP
//UPDATE PATIENT RECORDS
stores.post("/change", (req, res) => {
  const {
    pname,
    gender,
    date,
    age,
    NHIS,
    RegNo,
    Tel,
    address,
    Region,
    District,
    Facility,
    patientid,
  } = req.body;
  const changeDob = moment(date).format("YYYY-MM-DD");
  const GetData = [
    pname,
    gender,
    changeDob,
    age,
    NHIS,
    RegNo,
    Tel,
    address,
    Region,
    District,
    Facility,
    patientid,
    PatientsAll,
  ];
  dbconnect.query(UpdateDetails, GetData, (err, results) => {
    {
      if (err) {
        throw err;
      } else {
        res.send({
          status: "success",
          success: "data saved successfully" + results.affectedRows,
        });
      }
    }
  });
});

//FP
//SEARCH PATIENTS RECORDS BY NAME
stores.post("/vp", (req, res) => {
  const { NameSearch } = req.body;
  dbconnect.query(namesearch, [NameSearch, NameSearch], (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } else {
      const Count = data[0];
      const All = data[1];
      res.render("PatientListView", { Data: All, Count: Count });
    }
  });
});

//FP
//SEARCH PATIENTS RECORDS BY MOBILE N0
stores.post("/pview", (req, res) => {
  const { Mobilesearch } = req.body;
  dbconnect.query(mobilesearch, [Mobilesearch, Mobilesearch], (err, Data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } else {
      const Count = Data[0];
      const All = Data[1];
      res.render("PatientListView", { Data: All, Count: Count });
    }
  });
});

//FP
//SEARCH PATIENTS RECORDS BY MOBILE N0
stores.post("/rview", (req, res) => {
  const { Mobilesearch } = req.body;
  dbconnect.query(mobilesearch, [Mobilesearch, Mobilesearch], (err, Data) => {
    if (err) {
      res.sendStatus(500);
      return;
    } else {
      const Count = Data[0];
      const All = Data[1];
      res.render("PatientListView", { Data: All, Count: Count });
    }
  });
});

//FP
//SEARCH PATIENTS RECORDS BY REG N0
stores.post("/regno", (req, res) => {
  const { Regsearch } = req.body;
  dbconnect.query(regsearch, [Regsearch, Regsearch], (err, Data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } else {
      const Count = Data[0];
      const All = Data[1];
      res.render("PatientListView", { Data: All, Count: Count });
    }
  });
});

//FP
//GETTING COMPREHENSIVE REPORT OF PATIENTS  RECORDS ALL
stores.post('/PatientInfo', (req,res)=>{
  dbconnect.query(PatientsAll,(err,Report)=>{
    if(err){
      throw err
    }else{
      res.render('PatientsReport/AllEntries', { Report : Report[0], Count : Report[1]})
}
})

});

//FP
//GETTING COMPREHENSIVE REPORT OF PATIENTS  RECORDS BY
stores.post('/PatientsNumber', (req,res)=>{
  const {Mobile}=req.body
  dbconnect.query(PatientsReportTel, [Mobile,Mobile], (err,Report)=>{
    if(err){
      throw err
    }else{
      let Name=""
      Report[0].forEach((rep)=>{
         Name=rep.Name
      })
      res.render('PatientsReport/ReportbyPatient', { Report : Report[0], Count : Report[1], Name: Name })
}
})

});

//FP
//GETTING COMPREHENSIVE REPORT OF PATIENTS  RECORDS BY
stores.post('/PatientName', (req,res)=>{
  const {Name}=req.body
  dbconnect.query(PatientsReportName, [Name,Name], (err,Report)=>{
    if(err){
      throw err
    }else{
      res.render('PatientsReport/ReportbyPatient', { Report : Report[0], Count : Report[1], Name: Name })
}
})

});

//CLINICAL RECORDS OF FAMILY PLANNING

stores.get("/fpsave", (req, res) => {
  res.render("FamilyPlanning", {Data:''});
});

stores.get("/seepatient", (req, res) => {
  res.render("FamilyPlanning", {Data:''});
});

//GETTING DATA FOR SMS SENDING and sending data through get request USING FETCH API METHOD
stores.get("/", (req, res) => {
  res.render("Dashboard");
  const SmsDate = new Date();
  const changeDob = moment(SmsDate).format("YYYY-MM-DD");
  console.log(changeDob);
  dbconnect.query(TimeUp,changeDob, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } else {
      const MessageList = data.forEach((element) => {
        const contact=[element.clientnumber]
        console.log(contact)
        fetch(
          "https://api.smsonlinegh.com/v4/message/sms/send?key=" +
            key +
            "&text=" +
            Message +
            "%21&type=0&sender=" +
            SenderID +
            "&to=" +
            contact +
            "",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": " application/x-www-form-urlencoded",
            },
            Host: "api.smsonlinegh.com",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(JSON.stringify(data))
            dbconnect.query(UpdateSmsStatus,changeDob, (err,Status)=>{
              if(err){
                console.log(err);
                res.sendStatus(500);
                return;
              }else{
          console.log('Updated')
              }
                })
          }) .catch(error => {
            console.log(error)
        });

      });
      return MessageList;
    }
  });
});

/////////////////////////////////////////
//FP
//SAVING CLINICAL RECORDS OF FAMILY PLANNING
stores.post('/save',(req,res)=>{   
  const {clientnumber,pdata,lab_test,blood,weight,serve,commodity,remarks,visit,Region,District,Facility,date,RegNo}=req.body;
  const changeDate = moment(date).format("YYYY-MM-DD");
  const changevisit=moment(visit).format('YYYY-MM-DD')
  const beforevisit=moment(changevisit).add(-1, 'days').format('YYYY-MM-DD');

dbconnect.query(SaveNewItems, {clientnumber:clientnumber,pdata:pdata,lab_test:lab_test,blood:blood,weight:weight,serve:serve,commodity:commodity,remarks:remarks,visit:changevisit,daybefore:beforevisit,Region:Region,District:District,Facility:Facility,Date:changeDate,SmsStatus:'Pending',RegNo:RegNo},(err,datas)=>{
if(err){
  console.log(err);
  res.sendStatus(500);
  return;
}else{
    res.redirect('/success')



}
  })

  dbconnect.query(SaveSend, (err,data)=>{
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }else{
      let MessageList = data.forEach((element) => {
        const contact=[element.clientnumber]
       let NextVisitDate=''
       NextVisitDate=element.visit
       let FacilityPersonal='SDA HOSPITAL,DOMINASE '
       FacilityPersonal=element.Facility
        let MessagePersonal='THANK YOU FOR VISITING, '+FacilityPersonal+', TODAY,YOU HAVE BEEN ENROLLED ON THE FP SERVICE.YOUR NEXT VISIT IS '+NextVisitDate+' THANK YOU.'
        console.log(contact)
        fetch(
          "https://api.smsonlinegh.com/v4/message/sms/send?key=" +
            key +
            "&text=" +
            MessagePersonal +
            "%21&type=0&sender=" +
            SenderID +
            "&to=" +
            contact +
            "",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": " application/x-www-form-urlencoded",
            },
            Host: "api.smsonlinegh.com",
          }
        )
          .then((response) => response.json())
          .then((data) => console.log(JSON.stringify(data)))
          .catch(error => {
        console.log(error)
    })
      }) 
      return MessageList;
    
    
    }
      })
})


//VIEW LIST OF CLINICAL DATA
stores.get('/display', (req,res)=>{
  dbconnect.query(FAll,(err,data)=>{
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }else{
      res.render('display',{ Data:data[1], Count:data[0] })
    }
      })
})


//VIEW LIST OF CLINICAL DATA
stores.get('/searchfirst', (req,res)=>{
  dbconnect.query(PAll,(err,data)=>{
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }else{
      res.render('SearchFirst',{ Data:data[1], Count:data[0] })
    }
      })
})

//VIEW LIST OF CLINICAL DATA
stores.post('/searchname', (req,res)=>{
  const { NameSearch } = req.body;
  dbconnect.query(Fnamesearch, [NameSearch, NameSearch], (err, data) => {
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }else{
      res.render('SearchFirst',{ Data:data[1], Count:data[0] })
    }
      })
})

//VIEW LIST OF CLINICAL DATA
stores.post('/searchmobile', (req,res)=>{
  const { Mobilesearch } = req.body;
  dbconnect.query(Fmobilesearch, [Mobilesearch,Mobilesearch], (err, data) => {
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }else{
      res.render('SearchFirst',{ Data:data[1], Count:data[0] })
  }
  })
})


//VIEW LIST OF CLINICAL DATA
stores.post('/searchmobile',(req,res)=>{
  const { Mobilesearch } = req.body;
  dbconnect.query(Fmobilesearch, [Mobilesearch,Mobilesearch], (err, data) => {
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }else{
      res.render('SearchFirst',{ Data:data[1], Count:data[0] })
  }
  })
})


//VIEW LIST OF CLINICAL DATA
stores.post('/searchreg',(req,res)=>{
  const { Regsearch } = req.body;
  dbconnect.query(Fregsearch, [Regsearch,Regsearch], (err, data) => {
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }else{
      res.render('SearchFirst',{ Data:data[1], Count:data[0] })
  }
  })
})

//FP
//SEARCH CLINICAL RECORDS BY NAME
stores.post("/fname", (req, res) => {
  const { NameSearch } = req.body;
  dbconnect.query(Fpnamesearch, [NameSearch, NameSearch], (err, Data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } else {
      const Count = Data[0];
      const All = Data[1];
      res.render("display", { Data: All, Count: Count });
    }
  });
});


//FP
//SEARCH CLINICAL RECORDS BY MOBILE N0
stores.post("/fmobile", (req, res) => {
  const { Mobilesearch } = req.body;
  dbconnect.query(Fpmobilesearch, [Mobilesearch, Mobilesearch], (err, Data) => {
    if (err) {
      res.sendStatus(500);
      return;
    } else {
      const Count = Data[0];
      const All = Data[1];
      res.render("display", { Data: All, Count: Count });
    }
  });
});

//FP
//SEARCH CLINICAL RECORDS BY REG N0
stores.post("/freg", (req, res) => {
  const { Regsearch } = req.body;
  dbconnect.query(Fpregsearch, [Regsearch, Regsearch], (err, Data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } else {
      const Count = Data[0];
      const All = Data[1];
      res.render("PatientListView", { Data: All, Count: Count });
    }
  });
});
//FP
//DELETE ITEM FROM CLINICAL HISTORY
stores.get('/delete',(req,res)=>{
  dbconnect.query(Delete, req.query.id, (err,results)=>{
    res.redirect('/display')
  })
})
//FP
//VIEW DETAILS OF CLINET CLINICAL HISTORY
stores.get('/edit',(req,res)=>{
  dbconnect.query(Update, req.query.id, (err,results)=>{
    res.render('FamilyPlanningUpdated', { Data: results[0]})
  })
})

  stores.post('/search',(req,res)=>{
    const {searchbar}=req.body
    dbconnect.query(UpdateName, searchbar, (err,results)=>{
      res.render('display', { Data: results})
    })
})

stores.post('/update',(req,res)=>{
  const {clientnumber,pdata,lab_test,blood,weight,serve,commodity,remarks,visit,Region,District,Facility,date,RegNo,userid}=req.body;
  const changeDate = moment(date).format("YYYY-MM-DD");
  const changevisit=moment(visit).format('YYYY-MM-DD')
  const beforevisit=moment(changevisit).add(-1, 'days').format('YYYY-MM-DD');
  dbconnect.query(Allupdate, [clientnumber,pdata,lab_test,blood,weight,serve,commodity,remarks,changevisit,beforevisit,Region,District,Facility,changeDate,RegNo,userid], (err,results)=>{
    if(err){
      throw err
    }else{
    res.send({status:'success',success:'data updated successfully' +results.affectedRows})
    }
  })
})

//FP
//GET DETAILS OF PATIENTS REG BEFORE SAVING RECORDS
stores.get('/Details',(req,res)=>{
  dbconnect.query(Updatep, req.query.id, (err,results)=>{
    res.render('FamilyPlanning', { Data: results[0]})
  })
})

//SMS HANDLERS

//GETTING DATA FOR SMS SENDING and sending data through get request USING FETCH API METHOD
stores.post("/Sendsms", (req, res) => {   
  const { Contacts,Messages }=req.body
        console.log(Contacts)
        fetch(
          "https://api.smsonlinegh.com/v4/message/sms/send?key=" +
            key +
            "&text=" +
            Messages +
            "%21&type=0&sender=" +
            SenderID +
            "&to=" +
            Contacts +
            "",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": " application/x-www-form-urlencoded",
            },
            Host: "api.smsonlinegh.com",
          }
        )
          .then((response) =>{ response.json()
          })
          .then((data) =>{
             console.log(JSON.stringify(data))
             res.send({
              status: "success",
              success:'message send successfully'
            });
            })
          .catch(error => {
            console.log(error);
        })
   
});
//FP
//GETTING COMPREHENSIVE REPORT OF CLINICAL RECORDS WITHIN A PERIOD
stores.post('/periodicreport',(req,res)=>{
const {Date1,Date2}=req.body
dbconnect.query(PeridicReport, [Date1,Date2,Date1,Date2], (err,Report)=>{
  if(err){
    throw err
  }else{
  res.render('ReportbyDate', { Report : Report[0], Count : Report[1], Date1 : Date1, Date2 : Date2})
  }
})

})
//FP
//GETTING COMPREHENSIVE REPORT OF CLINICAL RECORDS WITHIN A PERIOD
//SEARCH REPORT BY FP SERVICE
stores.post('/fpservice', (req,res)=>{
  const {serve}=req.body
  dbconnect.query(FirstEver, [serve,serve], (err,Report)=>{
    if(err){
      throw err
    }else{
      res.render('ReportbyFP', { Report : Report[0], Count : Report[1]})
}
})

});

//FP
//GETTING COMPREHENSIVE REPORT OF CLINICAL RECORDS WITHIN A PERIOD
//SEARCH REPORT BY CLIENT INFO(NAME)
stores.post('/ClientsInfo', (req,res)=>{
  const {Name}=req.body
  dbconnect.query(ClientsInfo, [Name,Name], (err,Report)=>{
    if(err){
      throw err
    }else{
      res.render('ReportbyClient', { Report : Report[0], Count : Report[1], Name: Name})
}
})

});

//FP
//GETTING COMPREHENSIVE REPORT OF CLINICAL RECORDS WITHIN A PERIOD
//SEARCH REPORT BY CLIENT INFO(TELEPHONE)
stores.post('/ClientsNumber', (req,res)=>{
  const {Mobile}=req.body
  dbconnect.query(ClientsNum, [Mobile,Mobile], (err,Report)=>{
    if(err){
      throw err
    }else{
      let Name=""
      Report[0].forEach((rep)=>{
         Name=rep.pdata
      })
      res.render('ReportbyClient', { Report : Report[0], Count : Report[1], Name: Name })
}
})

});

stores.listen(port, () => {
  console.log(`listening at port ${port}`);
});
