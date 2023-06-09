   // Import the functions you need from the SDKs you need
   import { initializeApp} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import {getFirestore,addDoc,collection,getDocs} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
   import {getAuth , 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
    import {getStorage,ref,uploadBytes,getDownloadURL} from"https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

   import {firebaseConfig} from './firebase.js';





        // firebase intialization
        const app = initializeApp(firebaseConfig);
    
        // call the  get database method
    const db = getFirestore();
    // call firebase auth
    
   const auth = getAuth(app);
     // check the auth change status then get the email of the user
     let useremail = '';
     let userid;
     auth.onAuthStateChanged((user)=>{
         if(user){
            // console.log(user.uid);
            useremail = user.email;
            userid = user.uid;
            
            
           
         }
        });



 let profile = document.getElementById('profile-img');
 let fullname = document.getElementById('fullname');
 let subname = document.getElementById('subname');



 async function getprofilefortopbar(){

    let dRef = collection(db,'company');
    let docRef = await getDocs(dRef);

    docRef.forEach(doc => {

        if(doc.data().email == useremail){

            profile.src = `${doc.data().company_logo}`;
            fullname.innerHTML = doc.data().company_name;
            subname.innerHTML = doc.data().company_name;
        }
    });

 }

 window.onload = getprofilefortopbar();