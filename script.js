// JavaScript for website

const tanContainer = document.querySelector('.tan-container');
const faqContainer = document.querySelector('.faq-container');
const registerContainer = document.querySelector('.register-container');
const navIsland = document.querySelector('.nav-island');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;

    // Navbar shrink on scroll (desktop only)
    if (window.innerWidth > 768) {
        if (window.scrollY > 100) {
            navIsland.classList.add('scrolled');
        } else {
            navIsland.classList.remove('scrolled');
        }
    }

    // Tan container expand
    const tanRect = tanContainer.getBoundingClientRect();
    if (tanRect.top <= windowHeight * 0.4) {
        tanContainer.classList.add('expanded');
    } else {
        tanContainer.classList.remove('expanded');
    }

    // FAQ container expand
    if (faqContainer) {
        const faqRect = faqContainer.getBoundingClientRect();
        if (faqRect.top <= windowHeight * 0.4) {
            faqContainer.classList.add('expanded');
        } else {
            faqContainer.classList.remove('expanded');
        }
    }

    // Register container expand
    if (registerContainer) {
        const registerRect = registerContainer.getBoundingClientRect();
        if (registerRect.top <= windowHeight * 0.4) {
            registerContainer.classList.add('expanded');
        } else {
            registerContainer.classList.remove('expanded');
        }
    }
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current FAQ
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});
