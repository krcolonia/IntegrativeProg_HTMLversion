import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'

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
const auth = getAuth(app)

const uCredential = JSON.parse(sessionStorage.getItem('user-credentials'))
const uInfo = JSON.parse(sessionStorage.getItem('user-info'))