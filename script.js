'use strict'
// Header
const hamburger = document.querySelector('.menu__hamburger')
const hamburgerLines = document.querySelectorAll('.hamburger-line')
const mobileMenu = document.querySelector('.menu__list')
const mobileMenuLinks = document.querySelectorAll('.menu__link')

hamburger.addEventListener('click', () => {
    hamburgerLines.forEach((line, index) => {
        line.classList.toggle(`active-hamburger-line-${index + 1}`)
    })
    mobileMenu.classList.toggle('active')
})

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerLines.forEach((line, index) => {
            line.classList.remove(`active-hamburger-line-${index + 1}`)
        })
        mobileMenu.classList.remove('active')
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