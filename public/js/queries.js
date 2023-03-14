//PATIENT REGISTRATION QUERIES
export const  NewPatient="insert into Patient set ?"
export const ViewPatient="select * from  patient"
export const DeletePatient="delete from  patient where id=?"
export const GetPatientDetails="select * from  patient where id=?"
export const UpdateDetails=`update patient set Name=?,gender=?,Dob=?,age=?,NHIS=?,RegNo=?,Tel=?,address=?,Region=?,District=?,Facility=? where id= ?`;

//DATA CLINICAL DATA QUERIES FOR FAMILY PLANNING 
export const  SaveNewItems="insert into fplanning set ?"
export const UpdateNewItem="update sfplanning set Items=?"
export const display="select * from  fplanning"
export const Delete="delete from  fplanning where id=?"
export const Update="select * from  fplanning where id=?"
export const UpdateName="select * from  fplanning where clientnumber=?"
export const Allupdate=`update fplanning set email=?,nhis=?,clientnumber=?,pdata=?,age=?,Gender=?,dob=?,lab_test=?,blood=?,weight=?,serve=?,commodity=?,remarks=?,visit=? where id= ?`;
