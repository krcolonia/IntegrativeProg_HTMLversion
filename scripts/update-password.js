import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, updatePassword, reauthenticateWithCredential } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'

import { validatePassword, confirmPassword } from './input-validation.js'

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

const pass = document.getElementById('pass')
const confirmPass = document.getElementById('confirmPass')
const saveChange = document.getElementById('saveChangeBtn')

const uCredential = JSON.parse(sessionStorage.getItem('user-credentials'))

// auth.

function updatePasswordInfo() {

  onAuthStateChanged((user) => {
    if (validatePassword(pass.value) == false) {
      alert('Please enter a password greater than 6 characters')
      return
    }
    else if (confirmPassword(pass.value, confirmPass.value) == false) {
      alert('Your passwords do not match!')
      return
    }
    else {
      console.log("dapat lumabas kung valid pass")
      updatePassword(user, pass.value).then(() => {
        console.log("pass update success")
      }).catch((error) => {
        console.log(error.code)
      })
    }
  })
}

saveChange.addEventListener('click', updatePasswordInfo)