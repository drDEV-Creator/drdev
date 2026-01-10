document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.glass-nav');
    const logoContainer = document.querySelector('.logo-container');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile nav when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // Progressive Scroll Animation for Navbar
    const scrollThreshold = 200; // Distance to complete animation

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const progress = Math.min(scrollY / scrollThreshold, 1); // 0 to 1

        // Calculate logo movement distance (from left to right, but stay on screen)
        // Move from 0 to approximately 80% of viewport width
        const maxDistance = window.innerWidth * 0.80; // Logo moves to ~80% of screen width
        const currentDistance = progress * maxDistance;

        // Apply smooth transform
        logoContainer.style.transform = `translateX(${currentDistance}px)`;

        // Fade out nav links progressively
        navLinks.style.opacity = 1 - progress;
        if (progress > 0.5) {
            navLinks.style.visibility = 'hidden';
        } else {
            navLinks.style.visibility = 'visible';
        }

        // Fade navbar background
        const bgOpacity = 0.7 - (progress * 0.7); // From 0.7 to 0.0 (fully transparent)
        nav.style.background = `rgba(5, 5, 5, ${bgOpacity})`;
        nav.style.backdropFilter = `blur(${10 - (progress * 10)}px)`; // 10px to 0px
        nav.style.borderBottom = progress > 0.5 ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.1)';

        // Shrink logo slightly
        const logoHeight = 50 - (progress * 10); // 50px to 40px
        document.querySelector('.nav-logo').style.height = `${logoHeight}px`;
    });

    // Logo Click to Scroll Top
    logoContainer.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });


    // Copy Email to Clipboard
    const contactBtn = document.getElementById('contact-btn');
    const toast = document.getElementById('toast');

    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            // Note: We do NOT prevent default, allowing the mailto link to open system mail app
            const email = 'drdeveloper123@gmail.com';

            navigator.clipboard.writeText(email).then(() => {
                showToast();
            }).catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers or non-secure contexts if needed
            });
        });
    }

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
