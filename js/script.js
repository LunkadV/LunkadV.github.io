// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Navigation menu toggle for mobile
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a nav link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Change header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 10);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to navigation items on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Animation on scroll
    const animationElements = [
        { selector: '.section-title', className: 'fade-in', offset: 100 },
        { selector: '.card', className: 'slide-up', offset: 150 },
        { selector: '.project-card', className: 'slide-up', offset: 150 },
        { selector: '.hero-content', className: 'slide-right', offset: 0 }
    ];
    
    function checkAnimation() {
        const windowHeight = window.innerHeight;
        const windowTop = window.pageYOffset;
        
        animationElements.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top + windowTop;
                
                if (windowTop + windowHeight - item.offset > elementTop) {
                    element.classList.add(item.className);
                }
            });
        });
    }
    
    // Check for animations on load
    window.addEventListener('load', () => {
        setTimeout(checkAnimation, 100);
    });
    
    // Check for animations on scroll
    window.addEventListener('scroll', checkAnimation);
    
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let valid = true;
            
            if (!name.value.trim()) {
                valid = false;
                highlightError(name);
            } else {
                removeHighlight(name);
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                valid = false;
                highlightError(email);
            } else {
                removeHighlight(email);
            }
            
            if (!message.value.trim()) {
                valid = false;
                highlightError(message);
            } else {
                removeHighlight(message);
            }
            
            if (valid) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                contactForm.reset();
                showFormMessage('Thank you! Your message has been sent.', 'success');
                
                // In a real implementation, you might use fetch to send data to a server
                // Example:
                /*
                fetch('your-form-handler-url', {
                    method: 'POST',
                    body: new FormData(contactForm)
                })
                .then(response => response.json())
                .then(data => {
                    contactForm.reset();
                    showFormMessage('Thank you! Your message has been sent.', 'success');
                })
                .catch(error => {
                    showFormMessage('Oops! Something went wrong.', 'error');
                });
                */
            }
        });
    }
    
    // Helper functions for form validation
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function highlightError(element) {
        element.classList.add('error');
        element.style.borderColor = '#e74c3c';
    }
    
    function removeHighlight(element) {
        element.classList.remove('error');
        element.style.borderColor = '';
    }
    
    function showFormMessage(message, type) {
        const formMessage = document.createElement('div');
        formMessage.className = `form-message ${type}`;
        formMessage.textContent = message;
        formMessage.style.padding = '10px';
        formMessage.style.marginTop = '15px';
        formMessage.style.borderRadius = '4px';
        
        if (type === 'success') {
            formMessage.style.backgroundColor = '#d4edda';
            formMessage.style.color = '#155724';
            formMessage.style.border = '1px solid #c3e6cb';
        } else {
            formMessage.style.backgroundColor = '#f8d7da';
            formMessage.style.color = '#721c24';
            formMessage.style.border = '1px solid #f5c6cb';
        }
        
        const contactForm = document.getElementById('contact-form');
        contactForm.parentElement.appendChild(formMessage);
        
        // Remove the message after 5 seconds
        setTimeout(() => {
            formMessage.remove();
        }, 5000);
    }
    
    // Dynamic year in footer copyright
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-text');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }
});
