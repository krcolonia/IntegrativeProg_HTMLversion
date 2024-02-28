import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'
import { getStorage, ref as storeRef, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js'

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

const app = initializeApp(firebaseConfig)
const strg = getStorage(app, 'gs://integrativeprogramming-e73c9.appspot.com')

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