const sections = document.querySelectorAll('section');
const donateCheckbox = document.getElementById('donate');
const aside = document.querySelector('aside');
let mobile;
refreshMobileVar();
let headerHeight;
refreshHeaderHeight();
document.querySelector('[href="#home"]').parentNode.id = 'active-page';

const focusableElements = document.querySelectorAll('input, select, area, textarea, a, button, [tabindex]');
const focusableElementsWithinAside = Array.from(document.querySelector('aside').querySelectorAll('input, select, area, textarea, a, button, [tabindex]'));
let arrayTabIndex = [];
for (let focusableElement of focusableElements) {
    arrayTabIndex.push(focusableElement.getAttribute('tabindex'));
}

window.addEventListener('load', function () {
    if (document.location.hash === '#donate') {
        document.location.hash = '';
        checkboxChange(true);
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

function checkboxChange(boolean) {
    if (boolean !== undefined) {
        donateCheckbox.checked = boolean;
    }
    if (donateCheckbox.checked) {
        document.getElementById('hamburger-btn').checked = false;
        document.body.style.overflowY = 'hidden';
        for (let i = 0; i < focusableElements.length; i++) {
            let focusableElement = focusableElements[i];
            if (focusableElementsWithinAside.indexOf(focusableElement) === -1) {
                focusableElement.setAttribute('tabindex', '-1');
            } else {
                if (arrayTabIndex[i]) {
                    focusableElement.setAttribute('tabindex', arrayTabIndex[i]);
                } else {
                    focusableElement.removeAttribute('tabindex');
                }
            }
        }
    } else {
        document.body.style.overflowY = 'visible';
        for (let i = 0; i < focusableElements.length; i++) {
            let focusableElement = focusableElements[i];
            if (focusableElementsWithinAside.indexOf(focusableElement) === -1) {
                if (arrayTabIndex[i]) {
                    focusableElement.setAttribute('tabindex', arrayTabIndex[i]);
                } else {
                    focusableElement.removeAttribute('tabindex');
                }
            } else {
                focusableElement.setAttribute('tabindex', '-1');
            }
        }
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

window.addEventListener('keyup', function (e) {
    if ((e.keyCode === 27 || e.key === 'Escape') && donateCheckbox.checked) {
        checkboxChange(false);
    }
    if ((e.keyCode === 13 || e.key === 'Enter') && document.activeElement.nodeName === 'LABEL') {
        document.activeElement.click();
    }
});

donateCheckbox.addEventListener('change', function () {
    checkboxChange();
});

aside.addEventListener('click', function (e) {
    if (e.target === aside) {
        checkboxChange(false);
    }
});

// A supprimer

for (let emptyHref of document.querySelectorAll('a[href=""]')) {
    emptyHref.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Ce lien est temporairement indisponible');
    });
}