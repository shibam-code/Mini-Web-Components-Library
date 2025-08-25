// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const copyButtons = document.querySelectorAll('.copy-btn');
const componentTabBtns = document.querySelectorAll('.component-tab-btn');
const componentDisplayItems = document.querySelectorAll('.component-display-item');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 90; // Account for fixed navbar + extra padding
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Tab switching functionality for code examples
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Tab switching for component explorer
componentTabBtns.forEach(button => {
    button.addEventListener('click', () => {
        const targetComponent = button.getAttribute('data-component');
        
        // Deactivate all component tabs and displays
        componentTabBtns.forEach(btn => btn.classList.remove('active'));
        componentDisplayItems.forEach(item => item.classList.remove('active'));
        
        // Activate the clicked tab and corresponding display
        button.classList.add('active');
        document.getElementById(`component-${targetComponent}`).classList.add('active');
    });
});

// Copy to clipboard functionality
const codeSnippets = {
    'button-html': `<button class="demo-btn primary">\n    <span>Primary</span>\n</button>\n<button class="demo-btn secondary">\n    <span>Secondary</span>\n</button>\n<button class="demo-btn outline">\n    <span>Outline</span>\n</button>`,
    
    'button-css': `.demo-btn {\n    padding: 12px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    font-size: 0.9rem;\n}\n\n.demo-btn.primary {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n}\n\n.demo-btn.secondary {\n    background: rgba(255, 255, 255, 0.1);\n    color: white;\n    border: 2px solid rgba(255, 255, 255, 0.2);\n}\n\n.demo-btn.outline {\n    background: transparent;\n    color: #667eea;\n    border: 2px solid #667eea;\n}\n\n.demo-btn:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);\n}`,
    
    'card-html': `<div class="demo-card">\n    <div class="card-image">\n        <!-- Your image here -->\n    </div>\n    <div class="card-content">\n        <h4>Card Title</h4>\n        <p>Card description.</p>\n    </div>\n</div>`,
    
    'card-css': `.demo-card {\n    width: 250px;\n    background: rgba(255, 255, 255, 0.05);\n    border-radius: 16px;\n    overflow: hidden;\n    transition: transform 0.3s ease;\n    backdrop-filter: blur(10px);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n.demo-card:hover {\n    transform: translateY(-8px);\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);\n}\n\n.card-image {\n    height: 150px;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}\n\n.card-content {\n    padding: 1.5rem;\n}`,
    
    'form-html': `<form class="demo-form">\n    <div class="form-group">\n        <input type="text" class="form-input" placeholder=" " required>\n        <label class="form-label">Full Name</label>\n    </div>\n    <div class="form-group">\n        <input type="email" class="form-input" placeholder=" " required>\n        <label class="form-label">Email Address</label>\n    </div>\n    <button type="submit" class="form-submit">\n        <span>Submit Form</span>\n    </button>\n</form>`,
    
    'form-css': `.form-group {\n    margin-bottom: 1rem;\n}\n\n.form-input {\n    width: 100%;\n    padding: 16px;\n    background: rgba(255, 255, 255, 0.05);\n    border: 2px solid rgba(255, 255, 255, 0.1);\n    border-radius: 12px;\n    color: white;\n    font-size: 16px;\n    transition: all 0.3s ease;\n}\n\n.form-input:focus {\n    outline: none;\n    border-color: #667eea;\n    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);\n}\n\n.form-submit {\n    width: 100%;\n    padding: 16px;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    border: none;\n    border-radius: 12px;\n    color: white;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 0.3s ease;\n}\n\n.form-submit:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);\n}`
};

copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const codeKey = button.getAttribute('data-copy');
        const codeText = codeSnippets[codeKey];
        
        if (codeText) {
            try {
                await navigator.clipboard.writeText(codeText);
                
                // Visual feedback
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = '#4ade80';
                button.style.borderColor = '#4ade80';
                button.style.color = 'white';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'rgba(102, 126, 234, 0.2)';
                    button.style.borderColor = '#667eea';
                    button.style.color = '#667eea';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                // Fallback for older browsers
                fallbackCopyTextToClipboard(codeText, button);
            }
        }
    });
});

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            // Visual feedback
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.background = '#4ade80';
            button.style.borderColor = '#4ade80';
            button.style.color = 'white';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'rgba(102, 126, 234, 0.2)';
                button.style.borderColor = '#667eea';
                button.style.color = '#667eea';
            }, 2000);
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(12, 12, 12, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(12, 12, 12, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Form submission handling
const demoForm = document.querySelector('.demo-form');
if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = demoForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        
        // Visual feedback
        submitBtn.textContent = 'Submitted!';
        submitBtn.style.background = '#4ade80';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            demoForm.reset();
        }, 2000);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.component-showcase, .doc-card, .code-block');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Particle effect for hero section (optional enhancement)
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', createParticles);

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button (optional)
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
`;

scrollTopBtn.addEventListener('click', scrollToTop);
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Add hover effect to scroll top button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-3px)';
    scrollTopBtn.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
});
