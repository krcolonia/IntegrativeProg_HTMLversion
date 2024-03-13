import { db, strg } from './FirebaseInit.js'
import { ref, update, get } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'
import { ref as storeRef, getDownloadURL, uploadBytes } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js'

import { validateInput, checkImageInput } from './input-validation.js'

const imagePreview = document.getElementById('pfpPreview')
const firstName = document.getElementById('fname')
const lastName = document.getElementById('lname')
const userName = document.getElementById('username')

const uCredential = JSON.parse(sessionStorage.getItem('user-credentials'))
const uInfo = JSON.parse(sessionStorage.getItem('user-info'))

const saveChange = document.getElementById('saveChangeBtn')

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

  imagePreview.src = userImgURL
  firstName.value = `${uInfo.c_fname}`
  lastName.value = `${uInfo.d_lname}`
  userName.value = `${uInfo.b_username}`

  function updatePersonal() {

    if (!validateInput(userName.value) ||
        !validateInput(firstName.value) ||
        !validateInput(lastName.value)) 
    {
       alert('Please fill in all required inputs denoted by an asterisk')
       return
    }
  
    update(ref(db, 'users/' + uCredential.uid), {
      b_username: userName.value,
      c_fname: firstName.value,
      d_lname: lastName.value
    })
  
    if(pfpUploadFile != undefined) {
      uploadBytes(storeRef(strg, 'user-profile/' + uCredential.uid + '.png'), pfpUploadFile).then((snapshot) => {
        console.log('Uploaded image')
      },
        (error) => {
          console.log(error.code)
        })
    }
  
    get(ref(db, 'users/' + uCredential.uid)).then((snapshot) => {
      if (snapshot.exists) {
        sessionStorage.setItem("user-info", JSON.stringify({
          a_email: snapshot.val().a_email,
          b_username: snapshot.val().b_username,
          c_fname: snapshot.val().c_fname,
          d_lname: snapshot.val().d_lname,
          e_isverified: snapshot.val().e_isverified,
          f_lastlogin: snapshot.val().f_lastlogin
        }))
        alert('Updated Personal Info Successfully')
        window.location = 'profile.html'
      }
    })
  }
  
  saveChange.addEventListener('click', updatePersonal)
}