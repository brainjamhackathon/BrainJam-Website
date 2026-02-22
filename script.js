// Countdown to March 24, 2026
function updateCountdown() {
    const target = new Date('2026-03-24T12:00:00').getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
        const countdown = document.getElementById('countdown');
        countdown.innerHTML = '<span class="countdown-ended">Hacking Has Begun!</span>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// JavaScript for website

const faqContainer = document.querySelector('.faq-container');
const registerContainers = document.querySelectorAll('.register-container');
const navIsland = document.querySelector('.nav-island');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;

    // Navbar shrink on scroll
    if (window.scrollY > 100) {
        navIsland.classList.add('scrolled');
    } else {
        navIsland.classList.remove('scrolled');
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

    // Register containers expand
    registerContainers.forEach(container => {
        const rect = container.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.4) {
            container.classList.add('expanded');
        } else {
            container.classList.remove('expanded');
        }
    });
});

// Schedule Tabs
document.querySelectorAll('.schedule-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.schedule-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const day = tab.dataset.day;
        document.querySelectorAll('.schedule-day').forEach(d => {
            d.style.display = d.dataset.day === day ? 'block' : 'none';
        });
    });
});

// EmailJS Init
emailjs.init('FNep_lRL9csYPBlcq');

// Registration Form
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = registerForm.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Submitting...';
        btn.disabled = true;

        const data = {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value,
            discord: document.getElementById('reg-discord').value
        };

        fetch('https://script.google.com/macros/s/AKfycbzSj5oUn9jA8BlX8_-P8UJTyKTfjsny4mIXZ3ANgyQeSzJskNo4cimseAHTnLc6Sl5M/exec', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(() => {
            emailjs.send('service_x89rja6', 'template_9qd06qq', {
                user_name: data.name,
                user_email: data.email
            });
            const formHTML = registerForm.innerHTML;
            registerForm.innerHTML = '<p class="success-message">You\'re registered! Check your email for next steps.</p><button type="button" class="submit-btn success-back-btn">Register Another ✦</button>';

            registerForm.querySelector('.success-back-btn').addEventListener('click', () => {
                registerForm.innerHTML = formHTML;
                registerForm.querySelector('.submit-btn').disabled = false;
                registerForm.reset();
            });
        })
        .catch(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            alert('Something went wrong. Please try again.');
        });
    });
}

// Sponsor Form
const sponsorForm = document.getElementById('sponsor-form');
if (sponsorForm) {
    sponsorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = sponsorForm.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        fetch('https://script.google.com/macros/s/AKfycbyHo2whEa5OffWbdURG9ttdWdWDMbMPKWinuijKeyOLRZ7gWYiPx6A_Q3sw1Hqeqbit1Q/exec', {
            method: 'POST',
            body: JSON.stringify({
                company: document.getElementById('sponsor-company').value,
                email: document.getElementById('sponsor-email').value,
                message: document.getElementById('sponsor-message').value
            })
        })
        .then(() => {
            const formHTML = sponsorForm.innerHTML;
            sponsorForm.innerHTML = '<p class="success-message">Message sent! We\'ll get back to you soon.</p><button type="button" class="submit-btn success-back-btn">Send Another ✦</button>';

            sponsorForm.querySelector('.success-back-btn').addEventListener('click', () => {
                sponsorForm.innerHTML = formHTML;
                sponsorForm.querySelector('.submit-btn').disabled = false;
                sponsorForm.reset();
            });
        })
        .catch(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            alert('Something went wrong. Please try again.');
        });
    });
}

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
