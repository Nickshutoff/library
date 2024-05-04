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

//Close windows (if clicked outside)
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

    if (event.target === background && modalLogIn.classList.contains('active')){
        toggleModalLogIn()
    }
    if (event.target === background && modalRegister.classList.contains('active')){
        toggleModalRegister()
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

//Registration
const registerForm = document.getElementById('register')
const registerFormFields = registerForm.elements
const loginForm = document.getElementById('login')
const loginFormFields = loginForm.elements

