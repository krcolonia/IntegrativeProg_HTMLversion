import { auth, strg } from './FirebaseInit.js'
import { updatePassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'
import { ref as storeRef, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js'

import { validatePassword, confirmPassword } from './input-validation.js'

if (!sessionStorage.getItem('user-credentials') && !sessionStorage.getItem('user-info')) {
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
          if(confirm('Are you sure you want to change your password?')) {
            updatePassword(user, pass.value).then(() => {
              alert('Your password has been updated successfully!')
              window.location = 'profile.html'
            }).catch((error) => {
              console.log(error.code)
            })
          }
          else {
            alert('Password change cancelled.')
          }
        }
      }
      else {

      }
    })
  }

  saveChange.addEventListener('click', updatePasswordInfo)
}