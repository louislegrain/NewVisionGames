const sections = document.querySelectorAll('section');
const donateCheckbox = document.getElementById('donate');
const aside = document.querySelector('aside');
let mobile;
refreshMobileVar();
let headerHeight;
refreshHeaderHeight();
document.querySelector('[href="#home"]').parentNode.id = 'active-page';

window.addEventListener('load', function () {
    if (document.location.hash === '#donate') {
        document.location.hash = '';
        donateCheckbox.checked = true;
        checkboxChange();
    } else if (document.location.hash) {
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

function refreshHeaderHeight() {
    if (mobile) {
        headerHeight = 70;
    } else {
        headerHeight = 75;
    }
}

function checkboxChange() {
    if (donateCheckbox.checked) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = 'visible';
    }
}

window.addEventListener('resize', function () {
    refreshMobileVar();
    refreshHeaderHeight();
});

// IntersectionObserver
const options = {
    root: null,
    rootMargin: '-50% 0px -50% 0px'
};

const handleIntersect = function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            document.getElementById('active-page').removeAttribute('id');
            document.querySelector('nav a[href="#' + entry.target.id + '"]').parentNode.id = 'active-page';
        }
    });
}
  
const observer = new IntersectionObserver(handleIntersect, options);

if ('IntersectionObserver' in window) {
    sections.forEach(function (object) {
        observer.observe(object);
    });
}

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

document.querySelector('#open-donate-menu label').addEventListener('click', function () {
    document.getElementById('hamburger-btn').checked = false;
});

donateCheckbox.addEventListener('change', function () {
    checkboxChange();
});

aside.addEventListener('click', function (e) {
    if (e.target === aside) {
        donateCheckbox.checked = false;
        checkboxChange();
    }
});