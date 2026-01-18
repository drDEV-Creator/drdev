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

    // Simple Scroll Animation (Shrink Header)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
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

    function showToast(message = 'Email Copied to Clipboard!') {
        toast.innerHTML = `${message} <i class="fas fa-info-circle"></i>`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Handle "coming soon" links
    const comingSoonLinks = document.querySelectorAll('.coming-soon');
    comingSoonLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Updating soon...');
        });
    });

    // Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

    // 3D Tilt Effect for Cards (Desktop only)
    const cards = document.querySelectorAll('.glass-card');

    if (window.innerWidth > 768) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate rotation based on cursor position
                const xRotation = -((y - rect.height / 2) / 20); // Rotate X axis
                const yRotation = (x - rect.width / 2) / 20;   // Rotate Y axis

                // Apply transform
                card.style.transform = `perspective(1000px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
                card.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(139, 92, 246, 0.2)`;
            });

            card.addEventListener('mouseleave', () => {
                // Reset position
                card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
                card.style.boxShadow = 'none';
            });
        });
    }

    // Star Burst Animation on 'View Project' Click
    function createStarBurst(x, y) {
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('star-burst');

            // Randomize direction
            const angle = (Math.PI * 2 / particleCount) * i;
            const distance = 60 + Math.random() * 40; // 60-100px
            const tx = Math.cos(angle) * distance + 'px';
            const ty = Math.sin(angle) * distance + 'px';

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--tx', tx);
            particle.style.setProperty('--ty', ty);

            document.body.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => particle.remove(), 600);
        }
    }

    // Attach to ALL clickable elements (a, button)
    const allClickables = document.querySelectorAll('a, button');
    allClickables.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Use click event coordinates for accurate position
            const x = e.clientX;
            const y = e.clientY;

            createStarBurst(x, y);

            // Check if it's a link that should navigate (not internal anchor)
            const href = btn.getAttribute('href');
            const target = btn.getAttribute('target');
            if (href && href !== '#' && !href.startsWith('#') && !btn.classList.contains('coming-soon')) {
                e.preventDefault();
                setTimeout(() => {
                    if (target === '_blank') {
                        window.open(href, '_blank');
                    } else {
                        window.location.href = href;
                    }
                }, 400);
            }
        });
    });
});
