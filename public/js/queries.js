//PATIENT REGISTRATION QUERIES
export const  NewPatient="insert into Patient set ?"
export const ViewPatient="select * from  patient"
export const DeletePatient="delete from  patient where id=?"
export const GetPatientDetails="select * from  patient where id=?"
export const UpdateDetails=`update patient set Name=?,gender=?,Dob=?,age=?,NHIS=?,RegNo=?,Tel=?,address=?,Region=?,District=?,Facility=? where id= ?`;
export const DisplayAll="select * from  Patient"
export const DisplayAllCount="select count(Name) as 'count' from  Patient"
export const namesearch="select count(Name) as 'count'  from  Patient where name=?;select * from  Patient where name=?"
export const  mobilesearch="select count(Name) as 'count'  from  Patient where Tel=?;select * from  Patient where Tel=?"
export const  regsearch="select count(Name) as 'count'  from  Patient where RegNo=?;select * from  Patient where RegNo=?"
export const PatientsReportTel="select * from Patient where Tel = ?;select count(name) as 'count' from Patient where Tel = ?"
export const PatientsReportName="select * from Patient where name = ?;select count(name) as 'count' from Patient where name = ?"
export const PatientsAll="select * from Patient order by name asc;select count(name) as 'count' from Patient"



//DATA CLINICAL DATA QUERIES FOR FAMILY PLANNING 
export const  SaveNewItems="insert into fplanning set ?"
export const UpdateNewItem="update fplanning set Items=?"
export const display="select * from  fplanning"
export const Delete="delete from  fplanning where id=?"
export const Update="select * from  fplanning where id=?"
export const Updatep="select * from  patient where id=?"
export const searchTelephone="select * from  patient where Tel=?"
export const UpdateName="select * from  fplanning where clientnumber=?"
export const Allupdate=`update fplanning set clientnumber=?,pdata=?,lab_test=?,blood=?,weight=?,serve=?,commodity=?,remarks=?,visit=?,daybefore=?,Region=?,District=?,Facility=?,Date=?,RegNo=? where id= ?`;
export const TimeUp="select clientnumber from  fplanning where daybefore>=? and SmsStatus='Pending'"
export const SaveSend="select clientnumber,visit,Facility from fplanning where id in(select MAX(ID) from fplanning)"
export const UpdateSmsStatus="update fplanning set SmsStatus='Sent' where daybefore>=?"

export const  Fnamesearch="select count(name) as 'count'  from  patient where name=?;select * from  patient where name=?"
export const  Fmobilesearch="select count(name) as 'count'  from patient where Tel=?;select * from  patient where Tel=?"
export const  Fregsearch="select count(name) as 'count'  from  patient where RegNo=?;select * from  patient where RegNo=?"
//family planning queries
export const  Fpnamesearch="select count(pdata) as 'count'  from  fplanning where pdata=?;select * from  fplanning  where pdata=?"
export const  Fpmobilesearch="select count(pdata) as 'count'  from fplanning where clientnumber=?;select * from  fplanning where clientnumber=?"
export const  Fpregsearch="select count(pdata) as 'count'  from  fplanning where RegNo=?;select * from  fplanning where RegNo=?"
export const  FAll="select count(pdata) as 'count'  from  fplanning;select * from  fplanning"
export const  PAll="select count(name) as 'count'  from  patient;select * from  patient"
export const PeridicReport="select * from fplanning where date between ? and ?;select count(pdata) as 'count' from fplanning where date between ? and ? "
export const FirstEver="select * from fplanning where serve = ?;select count(serve) as 'count' from fplanning where serve = ?"
export const ClientsInfo="select * from fplanning where pdata = ?;select count(pdata) as 'count' from fplanning where pdata = ?"
export const ClientsNum="select * from fplanning where clientnumber = ?;select count(pdata) as 'count' from fplanning where clientnumber = ?"

//ACCOUNTS AND AUTHENTICATION QUERIES

export const SignUp="insert into SignUp set ?";
export const Login="select email,password from SignUp where email=? and password=?";