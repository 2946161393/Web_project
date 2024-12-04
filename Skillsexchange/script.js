// hamburger
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navbar.classList.toggle('active');
        this.setAttribute('aria-expanded', 
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });
}

// click to close the menu
document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar') && !e.target.closest('.menu-toggle')) {
        navbar.classList.remove('active');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// dropdown
document.querySelectorAll('.dropdown > a').forEach((dropdownToggle) => {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (dropdown !== dropdownToggle.parentElement) {
                dropdown.classList.remove('active');
            }
        });
        
        const parent = dropdownToggle.parentElement;
        parent.classList.toggle('active');
    });
});

// outer
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        if (!this.parentElement.classList.contains('dropdown')) {  
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    });
});

// highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) { 
        navbar.classList.remove('active');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('[data-section="true"]');
    let currentSection = 0;
 
    function updateSections() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const newSection = Math.floor(scrollPosition / windowHeight);
        
        if (newSection !== currentSection && newSection < sections.length) {
            sections.forEach(section => section.classList.remove('active'));
            sections[newSection].classList.add('active');
            currentSection = newSection;
        }
    }
 
    // initalize first section as active
    sections[0].classList.add('active');
    
    
    window.addEventListener('scroll', updateSections);
 });