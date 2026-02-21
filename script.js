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

    // Navbar shrink on scroll (desktop only)
    if (window.innerWidth > 768) {
        if (window.scrollY > 100) {
            navIsland.classList.add('scrolled');
        } else {
            navIsland.classList.remove('scrolled');
        }
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
