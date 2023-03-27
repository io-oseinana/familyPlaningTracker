import fetch from "node-fetch";
export const key='87eddb818b18b21e3ed1204da7c42e4c1a012485de3e3da9c94c3a3f4c0e4ece'
export let Facility='THIS IS SDA HOSPITAL DOMINASE,'
export let FacilityPersonal='SDA HOSPITAL,DOMINASE'
export let Message='HELLO, '+Facility+' PLEASE YOU ARE REMINDED TO GO FOR YOUR NEXT VISIT'
export let NextVisitDate=''
export let MessagePersonal='THANK YOU FOR VISITING, '+Facility+', PLEASE YOUR NEXT VISIT DATA IS ON '+NextVisitDate+' THANK YOU.'
export let SenderID='TIME ASO'
export let Contact=[];
// export default fetch('https://api.smsonlinegh.com/v4/message/sms/send?key='+key+'&text='+Message+'%21&type=0&sender='+SenderID+'&to='+Contact+'', {

//     method: 'GET',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': ' application/x-www-form-urlencoded'
//     },
//      Host: 'api.smsonlinegh.com',
// })
//    .then(response => response.json())
//    .then(data => console.log(JSON.stringify(data)))