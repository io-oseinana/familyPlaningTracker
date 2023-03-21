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



//DATA CLINICAL DATA QUERIES FOR FAMILY PLANNING 
export const  SaveNewItems="insert into fplanning set ?"
export const UpdateNewItem="update fplanning set Items=?"
export const display="select * from  fplanning"
export const Delete="delete from  fplanning where id=?"
export const Update="select * from  fplanning where id=?"
export const UpdateName="select * from  fplanning where clientnumber=?"
export const Allupdate=`update fplanning set clientnumber=?,pdata=?,lab_test=?,blood=?,weight=?,serve=?,commodity=?,remarks=?,visit=?,daybefore=?,Region=?,District=?,Facility=?,Date=?,RegNo=? where id= ?`;
export const TimeUp="select clientnumber from  fplanning where daybefore>=? and SmsStatus='Pending'"
export const  SaveSend="select clientnumber,visit,Facility from fplanning where id in(select MAX(ID) from fplanning)"
export const UpdateSmsStatus="update fplanning set SmsStatus='Sent' where daybefore>=?"

export const Fnamesearch="select count(pdata) as 'count'  from  fplanning where pdata=?;select * from  fplanning where pdata=?"
export const  Fmobilesearch="select count(pdata) as 'count'  from  fplanning where clientnumber=?;select * from  fplanning where clientnumber=?"
export const  Fregsearch="select count(pdata) as 'count'  from  fplanning where RegNo=?;select * from  fplanning where RegNo=?"
export const  FAll="select count(pdata) as 'count'  from  fplanning;select * from  fplanning"

