document.addEventListener('DOMContentLoaded', function () {
    // Back-to-top functionality
    const backToTop = document.querySelector('.back-to-top');
    const toggleBackToTop = () => {
        if (window.scrollY > 100) {
            backToTop.style.display = 'block';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                backToTop.style.display = 'none';
            }, 300);
        }
    };

    window.addEventListener('scroll', toggleBackToTop);

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize carousels using OwlCarousel
    const initOwlCarousel = (selector, options) => {
        if ($(selector).length) {
            $(selector).owlCarousel(options);
        }
    };

    initOwlCarousel("#intro-carousel", {
        autoplay: true,
        dots: false,
        loop: true,
        animateOut: 'fadeOut',
        items: 1,
    });

    initOwlCarousel(".testimonials-carousel", {
        autoplay: true,
        dots: true,
        loop: true,
        responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 3 } },
    });

    initOwlCarousel(".clients-carousel", {
        autoplay: true,
        dots: true,
        loop: true,
        responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 } },
    });

    // Portfolio popup with Magnific Popup
    if ($('.portfolio-popup').length) {
        $('.portfolio-popup').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: { enabled: true },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: (openerElement) => openerElement.is('img') ? openerElement : openerElement.find('img'),
            },
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('#header');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 100 ? 'rgba(14, 18, 36, 0.98)' : 'transparent';
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const highlightActiveLink = () => {
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
    };
    window.addEventListener('scroll', highlightActiveLink);

    // Accordion functionality
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            button.querySelector('i').classList.toggle('fa-chevron-up');
            content.classList.toggle('active');
        });
    });

    // Animated number counting
    const stats = document.querySelectorAll('.stat-number');
    const animateNumber = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.dataset.target;
                if (target) animateNumber(entry.target, parseInt(target));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.9 });

    stats.forEach(stat => observer.observe(stat));
});
