   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,collection,getDocs,doc,updateDoc,deleteDoc} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {getAuth , 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
   import {firebaseConfig} from './firebase.js';


   // firebase intialization
    const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore();
    const auth = getAuth(app);
   let tr = document.querySelector('#employeedata');

   
   // check the auth change status then get the email of the user
   let companyemail = '';
   let userid;
   auth.onAuthStateChanged((user)=>{
       if(user){
          // console.log(user.uid);
          companyemail = user.email;
          userid = user.uid;
          
          
         
       }
      });
//    function that display employee data
async function Viewemployeedata(){
    var ref = collection(db,"employe");
    tr.innerHTML= "<p class='d-flex'>Loading Please Wait...</p>";
    
   try {
   const docSnap = await getDocs(ref);
// check if collection that we are fetching if its empty excute the else statement
   if(docSnap.length){
       // console.log("db isn't empty");
       tr.innerHTML = `<p class='text-center'>There is no data to fetched , please add new data to be displayed</p>`;
    
   }
   // if its not empty  log this message
   else{
    tr.innerHTML = '';
   // console.log('Database is not empty');
   let number = 1;      
        console.log(docSnap.empty);
   
   docSnap.forEach(doc => {
    //   console.log(companyemail);
      
           if(doc.data().company_associated == companyemail){
        tr.innerHTML += `

        <tr>
        <td>${number}</td>
        <td><img src='${doc.data().profile_image}' width='80'></td>
        <td>${doc.data().fullname}</td>
        <td>${doc.data().age}</td>
        <td>${doc.data().gender}</td>
        <td>${doc.data().dob}</td>
        <td>${doc.data().phone}</td>
        <td>${doc.data().country}</td>
        <td>${doc.data().address}</td>
        <td>${doc.data().service_category}</td>
        <td><img src='${doc.data().certificate}' width='80'></td>
        <td>${doc.data().experience}</td>
        <td>${doc.data().company_associated}</td>
        <td class='d-flex'><a href="displaysingleemployeedata.html?view=${doc.id}" class='btn btn-primary'>View</a>&numsp;<a href='updateemployee.html?update=${doc.id}' class='btn btn-success'>Update</a> &numsp;<a href='view_employee.html?delete=${doc.id}' class='btn btn-danger'>Delete</a></td>
        </tr>
        
    `;
      }else{
        // tr.innerHTML = 'Empty Table Please Enter Data'

      }
      
       
  
      
       number ++;
       
       
    }); 
}
} catch (error) {
    tr.innerHTML = `<p class="text-center">${error}</p>`;
    console.log(doc.data().fullname);
   }
       
     
}

window.onload = Viewemployeedata();


// get the last of the url start from ? symbol
let url = window.location.search;

// check if the url contains word update and have id
let updateurl = url.search('delete');

let uid = url.slice(8,28).toString();
// console.log(updateurl);
if(updateurl == 1){
    async function delete_employee(){

        const docRef  = doc(db,'employe',uid);
        deleteDoc(docRef).then(() =>{
                alert('company data  deleted successfully');
                window.location.href = 'view_employee.html';
        }).catch((e)=>{
            alert('failed to delete company data',e);
        });
    }
     delete_employee();
}else{
    // console.log(updateurl);
    
}




