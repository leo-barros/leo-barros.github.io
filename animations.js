// ============================================
// LENIS SMOOTH SCROLL
// ============================================
let lenis;

function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

// ============================================
// GSAP ANIMATIONS
// ============================================
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations - targeting current hero structure
    const heroTl = gsap.timeline({ delay: 0.5 });

    // Only animate if hero elements exist
    if (document.querySelector('.hero-badge')) {
        heroTl
            .from('.hero-badge', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
            .from('.hero-name', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.hero-tagline', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6')
            .from('.hero-actions', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .from('.hero-bottom', {
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            }, '-=0.3');
    }

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // About content
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%'
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // Timeline items (replaces old exp-card animation)
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        gsap.from('.timeline-item', {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    // Project category sections with stagger
    gsap.utils.toArray('.project-category').forEach(category => {
        const heading = category.querySelector('.category-heading');
        const cards = category.querySelectorAll('.elegant-card');
        const highlight = category.querySelector('.highlight-text');
        
        // Animate heading
        gsap.from(heading, {
            scrollTrigger: {
                trigger: category,
                start: 'top 80%'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Animate highlight underline on scroll
        if (highlight) {
            gsap.to(highlight, {
                scrollTrigger: {
                    trigger: category,
                    start: 'top 70%',
                    end: 'top 40%',
                    scrub: true
                },
                '--underline-width': '100%'
            });
        }
        
        // Stagger cards
        gsap.from(cards, {
            scrollTrigger: {
                trigger: category,
                start: 'top 75%'
            },
            y: 60,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });
    });

    // Timeline items animation
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        
        // Animate content card
        gsap.from(content, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
        
        // Animate dot glow on scroll
        ScrollTrigger.create({
            trigger: item,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => dot.classList.add('active'),
            onLeave: () => dot.classList.remove('active'),
            onEnterBack: () => dot.classList.add('active'),
            onLeaveBack: () => dot.classList.remove('active')
        });
    });

    // Timeline line grow animation
    gsap.from('.timeline-line', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true
        },
        scaleY: 0,
        transformOrigin: 'top center'
    });

    // Achievement category animations - use set+from for immediate visibility
    gsap.utils.toArray('.achievements-category').forEach(category => {
        const title = category.querySelector('.category-title');
        const cards = category.querySelectorAll('.achievement-card');
        
        // Animate category title with immediate check
        gsap.fromTo(title, 
            { x: -30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: category,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out'
            }
        );
        
        // Stagger achievement cards with immediate check
        gsap.fromTo(cards, 
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: category,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out'
            }
        );
    });

    // Trophy items animation
    const trophyItems = document.querySelectorAll('.trophy-item');
    if (trophyItems.length > 0) {
        gsap.from('.trophy-item', {
            scrollTrigger: {
                trigger: '.trophy-grid',
                start: 'top 85%'
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }

    // Learning cards animation
    const learningCards = document.querySelectorAll('.learning-card');
    if (learningCards.length > 0) {
        gsap.from('.learning-card', {
            scrollTrigger: {
                trigger: '.learning-timeline',
                start: 'top 85%'
            },
            y: 50,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out'
        });
    }

    // Contact section
    const contactContent = document.querySelector('.contact-content');
    if (contactContent) {
        gsap.from('.contact-content', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 80%'
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth cursor follow
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .exp-card, .achievement-card, .skill-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });
}

// ============================================
// INTERACTIVE HERO BACKGROUND
// ============================================
function initHeroBackground() {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    const auroraLayers = document.querySelectorAll('.aurora-layer');
    
    if (!hero || shapes.length === 0) return;
    
    // Define different movement sensitivity for each shape
    const shapeSensitivity = [0.03, 0.05, 0.04, 0.06, 0.02];
    const auroraSensitivity = [0.01, 0.015, 0.012];
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = new Array(shapes.length).fill(0);
    let currentY = new Array(shapes.length).fill(0);
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - rect.width / 2);
        mouseY = (e.clientY - rect.top - rect.height / 2);
    });
    
    hero.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
    });
    
    // Smooth animation loop
    function animate() {
        shapes.forEach((shape, index) => {
            const sensitivity = shapeSensitivity[index] || 0.04;
            const targetX = mouseX * sensitivity;
            const targetY = mouseY * sensitivity;
            
            // Smooth interpolation
            currentX[index] += (targetX - currentX[index]) * 0.08;
            currentY[index] += (targetY - currentY[index]) * 0.08;
            
            // Apply transform with existing rotation preserved
            const computedStyle = window.getComputedStyle(shape);
            const existingTransform = computedStyle.transform || 'none';
            
            if (existingTransform !== 'none') {
                shape.style.transform = `translate(${currentX[index]}px, ${currentY[index]}px)`;
            }
        });
        
        // Animate aurora layers with very subtle movement
        auroraLayers.forEach((layer, index) => {
            const sensitivity = auroraSensitivity[index] || 0.01;
            const x = mouseX * sensitivity;
            const y = mouseY * sensitivity;
            
            layer.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .nav-logo, .social-link');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// ============================================
// MAGNETIC HERO TITLE
// ============================================
function initHeroTitle() {
    const heroTitle = document.querySelector('.hero-title[data-magnetic]');
    if (!heroTitle) return;
    
    const letters = heroTitle.querySelectorAll('.letter');
    
    // Magnetic effect - letters subtly follow cursor
    heroTitle.addEventListener('mousemove', (e) => {
        const rect = heroTitle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        letters.forEach((letter, index) => {
            const letterRect = letter.getBoundingClientRect();
            const letterCenterX = letterRect.left + letterRect.width / 2;
            const letterCenterY = letterRect.top + letterRect.height / 2;
            
            // Distance from cursor to letter
            const distX = e.clientX - letterCenterX;
            const distY = e.clientY - letterCenterY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            // Stronger effect for closer letters
            const maxDist = 200;
            const strength = Math.max(0, 1 - distance / maxDist);
            
            gsap.to(letter, {
                x: distX * strength * 0.15,
                y: distY * strength * 0.1,
                rotateY: distX * strength * 0.05,
                rotateX: -distY * strength * 0.05,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
    
    // Reset on mouse leave
    heroTitle.addEventListener('mouseleave', () => {
        letters.forEach(letter => {
            gsap.to(letter, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
    
    // Click effect - scatter and return
    heroTitle.addEventListener('click', () => {
        letters.forEach((letter, index) => {
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = (Math.random() - 0.5) * 60;
            const randomRotate = (Math.random() - 0.5) * 30;
            
            gsap.timeline()
                .to(letter, {
                    x: randomX,
                    y: randomY,
                    rotation: randomRotate,
                    scale: 0.8,
                    duration: 0.3,
                    ease: 'power2.out'
                })
                .to(letter, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.4)',
                    delay: index * 0.02
                });
        });
    });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const menuBtn = document.getElementById('nav-menu-btn');
    const overlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-overlay-links a');
    let isOpen = false;

    if (!menuBtn || !overlay) return;

    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        menuBtn.classList.toggle('active', isOpen);
        overlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';

        if (isOpen) {
            gsap.fromTo(navLinks,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power3.out' }
            );
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            menuBtn.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// PROJECT FILTER
// ============================================
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.bento-card, .project-card');
    const featuredProject = document.querySelector('.featured-project');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Handle featured project visibility
            if (featuredProject) {
                const featuredCategory = featuredProject.dataset.category;
                const showFeatured = filter === 'all' || featuredCategory === filter;
                gsap.to(featuredProject, {
                    opacity: showFeatured ? 1 : 0.2,
                    scale: showFeatured ? 1 : 0.98,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }

            // Filter project cards
            projectCards.forEach(card => {
                const category = card.dataset.category;
                const show = filter === 'all' || category === filter;

                gsap.to(card, {
                    opacity: show ? 1 : 0.15,
                    scale: show ? 1 : 0.95,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });
    });
}

// ============================================
// 3D TILT EFFECT FOR PROJECT CARDS
// ============================================
function initProjectTilt() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const inner = card.querySelector('.project-card-inner');
        if (!inner) return;
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            gsap.to(inner, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(inner, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ============================================
// EXPANDABLE COURSE CARDS
// ============================================
function initCourseCards() {
    const courseCards = document.querySelectorAll('.course-card[data-expandable]');
    
    courseCards.forEach(card => {
        const header = card.querySelector('.course-header');
        
        header.addEventListener('click', () => {
            // Close other cards
            courseCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle this card
            card.classList.toggle('expanded');
        });
    });
}

// ============================================
// LOADER
// ============================================
function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Wait for fonts and scripts
    Promise.all([
        document.fonts.ready,
        new Promise(resolve => setTimeout(resolve, 100))
    ]).then(() => {
        hideLoader();
        initLenis();
        initAnimations();
        initCursor();
        initHeroBackground();
        initMagneticButtons();
        initHeroTitle();
        initNavigation();
        initProjectFilter();
        initProjectTilt();
        initCourseCards();
    });
});
