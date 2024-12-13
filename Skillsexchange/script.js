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

window.addEventListener('click', () => {
    const sections = document.querySelectorAll('[data-section="true"]');
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            section.style.transition = 'none';
        }
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
            const sections = document.querySelectorAll('[data-section="true"]');
            if (target) {
                sections.forEach(section => {
                    section.classList.remove('active');
                    section.style.transition = 'none';
                });
                target.classList.add('active');
                setTimeout(() => {
                    sections.forEach(section => {
                        section.style.transition = '';
                    });
                }, 50);
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

 //login
 function updateLoginButton() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const loginButton = document.querySelector('.login-button');

    if (isLoggedIn) {
        loginButton.textContent = 'Logout';
        loginButton.href = '#';
        loginButton.onclick = function() {
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        };
    } else {
        loginButton.textContent = 'Login';
        loginButton.href = 'login.html';
    }
}

// Call updateLoginButton on page load
window.onload = updateLoginButton;



document.addEventListener("DOMContentLoaded", function () {
    // Add click event listeners to buttons
    const scheduleButtons = document.querySelectorAll(".schedule-button");
    const chatButtons = document.querySelectorAll(".chat-button");
    const bookingModal = new bootstrap.Modal(document.getElementById("bookingModal"));
    const providerNameField = document.getElementById("providerName");

    scheduleButtons.forEach(button => {
        button.addEventListener("click", function () {
            const providerName = button.getAttribute("data-name");
            providerNameField.textContent = `Booking session with ${providerName}`;
            bookingModal.show();
        });
    });


    // Modal confirm button
    const confirmBookingButton = document.querySelector(".modal-footer .btn-primary");
    confirmBookingButton.addEventListener("click", function () {
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        if (date && time) {
            alert(`Booking confirmed for ${date} at ${time}`);
            bookingModal.hide();
        } else {
            alert("Please select both date and time!");
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const skillCheckboxes = document.querySelectorAll(".skill-checkbox");
    const providerCards = document.querySelectorAll(".col-md-4"); // Select all provider cards
    const noProvidersMessage = document.getElementById("no-providers-message"); // No providers message element

    // Function to filter providers
    function filterProviders() {
        const selectedCategories = Array.from(skillCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        let visibleCount = 0; // Track number of visible providers

        if (selectedCategories.length === 0) {
            // If no checkboxes are selected, show all providers
            providerCards.forEach(card => {
                card.style.display = "block";
                visibleCount++;
            });
        } else {
            // Show only providers matching selected categories
            providerCards.forEach(card => {
                const categoryElement = card.querySelector(".card-category");
                if (categoryElement) {
                    const providerCategory = categoryElement.textContent.split(":")[1].trim();
                    if (selectedCategories.includes(providerCategory)) {
                        card.style.display = "block"; // Show matching provider
                        visibleCount++;
                    } else {
                        card.style.display = "none"; // Hide non-matching provider
                    }
                }
            });
        }

        // Show or hide the "No Providers" message
        if (visibleCount === 0) {
            noProvidersMessage.style.display = "block";
        } else {
            noProvidersMessage.style.display = "none";
        }
    }

    // Add event listeners to all checkboxes
    skillCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterProviders);
    });

    // Initial state: Show all providers
    filterProviders();
});



document.addEventListener("DOMContentLoaded", function () {
    const chatButtons = document.querySelectorAll(".chat-button");
    const chatModal = new bootstrap.Modal(document.getElementById("chatModal"));
    const providerChatName = document.getElementById("providerChatName");
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const sendChatButton = document.getElementById("sendChatButton");

    let currentProvider = ""; // Keep track of the current provider

    // Event listener for chat buttons
    chatButtons.forEach(button => {
        button.addEventListener("click", function () {
            currentProvider = button.getAttribute("data-name"); // Get provider name
            providerChatName.textContent = currentProvider; // Update modal title
            chatMessages.innerHTML = ""; // Clear previous chat messages
            chatModal.show();
        });
    });

    // Send message functionality
    sendChatButton.addEventListener("click", function () {
        const message = chatInput.value.trim();
        if (message) {
            // Display the message in the chat log
            const userMessage = document.createElement("div");
            userMessage.textContent = `You: ${message}`;
            userMessage.style.marginBottom = "5px";
            chatMessages.appendChild(userMessage);

            // Simulate provider response
            setTimeout(() => {
                const providerMessage = document.createElement("div");
                providerMessage.textContent = `${currentProvider}: Thank you for reaching out!`;
                providerMessage.style.marginBottom = "5px";
                providerMessage.style.color = "blue";
                chatMessages.appendChild(providerMessage);

                // Scroll to the latest message
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);

            chatInput.value = ""; // Clear input field
        }
    });

    // Allow sending messages by pressing Enter
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendChatButton.click();
        }
    });
});