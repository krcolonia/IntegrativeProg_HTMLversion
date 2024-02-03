const userStatPC = document.getElementById('userStat')

const regBtn = document.getElementById('register')
const loginBtn = document.getElementById('login')
const logoutBtn = document.getElementById('logout')

const uCredential = JSON.parse(sessionStorage.getItem('user-credentials'))
const uInfo = JSON.parse(sessionStorage.getItem('user-info'))


let checkCred = () => {
  if (!sessionStorage.getItem('user-credentials')) {
    userStat.style.display = 'none'
    logoutBtn.style.display = 'none'
    regBtn.style.display = 'auto'
    loginBtn.style.display = 'auto'
  }
  else {
    userStat.innerText = `Welcome back ${uInfo.b_username}`

    userStat.style.display = 'auto'
    logoutBtn.style.display = 'auto'
    regBtn.style.display = 'none'
    loginBtn.style.display = 'none'
  }
}

let signOut = () => {
  sessionStorage.clear()
  window.location.reload()
}

window.addEventListener('load', checkCred)

logoutBtn.addEventListener('click', signOut)

function dropDownFunc() {
  var menu = document.querySelector(".headerDropdown");

  // if(window.innerWidth <= 768) {
  if (document.readyState === 'complete') {
    if (menu.style.top === "-200px" || menu.style.top === "") {
      menu.style.top = "55px";
    }
    else {
      menu.style.top = "-200px";
    }
  }
}
