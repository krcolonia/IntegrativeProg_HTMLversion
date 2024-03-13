import { strg } from './FirebaseInit.js'
import { ref as storeRef, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js'

const uCredential = JSON.parse(sessionStorage.getItem('user-credentials'))

// Retrieves the profile picture of the current user
let userImg = storeRef(strg, `user-profile/${uCredential.uid}.png`)
let userImgURL = await getDownloadURL(userImg)

// Replaces hamburger icon with profile picture
const menuBtn = document.getElementById('menuIcon')
menuBtn.src = userImgURL
menuBtn.style.filter = 'none'
menuBtn.style.border = '2px solid white'
menuBtn.style.borderRadius = '50%'