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

carouselBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        carouselBtn.forEach(el => {
            el.classList.remove('active')
        })
        
        btn.classList.add('active')
        carousel.style.transform = `translateX(-${index * 475}px)`
    })
})