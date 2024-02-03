
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'
import { getDatabase, ref, update, get } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'

import { validateEmail, validatePassword } from './input-validation.js'

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

function login() {
  // Get all Input elements from HTML
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value

  // Validate Input Fields

  if (validateEmail(email) == false || validatePassword(password) == false) {
    alert('Email or Password is invalid')
    return
  }
  else {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user

        if (!user.emailVerified) {
          alert('Please check your email [' + user.email + '] for account verification!')
        }
        else {
          update(ref(db, 'users/' + user.uid), {
            e_isverified: user.emailVerified,
            f_lastlogin: Date.now()
          })

          get(ref(db, 'users/' + user.uid)).then((snapshot) => {
            if (snapshot.exists) {
              sessionStorage.setItem("user-info", JSON.stringify({
                a_email: snapshot.val().a_email,
                b_username: snapshot.val().b_username,
                c_fname: snapshot.val().c_fname,
                d_lname: snapshot.val().d_lname,
                e_isverified: snapshot.val().e_isverified,
                f_lastlogin: snapshot.val().f_lastlogin
              }))
              sessionStorage.setItem('user-credentials', JSON.stringify(userCredential.user))
              alert('User Logged in')
              window.location = 'index.html'
            }
          })
        }
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message

        console.log("LOGIN ERROR: " + errorMessage)
      })
  }
}

const loginBtn = document.getElementById('loginBtn')

loginBtn.addEventListener('click', login)