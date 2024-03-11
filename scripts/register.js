import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'
import { getStorage, ref as storeRef, getDownloadURL, uploadBytes } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js'


import { validateInput, validateEmail, validatePassword, confirmPassword, checkImageInput } from './input-validation.js'

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

let defaultImg = storeRef(strg, 'user-profile/default.png')
let defaultImgURL = await getDownloadURL(defaultImg)

const imagePreview = document.getElementById('pfpPreview')
imagePreview.src = defaultImgURL

const imageInput = document.getElementById('pfpUpload')
var pfpUploadFile

function previewPfpImage() {
  if (imageInput.files && imageInput.files[0]) {
    var reader = new FileReader()
    reader.onload = function (e) {
      imagePreview.src = e.target.result
      pfpUploadFile = imageInput.files[0]
    }
    reader.readAsDataURL(imageInput.files[0])
  }
}

imageInput.addEventListener('change', previewPfpImage)

function register() {
  // Get all Input elements from HTML
  var username = document.getElementById('username').value
  var fname = document.getElementById('fname').value
  var lname = document.getElementById('lname').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var confirmPass = document.getElementById('confirmPass').value

  // Validate Input Fields

  if (!validateInput(username) ||
      !validateInput(fname) ||
      !validateInput(lname) || !validateEmail(email) ||
      !validatePassword(password) ||
      !confirmPassword(password, confirmPass) ||
      !checkImageInput(imageInput)) 
  {
     alert('Please fill in all required inputs denoted by an asterisk')
     return
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      // Signs up account
      const user = userCredential.user

      // Sends verification to email used in registration
      sendEmailVerification(user)
        .then(() => {
          alert('An email verification has been sent to ' + user.email)
          window.location = 'login.html'
        })
        .catch((error) => {
          var verifyErrCode = error.code

          console.log('VERIFICATION ERROR: ' + verifyErrCode)
        })

      // Add user info to firebase DB
      set(ref(db, 'users/' + user.uid), {
        a_email: email,
        b_username: username,
        c_fname: fname,
        d_lname: lname,
        e_isverified: user.emailVerified,
        f_lastlogin: Date.now()
      })

      // Upload Profile image to Firebase

      uploadBytes(storeRef(strg, 'user-profile/' + user.uid + '.png'), pfpUploadFile).then((snapshot) => {
        console.log('Uploaded image')
      },
        (error) => {
          console.log(error.code)
        })

      alert('User Created')

    })
    .catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message

      console.log(errorCode)
    })
}


const registerBtn = document.getElementById('registerBtn')

registerBtn.addEventListener('click', register)