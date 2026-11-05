// Countdown to March 23, 2027
function updateCountdown() {
    const target = new Date('2027-03-23T12:00:00').getTime();
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

const navIsland = document.querySelector('.nav-island');
const expandBands = document.querySelectorAll('.band:not(.band-flat)');

function onScroll() {
    const windowHeight = window.innerHeight;

    // Navbar shrink on scroll
    if (window.scrollY > 100) {
        navIsland.classList.add('scrolled');
    } else {
        navIsland.classList.remove('scrolled');
    }

    // Section sheets expand to full width as they scroll into view
    // (the last one can't scroll that high, so it also expands at the page bottom)
    const atBottom = window.scrollY + windowHeight >= document.documentElement.scrollHeight - 2;
    expandBands.forEach(band => {
        const rect = band.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.4 || (atBottom && rect.top < windowHeight)) {
            band.classList.add('expanded');
        } else {
            band.classList.remove('expanded');
        }
    });
}

window.addEventListener('scroll', onScroll);
onScroll();

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

// Sponsor Package Buttons: prefill the sponsor message and jump to the form
document.querySelectorAll('.package-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const message = document.getElementById('sponsor-message');
        if (message) {
            message.value = `Hi! We're interested in the ${btn.dataset.package} package.`;
        }
        document.querySelector('.sponsor-contact').scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (message) message.focus({ preventScroll: true });
    });
});

// Past BrainJams: collapsed by default, opened by the button or the heading
const pastSection = document.getElementById('past');
if (pastSection) {
    const pastToggle = pastSection.querySelector('.past-toggle');
    const pastToggleText = pastSection.querySelector('.past-toggle-text');
    const pastContent = pastSection.querySelector('.past-content');
    const togglePast = () => {
        const isOpen = pastSection.classList.toggle('open');
        pastToggle.setAttribute('aria-expanded', isOpen);
        pastToggleText.textContent = isOpen ? 'Hide past BrainJams' : 'Show past BrainJams';

        // Animate from the current height to the target, then release the cap when open
        clearTimeout(pastTimer);
        pastContent.style.maxHeight = pastContent.scrollHeight + 'px';
        if (isOpen) {
            pastTimer = setTimeout(releasePast, 800);
        } else {
            pastContent.offsetHeight; // force layout so the collapse animates
            pastContent.style.maxHeight = '0px';
        }
    };
    let pastTimer;
    const releasePast = () => {
        if (pastSection.classList.contains('open')) {
            pastContent.style.maxHeight = 'none';
        }
    };
    pastContent.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'max-height') releasePast();
    });
    pastToggle.addEventListener('click', togglePast);
    pastSection.querySelector('.past-heading').addEventListener('click', togglePast);
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
