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
        element.parentElement.classList.add('error-message');
    }
    
    function removeHighlight(element) {
        element.classList.remove('error');
        element.parentElement.classList.remove('error-message');
    }
    
    function showFormMessage(message, type) {
        const formMessage = document.createElement('div');
        formMessage.className = `form-message ${type}`;
        formMessage.textContent = message;
        
        const contactForm = document.getElementById('contact-form');
        contactForm.parentElement.appendChild(formMessage);
        
        // Remove the message after 5 seconds
        setTimeout(() => {
            formMessage.remove();
        }, 5000);
    }
    
    // Project filtering (if you add this feature later)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get the filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter the projects
                const projects = document.querySelectorAll('.project-card');
                projects.forEach(project => {
                    if (filterValue === 'all') {
                        project.style.display = 'block';
                    } else if (project.classList.contains(filterValue)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Animation on scroll (optional - you can add a library like AOS later if desired)
    // For now, we'll keep it simple with a basic implementation
    const animatedElements = document.querySelectorAll('.animate');
    
    function checkInView() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    }
    
    // Check elements on load
    checkInView();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkInView);
});
