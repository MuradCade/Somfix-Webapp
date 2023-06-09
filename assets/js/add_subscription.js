// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc,getDoc,addDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {firebaseConfig} from './firebase.js';

     // firebase intialization
 const app = initializeApp(firebaseConfig);
 
     // call the  get database method
 const db = getFirestore();





let idinput = document.getElementById('idinput')
let companyname= document.getElementById('companyname');
let companyemail= document.getElementById('companyemail');
let companyphone= document.getElementById('companyphone');
let subscriptionduration= document.getElementById('subscriptionduration');
let payment_method= document.getElementById('payment_method');
let paymentamount= document.getElementById('paymentamount');
let dateandtime= document.getElementById('dateandtime');
let subscription_status = document.getElementById('subscription_status');
let submitbtn= document.getElementById('submit');


 //*! employee form needs service category names in service type field
 async function displayservicecategorynames(){
    let Docref = collection(db,'company');
    let Docsnap = await getDocs(Docref);
    
    Docsnap.forEach(docs => {
        var option = document.createElement('option');

        option.text = docs.data().company_name;
        companyname.options.add(option)
        
        
        
        
        
        
    });
    
        // check the change of the value in select element
    companyname.addEventListener('change',(event)=>{
        getcurrentcompanyinfo(event.target.value)
    });
            
   

}

async function getcurrentcompanyinfo(name){
    let Docref = collection(db,'company');
    let result = await getDocs(Docref);
    
    result.forEach(doc =>{
        // check if the select element inside the subscription form
        if(doc.data().company_name == name){
            
            console.log(idinput.textContent);
            idinput.innerHTML =doc.id;
                companyemail.value= doc.data().email;
                companyphone.value = doc.data().company_phone;
                   
            }
    });

        // console.log(result.id);
 
    

}


// error and success element

let error_msg = document.getElementById('error_msg');
let success_msg = document.getElementById('success_msg');

// display company names in the select form
displayservicecategorynames();



// store subscription data in the subscription collection

async function Addsubscriptiontodb(companyid){
    let docRef = collection(db,"subscription");
    let docSnap = await addDoc( docRef,{
     company_name:companyname.value,
     company_email:companyemail.value,
     company_phone:companyphone.value,
     subscription_duration:subscriptionduration.value,
     payment_mthod:payment_method.value,
     subscription_amount:paymentamount.value,
     dateandtime:dateandtime.value,
     company_collection_id:companyid,
     added_by:'Admin',
     subscription_status:subscription_status.value,

    }).then(()=>{

        // console.log('user role is created');
        error_msg.style.display = 'none';
        success_msg.style.display = 'block';
        success_msg.innerHTML = 'Subscription Date Stored Successfully';
    }).catch((error)=>{


        error_msg.style.display = 'block';
        error_msg.style.display = 'none';
        error_msg.innerHTML = error;
    });
}

submitbtn.addEventListener('click',function() {
    Addsubscriptiontodb(idinput.textContent)
})