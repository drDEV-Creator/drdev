document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle for Mobile
    const hamburger = document.getElementById('nav-toggle-btn');
    const navLinks = document.getElementById('nav-links-list');
    const nav = document.getElementById('main-navigation');

    if (hamburger && navLinks) {
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
    }

    // Shrink header on scroll
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 40) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
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
            if (window.pageYOffset >= (sectionTop - 180)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            const href = li.getAttribute('href');
            if (href && href.includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // Copy Email to Clipboard with Toast Notification
    const contactBtn = document.getElementById('contact-btn');
    const toast = document.getElementById('toast');

    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            const email = 'drdeveloper123@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email Copied to Clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    function showToast(message) {
        if (toast) {
            toast.innerHTML = `${message} <i class="fas fa-check-circle" style="color:#10b981;"></i>`;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    // Handle "coming soon" links
    const comingSoonLinks = document.querySelectorAll('.coming-soon');
    comingSoonLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Access restricted. Updating soon...');
        });
    });

    // Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

    // Cursor Glow Tracking (Desktop only)
    const cursorGlow = document.getElementById('custom-cursor-glow');
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.opacity = '1';
        });
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // 3D Card Tilt Effect (Desktop only)
    const cards = document.querySelectorAll('.glass-card');
    if (cards.length > 0 && window.innerWidth > 768) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate rotation limits (-8deg to 8deg)
                const xRotation = -((y - rect.height / 2) / (rect.height / 16));
                const yRotation = (x - rect.width / 2) / (rect.width / 16);

                // Apply dynamic styles
                card.style.transform = `perspective(1000px) scale(1.015) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
                // Subtle glowing shadow matching card elements in light theme
                card.style.boxShadow = `0 20px 45px -10px rgba(79, 70, 229, 0.12), 0 0 1px rgba(79, 70, 229, 0.1)`;
            });

            card.addEventListener('mouseleave', () => {
                // Reset card styling
                card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
                card.style.boxShadow = '';
            });
        });
    }

    // Interactive Terminal Simulated Typing & Execution
    const consoleBody = document.getElementById('terminal-console-body');
    const typingSpan = document.getElementById('terminal-typing-span');

    if (consoleBody && typingSpan) {
        const linesToOutput = [
            { text: "npm run compile drdevx-lab", type: "input" },
            { text: "↳ Initializing build tasks...", type: "output", color: "#64748b" },
            { text: "[1/3] Compiling C# WPF Core Components... Done (340ms)", type: "output", color: "#34d399" },
            { text: "[2/3] Packaging MirraBrowser.exe assets... Done (680ms)", type: "output", color: "#34d399" },
            { text: "[3/3] Generating local Android mockups... Done (120ms)", type: "output", color: "#34d399" },
            { text: "↳ Resolving SQL reporting database schemas...", type: "output", color: "#64748b" },
            { text: "↳ Running automated unit diagnostics...", type: "output", color: "#64748b" },
            { text: "✔ 18 developer checks passed successfully.", type: "output", color: "#38bdf8" },
            { text: "Status: ALL SYSTEMS RUNNING OPTIMALLY (v1.2.0)", type: "output", color: "#fbbf24" }
        ];

        let lineIdx = 0;
        let charIdx = 0;

        function runTerminalSimulation() {
            // First step: simulate typing of command
            const commandObj = linesToOutput[0];
            typingSpan.textContent = '';
            
            function typeCommand() {
                if (charIdx < commandObj.text.length) {
                    typingSpan.textContent += commandObj.text.charAt(charIdx);
                    charIdx++;
                    setTimeout(typeCommand, 60);
                } else {
                    // Finished typing. Now append output lines one by one
                    setTimeout(outputNextLine, 500);
                }
            }

            function outputNextLine() {
                lineIdx++;
                if (lineIdx < linesToOutput.length) {
                    const line = linesToOutput[lineIdx];
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'terminal-line';
                    
                    const textSpan = document.createElement('span');
                    textSpan.textContent = line.text;
                    if (line.color) {
                        textSpan.style.color = line.color;
                    }
                    
                    lineDiv.appendChild(textSpan);
                    consoleBody.appendChild(lineDiv);
                    
                    // Auto-scroll terminal
                    consoleBody.scrollTop = consoleBody.scrollHeight;
                    
                    // Delay next line
                    const delay = line.text.startsWith('↳') ? 350 : 600;
                    setTimeout(outputNextLine, delay);
                } else {
                    // Entire simulation completed. Reset after 8 seconds and loop.
                    setTimeout(resetConsole, 8000);
                }
            }

            function resetConsole() {
                // Remove all generated lines, leaving only the first input line
                const lines = consoleBody.querySelectorAll('.terminal-line');
                for (let i = 1; i < lines.length; i++) {
                    lines[i].remove();
                }
                charIdx = 0;
                lineIdx = 0;
                typingSpan.textContent = '';
                setTimeout(typeCommand, 1000);
            }

            // Start typing initial command
            setTimeout(typeCommand, 800);
        }

        runTerminalSimulation();
    }

    // Star Burst Particle Animation (Clean Micro-interaction)
    function createStarBurst(x, y) {
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('star-burst');

            // Math layout for particle velocity vectors
            const angle = (Math.PI * 2 / particleCount) * i;
            const distance = 50 + Math.random() * 30; // 50-80px
            const tx = Math.cos(angle) * distance + 'px';
            const ty = Math.sin(angle) * distance + 'px';

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--tx', tx);
            particle.style.setProperty('--ty', ty);

            document.body.appendChild(particle);

            // Remove particle after animation complete
            setTimeout(() => particle.remove(), 600);
        }
    }

    // Attach click effect to interactive links and buttons
    const clickables = document.querySelectorAll('a, button, .btn');
    clickables.forEach(elem => {
        elem.addEventListener('click', (e) => {
            createStarBurst(e.clientX, e.clientY);

            // Smooth routing delay for cross-page navigation
            const href = elem.getAttribute('href');
            const target = elem.getAttribute('target');
            if (href && href !== '#' && !href.startsWith('#') && !elem.classList.contains('coming-soon')) {
                e.preventDefault();
                setTimeout(() => {
                    if (target === '_blank') {
                        window.open(href, '_blank');
                    } else {
                        window.location.href = href;
                    }
                }, 350);
            }
        });
    });
});
