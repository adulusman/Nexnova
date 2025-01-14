jQuery(document).ready(function ($) {
    // Back-to-top functionality
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // Sticky header
    $("#header").sticky({
        topSpacing: 0,
        zIndex: '50'
    });

    // Intro carousel
    $("#intro-carousel").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        animateOut: 'fadeOut',
        items: 1
    });

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

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('#header');
    const mobileNavToggle = document.querySelector('#mobile-nav-toggle');
    const navMenuContainer = document.querySelector('#nav-menu-container');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    let lastScroll = 0;

    // Scroll handler for header
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove header-scrolled class
        if (currentScroll > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    


    // Mobile navigation toggle
    mobileNavToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('mobile-nav-active');

        // Toggle icon (hamburger <-> close)
        const toggleIcon = mobileNavToggle.querySelector('i');
        toggleIcon.classList.toggle('fa-bars');
        toggleIcon.classList.toggle('fa-times');
        
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#nav-menu-container') && !e.target.closest('#mobile-nav-toggle')) {
            document.body.classList.remove('mobile-nav-active');

            // Reset icon to hamburger
            const toggleIcon = mobileNavToggle.querySelector('i');
            toggleIcon.classList.add('fa-bars');
            toggleIcon.classList.remove('fa-times');
        }
    });

    // Smooth scroll and active menu item handling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('menu-active'));

            // Add active class to clicked link
            link.parentElement.classList.add('menu-active');

            // Close mobile menu if open
            document.body.classList.remove('mobile-nav-active');

            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add intersection observer for active menu items
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.parentElement.classList.add('menu-active');
                    } else {
                        link.parentElement.classList.remove('menu-active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});
