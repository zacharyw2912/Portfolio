// Loading Screen with Typing Effect
window.addEventListener('load', () => {
    const loaderText = document.getElementById('loader-text');
    const messages = ['Hello...', 'Welcome to my portfolio'];
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeMessage() {
        const currentMessage = messages[messageIndex];
        
        if (!isDeleting && charIndex <= currentMessage.length) {
            loaderText.textContent = currentMessage.slice(0, charIndex);
            charIndex++;
            setTimeout(typeMessage, typingSpeed);
        } else if (!isDeleting && charIndex > currentMessage.length) {
            // Wait before moving to next message or deleting
            if (messageIndex < messages.length - 1) {
                setTimeout(() => {
                    isDeleting = true;
                    typeMessage();
                }, 1500);
            } else {
                // Last message, wait then hide loader
                setTimeout(() => {
                    document.getElementById('loader').classList.add('hidden');
                }, 2000);
            }
        } else if (isDeleting && charIndex >= 0) {
            loaderText.textContent = currentMessage.slice(0, charIndex);
            charIndex--;
            setTimeout(typeMessage, 50);
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            messageIndex++;
            charIndex = 0;
            setTimeout(typeMessage, 500);
        }
    }

    // Start typing effect after a brief delay
    setTimeout(typeMessage, 500);
});

// Page Navigation
const pages = document.querySelectorAll('.page');
const menuButtons = document.querySelectorAll('.menu-btn');
const backArrow = document.getElementById('back-arrow');
let currentPage = 'main-menu';

// Menu button click handlers
menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetPage = button.getAttribute('data-page');
        showPage(targetPage);
    });
});

// Back arrow click handler
backArrow.addEventListener('click', () => {
    showPage('main-menu');
});

// Show page function
function showPage(pageId) {
    // Hide current page
    const currentPageElement = document.getElementById(currentPage);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Show target page
    const targetPageElement = document.getElementById(pageId);
    if (targetPageElement) {
        targetPageElement.classList.add('active');
        currentPage = pageId;
    }
    
    // Show/hide back arrow
    if (pageId === 'main-menu') {
        backArrow.classList.remove('visible');
    } else {
        backArrow.classList.add('visible');
    }
}

// Time update function for about page
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/London'
    });
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.innerHTML = `Current time in Northampton: ${timeString}`;
    }
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();

// Project hover effects
document.querySelectorAll('#project_links li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentPage !== 'main-menu') {
        showPage('main-menu');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Ensure main menu is visible on load
    showPage('main-menu');
});s