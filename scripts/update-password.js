import { auth } from './FirebaseInit.js'
import { updatePassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'

import { validatePassword, confirmPassword } from './input-validation.js'

if (!sessionStorage.getItem('user-credentials') && !sessionStorage.getItem('user-info')) {
  window.location.href = './index.html'
}
else {
  const pass = document.getElementById('pass')
  const confirmPass = document.getElementById('confirmPass')
  const saveChange = document.getElementById('saveChangeBtn')

  function updatePasswordInfo() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (validatePassword(pass.value) == false) {
          alert('Please enter a password greater than 6 characters')
          return
        }
        else if (confirmPassword(pass.value, confirmPass.value) == false) {
          alert('Your passwords do not match!')
          return
        }
        else {
          updatePassword(user, pass.value).then(() => {
            alert('Your password has been updated successfully!')
            window.location = 'profile.html'
          }).catch((error) => {
            console.log(error.code)
          })
        }
      }
      else {

      }
    })
  }

  saveChange.addEventListener('click', updatePasswordInfo)
}