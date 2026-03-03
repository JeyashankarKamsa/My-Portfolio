// EmailJS Initialization
(function() {
    emailjs.init({
      publicKey: "L1YmfTaobxJMTYnZc",
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
            this.style.transform = 'scale(0.9)';
            setTimeout(() => { this.style.transform = 'scale(1)'; }, 200);
        });
    }
    
    // 2. Typing animation
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

    // 3. EmailJS Submission Logic (உங்களுக்கும் + கஸ்டமருக்கும்)
    const contactForm = document.querySelector('.contact-form form');
    const serviceID = "service_ea3qma8";
    const adminTemplateID = "template_18vvrud"; // உங்களுக்கானது
    const thankYouTemplateID = "template_i553krv"; // கஸ்டமர்கானது

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = document.getElementById("sendBtn");
            btn.innerText = "Sending...";
            btn.disabled = true;

            const templateParams = {
                user_name: this.user_name.value,
                user_email: this.user_email.value,
                message: this.message.value
            };

            // முதல் மின்னஞ்சல்: உங்களுக்கு (Admin)
            emailjs.send(serviceID, adminTemplateID, templateParams)
                .then(() => {
                    // இரண்டாம் மின்னஞ்சல்: அனுப்பியவருக்கு (Thank You Mail)
                    return emailjs.send(serviceID, thankYouTemplateID, templateParams);
                })
                .then((response) => {
                    alert("Message sent! You and the sender will receive an email.");
                    contactForm.reset();
                    btn.innerText = "Send Message";
                    btn.disabled = false;
                })
                .catch((error) => {
                    alert("Failed to send! Please check your EmailJS dashboard.");
                    btn.innerText = "Send Message";
                    btn.disabled = false;
                    console.error("EmailJS Error:", error);
                });
        });
    }

    // 4. Smooth scrolling for navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 5. Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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