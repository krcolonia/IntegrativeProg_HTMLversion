import { auth, db } from './FirebaseInit.js'
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'
import { ref, update, get } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'

import { validateEmail, validatePassword } from './input-validation.js'

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

        console.log(errorCode)

        if(errorCode == 'auth/invalid-credential'){
          alert("Invalid credentials. Please check your E-mail/Password input");
        }
        else {
          alert(`ERROR: ${errorCode}`)
        }
      })
  }
}

const loginBtn = document.getElementById('loginBtn')

loginBtn.addEventListener('click', login)