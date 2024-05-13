'use strict'
// Header
const hamburger = document.querySelector('.menu__hamburger')
const hamburgerLines = document.querySelectorAll('.hamburger-line')
const mobileMenu = document.querySelector('.menu__list')
const mobileMenuLinks = document.querySelectorAll('.menu__link')
const header = document.querySelector('.header')

function toggleMobileMenu() {
    hamburgerLines.forEach((line, index) => {
        line.classList.toggle(`active-hamburger-line-${index + 1}`)
    })
    mobileMenu.classList.toggle('active')
}

hamburger.addEventListener('click', (toggleMobileMenu))

mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', (toggleMobileMenu))
})

//Close windows (if...)
document.addEventListener('click', (event) => {
    const menuClicked = event.target.closest('.menu__container')

    if (mobileMenu.classList.contains('active') && !menuClicked) {
        toggleMobileMenu()
    }

    const profileMenuClicked = event.target.closest('.menu__user')

    if (modalUnauth.classList.contains('active') && !profileMenuClicked) {
        toggleUnauthMenu()
    }
    if (modalAuth.classList.contains('active') && !profileMenuClicked) {
        toggleAuthMenu()
    }

    if (modalUnauth.classList.contains('active') && modalLogIn.classList.contains('active')) {
        toggleUnauthMenu()
    }
    if (modalUnauth.classList.contains('active') && modalRegister.classList.contains('active')) {
        toggleUnauthMenu()
    }

    if (event.target === background && modalLogIn.classList.contains('active')) {
        toggleModalLogIn()
    }
    if (event.target === background && modalRegister.classList.contains('active') ){
        toggleModalRegister()
    }
    if (event.target === background && modalProfile.classList.contains('active') ){
        toggleModalProfile()
    }
    if (event.target === background && modalBuy.classList.contains('active') ){
        toggleModalBuy()
    }

    if (background.classList.contains('active') && mobileMenu.classList.contains('active')) {
        toggleMobileMenu()
    }
    if (background.classList.contains('active') && modalAuth.classList.contains('active')) {
        toggleAuthMenu()
    }

})

//Log-in dropdowns
const iconUnlogged = document.querySelector('.icon__no-auth')
const iconLogged = document.querySelector('.icon__auth')

const modalUnauth = document.querySelector('.profile__no-auth')
const logInLinks = document.querySelectorAll('.profile__log-in')
const registerLinks = document.querySelectorAll('.profile__register')

const modalAuth = document.querySelector('.profile__auth')
const profileLinks = document.querySelectorAll('.profile__my-profile')
const logOutLinks = document.querySelectorAll('.profile__log-out')

function toggleUnauthMenu() {
    modalUnauth.classList.toggle('active')
}

function toggleAuthMenu() {
    modalAuth.classList.toggle('active')
}

iconUnlogged.addEventListener('click', (toggleUnauthMenu))
iconLogged.addEventListener('click', (toggleAuthMenu))

//Authorization windows
const background = document.querySelector('.authorization')
const modalLogIn = document.querySelector('.modal__log-in')
const closeLogIn = document.querySelector('.log-in__close')

const modalRegister = document.querySelector('.modal__register')
const closeRegister = document.querySelector('.register__close')

function toggleModalLogIn() {
    background.classList.toggle('active')
    modalLogIn.classList.toggle('active')
}

logInLinks.forEach((link) => {
    link.addEventListener('click', () => {
        toggleModalLogIn()
        if (modalRegister.classList.contains('active')){
            toggleModalRegister()
        }
    })
})
closeLogIn.addEventListener('click', (toggleModalLogIn))

function toggleModalRegister() {
    background.classList.toggle('active')
    modalRegister.classList.toggle('active')
}

registerLinks.forEach((link) => {
    link.addEventListener('click', () => {
        toggleModalRegister()
        if (modalLogIn.classList.contains('active')){
            toggleModalLogIn()
        }
    })
})
closeRegister.addEventListener('click', (toggleModalRegister))

//REGISTRATION
const registerForm = document.getElementById('register')
const registerFormFields = registerForm.elements

let users = []
let currentUser = null
if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'))
}
if (localStorage.getItem('currentUser')) {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

registerForm.addEventListener('submit', function(event) {
    event.preventDefault()

    const firstName = registerFormFields['first-name'].value
    const lastName = registerFormFields['last-name'].value
    const fullName = `${firstName} ${lastName}`
    const email = registerFormFields['e-mail'].value
    const password = registerFormFields['password'].value
    const cardNumber = Math.floor(Math.random() * 0x1000000000).toString(16).padStart(9, '0').toUpperCase()
    let visitsCount = 1
    let booksRent = []
    let bonuses = 0

    const bankCardNumber = null
    const bankCardMonth = null
    const bankCardYear = null
    const bankCardCvc = null
    const bankPostalCode = null
    const bankCity = null

    const user = {
        firstName,
        lastName,
        fullName,
        email,
        password,
        cardNumber,
        visitsCount,
        booksRent,
        bonuses,
        bankCardNumber,
        bankCardMonth,
        bankCardYear,
        bankCardCvc,
        bankPostalCode,
        bankCity

    }

    if (password.length < 8) {
        alert('Password must contain at least 8 symbols')
        return
    }

    if (users.some(user => user.email === email)) {
        alert('E-mail already exists')
        return
    }

    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    alert('Registration successful!')
    toggleModalRegister()
})

//LOGIN
const loginForm = document.getElementById('login')
const loginFormFields = loginForm.elements

function iconChange() {
    iconUnlogged.classList.toggle('logged')
    iconLogged.classList.toggle('logged')
}

if (!iconLogged.classList.contains('logged')) {
    localStorage.removeItem('currentUser')
}

const libraryCardBtn = document.querySelector('.library-card__form-button')
const libraryCardForm = document.querySelector('.library-card__form-profile')
let libraryCardName = document.getElementById('readers-name')
let libraryCardNumber = document.getElementById('readers-card-number')

function libraryCardToggle() {
    libraryCardBtn.classList.toggle('active')
    libraryCardForm.classList.toggle('active')
    if (currentUser && iconLogged.classList.contains('logged')) {
        libraryCardName.value = currentUser.fullName
        libraryCardNumber.value = currentUser.cardNumber
        libraryCardName.setAttribute('readonly', 'readonly')
        libraryCardNumber.setAttribute('readonly', 'readonly')
    } else {
        libraryCardName.removeAttribute('readonly')
        libraryCardNumber.removeAttribute('readonly')
    }
}
 
const userIcon = document.querySelectorAll('.icon__auth')
const userFullName = document.querySelector('.user-full-name')
const userCardNumber = document.querySelectorAll('.user-card-number')
const userVisitsCount = document.querySelectorAll('.user-visits-counter')
const userBonusesCount = document.querySelectorAll('.user-bonuses-counter')
const userBooksCount = document.querySelectorAll('.user-books-counter')

loginForm.addEventListener('submit', function(event) {
    event.preventDefault()

    const emailLogin = loginFormFields['e-mail'].value
    const passwordLogin = loginFormFields['password'].value
    currentUser = users.find(user => user.email === emailLogin || user.cardNumber === emailLogin && user.password === passwordLogin)

    if (currentUser) {
        toggleModalLogIn()
        iconChange()

        let initials = `${currentUser.firstName[0]}${currentUser.lastName[0]}`
        userIcon.forEach(element => {
            element.innerHTML = initials
        })
        currentUser.visitsCount += 1
        userVisitsCount.forEach(element => {
            element.innerHTML = currentUser.visitsCount
        })
        userBonusesCount.forEach(element => {
            element.innerHTML = currentUser.bonuses
        })
        userBooksCount.forEach(element => {
            element.innerHTML = currentUser.booksRent.length
        })
        userCardNumber.forEach(element => {
            element.innerHTML = currentUser.cardNumber
            if (element.closest('.profile__auth')) {
                element.style.fontSize = '12px'
            }
        })
        userFullName.innerHTML = currentUser.fullName

        const updatedUsers = users.map(user => user.email === currentUser.email ? currentUser : user)
        localStorage.setItem('users', JSON.stringify(updatedUsers))
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        libraryCardToggle()
        changeLibrarycardsLinks(registerLinks)
        changeLibrarycardsLinks(profileLinks)
        changeLibrarycardsLinks(logInLinks)
        updateBuyButtons()
        updateRentedList()
        alert('Login successful!')
    } else {
        alert('Invalid e-mail or password!')
        return
    }
})

//PROFILE
const modalProfile = document.querySelector('.modal__profile')
const closeProfile = document.querySelector('.profile__close')
const copyCardNumberIcon = document.getElementById('copyCardNumber')

copyCardNumberIcon.addEventListener('click', () => {
    navigator.clipboard.writeText(currentUser.cardNumber)
    alert('Copied to clipboard')
})

function toggleModalProfile() {
    background.classList.toggle('active')
    modalProfile.classList.toggle('active')
}

closeProfile.addEventListener('click', toggleModalProfile)

profileLinks.forEach((link) => {
    link.addEventListener('click', toggleModalProfile)
})

//BUY
const modalBuy = document.querySelector('.modal__buy')
const closeBuy = document.querySelector('.buy__close')
const buyForm = document.getElementById('buy')
const buyFormFields = buyForm.elements
const buyBookBtns = document.querySelectorAll('.book-btn')
const books = document.querySelectorAll('.book')

const booksInfo = []
books.forEach((book) => {
    const title = book.querySelector('.book-title h5').textContent
    const author = book.querySelector('.book-title h6').textContent.replace('By ', '')
    booksInfo.push({ title, author})
})

function toggleModalBuy() {
    background.classList.toggle('active')
    modalBuy.classList.toggle('active')
}
closeBuy.addEventListener('click', toggleModalBuy)

buyForm.addEventListener('submit', function(event) {
    event.preventDefault()

    const bankCardNumber = buyFormFields['bank-card-number'].value
    const bankCardMonth = buyFormFields['bank-card-exp-code-month'].value
    const bankCardYear = buyFormFields['bank-card-exp-code-year'].value
    const bankCardCvc = buyFormFields['bank-card-cvc'].value
    const bankPostalCode = buyFormFields['bank-postal-code'].value
    const bankCity = buyFormFields['bank-city'].value

    currentUser.bankCardNumber = bankCardNumber
    currentUser.bankCardMonth = bankCardMonth
    currentUser.bankCardYear = bankCardYear
    currentUser.bankCardCvc = bankCardCvc
    currentUser.bankPostalCode = bankPostalCode
    currentUser.bankCity = bankCity

    const updatedUsers = users.map(user => user.email === currentUser.email ? currentUser : user)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    localStorage.setItem('currentUser', JSON.stringify(currentUser))

    alert('Purchase successful!')
    toggleModalBuy()
})

buyBookBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (currentUser && currentUser.bankCardNumber === null) {
            toggleModalBuy()
        } else if (currentUser && currentUser.bankCardNumber !== null) {
            if (!currentUser.booksRent.includes(index)) {
                currentUser.booksRent.push(index)
                btn.textContent = 'Own'
                btn.classList.add('purchased')
                updateRentedList()
                const updatedUsers = users.map(user => user.email === currentUser.email ? currentUser : user)
                localStorage.setItem('users', JSON.stringify(updatedUsers))
                localStorage.setItem('currentUser', JSON.stringify(currentUser))
            }
        }
    })
})

function updateBuyButtons() {
    buyBookBtns.forEach((btn, index) => {
        if (currentUser && currentUser.booksRent.includes(index)) {
            btn.textContent = 'Own'
            btn.classList.add('purchased')
        } else {
            btn.textContent = 'Buy'
            btn.classList.remove('purchased')
        }
    })
}

function updateRentedList() {
    const rentedList = document.querySelector('.rented-list')
    rentedList.innerHTML = ''
  
    if (currentUser && currentUser.booksRent.length > 0) {
        currentUser.booksRent.forEach((index) => {
            const listItem = document.createElement('li')
            listItem.textContent = `${booksInfo[index].title}, ${booksInfo[index].author}`
            rentedList.appendChild(listItem)
        })
    }
}

//LIBRARY CARD CHECK
const cardCheckForm = document.getElementById('card-check')
const cardCheckFormFields = cardCheckForm.elements

cardCheckForm.addEventListener('submit', function(event) {
    event.preventDefault()

    const readersCardFullname = cardCheckFormFields['readers-name'].value
    const readersCardNumber = cardCheckFormFields['readers-card-number'].value
    const user = users.find(user => user.fullName === readersCardFullname && user.cardNumber === readersCardNumber)

    if (user && !iconLogged.classList.contains('logged')) {
        libraryCardName.value = user.fullName
        libraryCardNumber.value = user.cardNumber
        libraryCardName.setAttribute('readonly', 'readonly')
        libraryCardNumber.setAttribute('readonly', 'readonly')
        libraryCardBtn.classList.toggle('active')
        libraryCardForm.classList.toggle('active')
        userVisitsCount.forEach(element => {
            element.innerHTML = user.visitsCount
        })
        userBonusesCount.forEach(element => {
            element.innerHTML = user.bonuses
        })
        userBooksCount.forEach(element => {
            element.innerHTML = user.booksRent.length
        })
        setTimeout(() => {
            libraryCardName.removeAttribute('readonly')
            libraryCardNumber.removeAttribute('readonly')
            libraryCardBtn.classList.toggle('active')
            libraryCardForm.classList.toggle('active')
        }, 15000)
    } else {
        alert('Card not found')
    }
})

//LOG OUT
function loggedOut() {
    iconUnlogged.classList.toggle('logged')
    iconLogged.classList.toggle('logged')
}

function changeLibrarycardsLinks(elements) {
    elements.forEach((element) => {
        if (element.classList.contains('logged')){
            element.classList.replace('logged', 'unlogged')
        }
        else if (element.classList.contains('unlogged')) {
            element.classList.replace('unlogged', 'logged')
        }
    })
}

logOutLinks.forEach((link) => {
    link.addEventListener('click', () => {
        loggedOut()
        localStorage.removeItem('currentUser')
        currentUser = null
        changeLibrarycardsLinks(registerLinks)
        changeLibrarycardsLinks(profileLinks)
        changeLibrarycardsLinks(logInLinks)
        libraryCardToggle()
        libraryCardName.value = ''
        libraryCardNumber.value = ''
        updateBuyButtons()
        if (modalAuth.classList.contains('active')){
            toggleAuthMenu()
        }
        
        alert('Logged out')
    })
})

// About
const carouselBtn = document.querySelectorAll('.carousel-btn')
const carousel = document.querySelector('.carousel-content')
const carouselSwipeLeft = document.querySelector('.carousel-swipe-left')
const carouselSwipeRight = document.querySelector('.carousel-swipe-right')

let btnIndex = 0

carouselBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        carouselBtn.forEach(el => {
            el.classList.remove('active')
        })
        btnIndex = index
        btn.classList.add('active')
        carousel.style.transform = `translateX(-${index * 475}px)`
    })
})

carouselSwipeRight.addEventListener('click', () => {
    if (btnIndex < carouselBtn.length - 1) {
        btnIndex++
        carouselBtn[btnIndex].click()
    }
})

carouselSwipeLeft.addEventListener('click', () => {
    if (btnIndex > 0) {
        btnIndex--
        carouselBtn[btnIndex].click()
    }
})

// Favorites
const radioBtn = document.querySelectorAll("input[type = 'radio']")
const seasons = document.querySelectorAll(".card-container > div")

radioBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        radioBtn.forEach(el => {
            el.classList.remove('active')
        })
        btn.classList.add('active')
        
        seasons.forEach((season, i) => {
            if (i !== index && season.classList.contains('fade-in')) {
                season.classList.remove('fade-in')
                season.classList.add('fade-out')
            }
        })

        seasons[index].classList.remove('fade-out')
        seasons[index].classList.add('fade-in')
    })
})