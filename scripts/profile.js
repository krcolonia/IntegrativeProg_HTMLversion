import { strg } from './FirebaseInit.js'
import { ref as storeRef, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js'

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
