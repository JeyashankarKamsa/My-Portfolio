document.addEventListener('DOMContentLoaded', function() {
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            // Add button click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Typing animation for home section
    const nameElement = document.getElementById("name");
    const titleElement = document.getElementById("title");
    
    if (nameElement && titleElement) {
        const nameText = "Kamsa Jeyashankar";
        const titleText = "Software Student & Web Developer";

        let nameIndex = 0;
        let titleIndex = 0;

        function typeName() {
            if (nameIndex < nameText.length) {
                nameElement.innerHTML += nameText.charAt(nameIndex);
                nameIndex++;
                setTimeout(typeName, 100);
            } else {
                setTimeout(typeTitle, 500);
            }
        }

        function typeTitle() {
            if (titleIndex < titleText.length) {
                titleElement.innerHTML += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeTitle, 80);
            }
        }

        typeName();
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                document.querySelectorAll('nav a').forEach(link => {
                    link.style.color = '';
                });
                this.style.color = 'var(--secondary-color)';
            }
        });
    });
    
    // Form submission (prevent default for demo)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--secondary-color)';
            }
        });
    });
});