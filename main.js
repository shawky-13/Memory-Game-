// select the element
let spanClicked = document.querySelector('.control span')
let helloName = document.querySelector('.info span')
let fullScreenDiv = document.querySelector('.control')
let blocks = Array.from(document.querySelectorAll('.block'))
let gameBlock = document.querySelector('.game-blocks')
let successPopup = document.querySelector('.success-popup')
let failPopup = document.querySelector('.fail-popup')
let btnFail = document.getElementById('btn-fail')
let btnSuccess = document.getElementById('btn-success')
let user = document.querySelector('.common .con span')
let tableBody = document.querySelector('table .body')
let available = document.querySelector('.available span')
// ////////////////////////////////////////////////////////////////
// for storing data in localstorage
let usersArr = [] // ///
// create variable for localstorage using
let userName = 'Unknown', stat = '',trie = ''
// when i clicked on the start game span
// ////////////////////////////////////////////////////////////////
// check if there are element inside the localStorage
// the if condition for store the old data you submit it into the localstorage after add new data
if (localStorage.getItem('Users')) {
  usersArr = JSON.parse(localStorage.getItem('Users'))
}
// trigger the fucntion 
getElementFromLocalStorage()
// ////////////////////////////////////////////////////////////////

spanClicked.addEventListener('click', function () {
  // make the prompt that make a popup that contains an input and button like alert 
  let pro = prompt('Enter You Name')
  userName = pro
  // check if the pro is empty or not 
  if (pro === '' || pro == null) {
    helloName.innerHTML = 'Unknown'
    userName = 'Unknown'
  } else {
    // put the prompt input value in the hellName span 
    helloName.innerHTML = pro
  }
  // remove the full screen div 
  fullScreenDiv.remove()
  // play welcome sound
  // document.getElementById('welcome').play()
  // make all cards seen for 5 seconds and then hide it 
  blocks.forEach((block) => {
    block.classList.add('rotated')
  })
  setTimeout(() => {
    blocks.forEach((block) => {
      block.classList.remove('rotated')
    })
  }, 2000)
  // looping on blocks 
  blocks.forEach((block, index) => {
    // set the css order property to the every block 
    block.style.order = arr[index]
    // call the filpled function 
    filpled(block)
  })
})

// ////////////////////////////////////////////////////////////////
// create a duration variable 
let duration = 1000

// note : you can use querySelector and use .children to loop on the element of block div 

// ////////////////////////////////////////////////////////////////
let final = []

// create the random values to make the order of the elements

let arr = [...Array(blocks.length).keys()]
// note: i used the ... to extract the keys of the the array

// calling the suffle function to make the random array 
suffle(arr)

// create suffle function
function suffle (array) {
  // / create variables 
  let current = arr.length, temp, random
  // make the loop 
  while (current > 0) {
    // decrease the current value 
    current--
    random = Math.floor(Math.random() * current)
    // //  put  the value of the current index in the temporary variable
    temp = arr[current]
    // // put the value of the random index in the current value
    arr[current] = arr[random]
    // //  put the value of random variable in the temp value
    arr[random] = temp
  }
  return array
}

// create filpled function 
function filpled (block) {
  // add event click on the block 
  block.addEventListener('click', function () {
    // add rotated class to the block element 
    this.classList.add('rotated')
    // collect All Cards Selected 
    let allSelectedCards = blocks.filter(selected => selected.classList.contains('rotated'))
    // check if the cards selected are equal 2 
    if (allSelectedCards.length === 2) {
      // stop clicking function
      stopclicking(block)
      // call the function that check if the block = block matching function
      checkBlock(allSelectedCards[0], allSelectedCards[1])
    }
  })
}

// create function that check if the block = block 
function checkBlock (firstBlock, secondBlock) {
  let tries = document.querySelector('.tries span')

  if (firstBlock.dataset.photo === secondBlock.dataset.photo) {
    // decrease number of tries
    available.innerHTML--
    // remove rotated class and add new class that you know that the blocks are matching with each other
    firstBlock.classList.remove('rotated')
    secondBlock.classList.remove('rotated')
    // add the new class
    firstBlock.classList.add('match')
    secondBlock.classList.add('match')
    // play the success sounds 
    document.getElementById('success').play()
    // check if all cards are selected 
    final.push(firstBlock, secondBlock)
    // show the popup
    if (final.length == '20') {
      // make value of the stat variable equal success
      stat = 'Success'
      // set the number of tries
      trie = tries.innerHTML
      // // 
      setTimeout(() => {
        // play congratz sounds
        document.getElementById('congratz').play()
        // show the popup
        successPopup.setAttribute('style', 'z-index:100 !important; opacity:1 !important;')
        // append the fullScreenDiv to the page to blur the page
        document.body.appendChild(fullScreenDiv)
        // click on the button 
        btnSuccess.onclick = function () {
          location.reload()
        }
      }, 500)
      // call function tha add users to its array
      addUsersToArray(userName)
    }
  } else {
    // decrease number of tries
    available.innerHTML--
    // increase number of wrong trires
    tries.innerHTML++
    // set the number of tries
    trie = tries.innerHTML
    // remove the rotated class 
    setTimeout(() => {
      firstBlock.classList.remove('rotated')
      secondBlock.classList.remove('rotated')
    }, duration)
    // play the Fail sounds 
    document.getElementById('fail').play()
    // if the number of wrong tries equal to 9 make a popup that gameOver
    if (parseInt(available.innerHTML) == 0) {
      // submit user name into the span of the popup
      user.innerHTML = userName
      // submit user name into the span of the popup
      // make value of state variable equal fail
      stat = 'Fail'
      setTimeout(() => {
        // play gameover sound 
        document.getElementById('gameover').play()
        // show the popup
        failPopup.setAttribute('style', 'z-index:100 !important; opacity:1 !important;')
        // append the fullScreenDiv to the page to blur the page
        document.body.appendChild(fullScreenDiv)
        // click on the button 
        btnFail.onclick = function () {
          location.reload()
        }
      }, 500)
      // call function tha add users to its array
      addUsersToArray(userName)
    }
  }
}

// create function that stop clicking 
function stopclicking (gameBlock) {
  gameBlock.classList.add('stop-click')
  // setting settimeout function  
  setTimeout(() => {
    gameBlock.classList.remove('stop-click')
  }, duration)
}
// /////////////////////////////////////////////////////////////////////////////////
// For Store data inside localstorage
// the function  to add task to array and display it on screen
function addUsersToArray (username) {
  // submit user name into the span of the popup
  user.innerHTML = userName
  // create the object  for each new User
  let newUser = {
    username: username,
    status: stat,
    tries: trie
  }
  // push the newUser in the userArr
  usersArr.push(newUser)
  // Add Elements to page by creating its function
  addElementToPage(usersArr)
  // call the localStorage function
  addElementToLocalStorage(usersArr)
}

// /////////////////////////////////////////////////

// create function that i used it to add elements into the localstorage
function addElementToLocalStorage (userArr) {
  // use JSON.stringify => to convert the object 
  window.localStorage.setItem('Users', JSON.stringify(userArr))
}
// /////////////////////////////////////////////////

// create function that i used it to get elements from the localstorage
function getElementFromLocalStorage () {
  let data = window.localStorage.getItem('Users')
  // check if there are data inside the localstorage 
  // if is it add it into the page
  if (data) {
    let users = JSON.parse(data)
    addElementToPage(users)
  }
}

// create the function the create the element user
function addElementToPage (usersElement) {
  tableBody.innerHTML = ''
  usersElement.forEach(user => {
    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${user['username']}</td>
    <td class="text-center">${user['status']}</td>
    <td class="text-center">${user['tries']}</td>
    <td class="text-center">${15 - available.innerHTML}</td>
    `
    tableBody.appendChild(tr)
  })
}

// make the page go to the top when reload the page
window.addEventListener('load', function () {
  window.scrollTo(0, 0)
})

// ////////////////////ماشاء الله لا قوه الا بالله //////////////////////////////

localStorage.clear()
