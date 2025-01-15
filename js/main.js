document.addEventListener('DOMContentLoaded', function () {
    // Back-to-top functionality
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            backToTop.style.display = 'block';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                backToTop.style.display = 'none';
            }, 300);
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize carousels
    // Intro carousel
    $("#intro-carousel").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        animateOut: 'fadeOut',
        items: 1
    });

    // Animation initialization
    new WOW().init();

    // Portfolio popup
    $('.portfolio-popup').magnificPopup({
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function (openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });

    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            900: { items: 3 }
        }
    });

    // Clients carousel
    $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: { items: 2 },
            768: { items: 4 },
            900: { items: 6 }
        }
    });
});

const mobileToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('#header');

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(14, 18, 36, 0.98)';
        // header.style.padding = '10px 0';
    } else {
        header.style.background = 'transparent';
        // header.style.padding = '15px 0';
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// Active link highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});