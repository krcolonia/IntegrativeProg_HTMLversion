import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'
import { getStorage, ref as storeRef, getDownloadURL, uploadBytes } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js'


import { validateEmail, validatePassword, confirmPassword, checkImageInput } from './input-validation.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_0O36aBkj5rDA7F33hcAWcKzD2WvD4pI",
  authDomain: "integrativeprogramming-e73c9.firebaseapp.com",
  databaseURL: "https://integrativeprogramming-e73c9-default-rtdb.firebaseio.com",
  projectId: "integrativeprogramming-e73c9",
  storageBucket: "integrativeprogramming-e73c9.appspot.com",
  messagingSenderId: "895225183464",
  appId: "1:895225183464:web:a70b1d21cb4cf96ae11d5d"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getDatabase(app)
const strg = getStorage(app, 'gs://integrativeprogramming-e73c9.appspot.com')

const verified = document.getElementById('isVerified')
const imagePreview = document.getElementById('pfpPreview')
const fullName = document.getElementById('profileName')
const userName = document.getElementById('profileUsername')
const emailAdd = document.getElementById('profileEmail')

const uCredential = JSON.parse(sessionStorage.getItem('user-credentials'))
const uInfo = JSON.parse(sessionStorage.getItem('user-info'))

if(!sessionStorage.getItem('user-credentials') && !sessionStorage.getItem('user-info')){
  window.location.href = './index.html'  
}
else {
  // Sets the default profile pic from Firebase Storage
  let userImg = storeRef(strg, `user-profile/${uCredential.uid}.png`)
  let userImgURL = await getDownloadURL(userImg)
  
  // Replaces hamburger icon with profile picture
  const menuBtn = document.getElementById('menuIcon')
  menuBtn.src = userImgURL
  menuBtn.style.filter = 'none'
  menuBtn.style.border = '2px solid white'
  menuBtn.style.borderRadius = '50%'
  
  if(uInfo.e_isverified == true) {
    verified.innerHTML = 'Verified Account'
    verified.style.color = '#B2FBA5'
  }
  else {
    verified.innerHTML = 'Unverified Account'
    verified.style.color = '#FF6961'
  }

  imagePreview.src = userImgURL
  fullName.innerHTML = `${uInfo.c_fname} ${uInfo.d_lname}`
  userName.innerHTML = `@${uInfo.b_username}`
  emailAdd.innerHTML = `${uInfo.a_email}`
}
