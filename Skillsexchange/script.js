// Dropdown Menu Toggle for Mobile
document.querySelectorAll('.dropdown > a').forEach((dropdownToggle) => {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (dropdown !== dropdownToggle.parentElement) {
                dropdown.classList.remove('active');
            }
        });
        
        const parent = dropdownToggle.parentElement;
        parent.classList.toggle('active'); // Add/remove 'active' class
    });
});


document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Smooth Scrolling for Anchor Links
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

// Highlight Active Section in Navbar
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50; // Adjust for sticky header
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