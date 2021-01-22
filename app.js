const sections = document.querySelectorAll('section');
const navbarLinks = document.querySelectorAll('nav a[href^="#"]');
let navbarLinksLi = [];
for (let navLink of navbarLinks) {
    navbarLinksLi.push(navLink.parentNode);
}
let array = [];
refreshArray();
let mobile;
refreshMobileVar();
let headerHeight;
refreshHeaderHeight();
let lastVisibleSection;

document.querySelector('[href="#home"]').parentNode.id = 'active-page';

window.addEventListener('load', function () {
    if (document.location.hash) {
        window.scrollTo({
            top: document.querySelector(document.location.hash).offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
});

function refreshMobileVar() {
    if (window.matchMedia('(max-width: 750px)').matches) {
        mobile = true;
    } else {
        mobile = false;
    }
}

function refreshArray() {
    array = [];
    for (let section of sections) {
        array.push(section.offsetTop - window.innerHeight / 2);
    }
}

function refreshHeaderHeight() {
    if (mobile) {
        headerHeight = 70;
    } else {
        headerHeight = 75;
    }
}

function checkVisibleSection() {
    let returnResult;
    for (let i = 0; i < array.length; i++) {
        if (window.scrollY > array[i]) {
            returnResult = i;
        } else {
            return returnResult;
        }
    }
    return returnResult;
}

window.addEventListener('resize', function () {
    refreshArray();
    refreshMobileVar();
    refreshHeaderHeight();
});

window.addEventListener('scroll', function () {
    let checkVisibleSectionId = checkVisibleSection();
    if (lastVisibleSection !== checkVisibleSectionId) {
        document.getElementById('active-page').removeAttribute('id');
        navbarLinksLi[checkVisibleSectionId].id = 'active-page';
        lastVisibleSection = checkVisibleSectionId;
    }
});

for (let hash of document.querySelectorAll('a[href^="#"]')) {
    hash.addEventListener('click', function (e) {
        e.preventDefault();
        document.location.hash = '';
        document.getElementById('hamburger-btn').checked = false;
        window.scrollTo({
            top: document.querySelector(e.target.getAttribute('href')).offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
}