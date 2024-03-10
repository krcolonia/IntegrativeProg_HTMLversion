import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'
import { getDatabase, ref, update, get } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'
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
}

function updatePersonal() {

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