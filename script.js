/* ============================================================
   PORTFOLIO DATA
   ============================================================ */
const portfolioData = [
    // CINEMATIC (3 videos)
    { id: 5, title: "Urban Legends Documentary", category: "cinematic", icon: "fa-film", video_url: "https://fast.wistia.net/embed/iframe/ayrphdj8li", gradient: "linear-gradient(135deg, #281a0a, #3a2a1a, #27200d)" },
    { id: 6, title: "Wedding Cinematic Film", category: "cinematic", icon: "fa-heart", video_url: "https://fast.wistia.net/embed/iframe/uddb1vx2vc", gradient: "linear-gradient(135deg, #0a0a28, #1a1a3a, #0d0d27)" },
    { id: 7, title: "Midnight Drive — Short Film", category: "cinematic", icon: "fa-car", video_url: "", gradient: "linear-gradient(135deg, #280a1a, #3a1a2a, #270d1d)" },
    
    // COMMERCIAL ADS (4 videos)
    { id: 8, title: "TechFlow Product Launch", category: "commercial", icon: "fa-bullhorn", video_url: "https://fast.wistia.net/embed/iframe/6gtwr9zj5n", gradient: "linear-gradient(135deg, #1a280a, #2a3a1a, #1d270d)" },
    { id: 9, title: "Fashion Brand Campaign", category: "commercial", icon: "fa-gem", video_url: "https://fast.wistia.net/embed/iframe/yemctuf1rt", gradient: "linear-gradient(135deg, #0a1a28, #1a2a3a, #0d1d27)" },
    { id: 10, title: "Premium Watch Product Shoot", category: "commercial", icon: "fa-camera", video_url: "", gradient: "linear-gradient(135deg, #1d1d1d, #333333, #111111)" },
    { id: 11, title: "App Promo Ad", category: "commercial", icon: "fa-mobile-alt", video_url: "", gradient: "linear-gradient(135deg, #0f3d3e, #123437, #0b1f22)" },
    
    // REELS & TIKTOK (4 videos)
    { id: 12, title: "Fitness Transformation", category: "reels", icon: "fa-bolt", video_url: "", gradient: "linear-gradient(135deg, #1a0a28, #2a1a3a, #1d0d27)" },
    { id: 13, title: "Recipe Shorts Collection", category: "reels", icon: "fa-utensils", video_url: "", gradient: "linear-gradient(135deg, #280a0a, #3a1a1a, #271010)" },
    { id: 14, title: "Travel Transition Trend", category: "reels", icon: "fa-plane", video_url: "", gradient: "linear-gradient(135deg, #0a2818, #1a3a2a, #0d2718)" },
    { id: 15, title: "Educational Quick Tip", category: "reels", icon: "fa-lightbulb", video_url: "", gradient: "linear-gradient(135deg, #281a0a, #3a2a1a, #27200d)" },
    
    // GAMING (4 videos)
    { id: 1, title: "Epic Boss Fight Highlight", category: "gaming", icon: "fa-gamepad", video_url: "", gradient: "linear-gradient(135deg, #0a1628, #1a2a4a, #0d2137)" },
    { id: 2, title: "Funny Moments Montage", category: "gaming", icon: "fa-gamepad", video_url: "", gradient: "linear-gradient(135deg, #1a0a28, #2a1a3a, #1d0d27)" },
    { id: 3, title: "Pro Tournament Finals", category: "gaming", icon: "fa-gamepad", video_url: "", gradient: "linear-gradient(135deg, #280a0a, #3a1a1a, #271010)" },
    { id: 4, title: "Speedrun World Record", category: "gaming", icon: "fa-gamepad", video_url: "", gradient: "linear-gradient(135deg, #0a2818, #1a3a2a, #0d2718)" },
];

/* ============================================================
   WISTIA VIDEO SYNC (Auto-Pause)
   ============================================================ */
window._wq = window._wq || [];
_wq.push({
  id: "_all",
  onReady: function(video) {
    video.bind("play", function() {
      if (window.Wistia && window.Wistia.api) {
        var allVideos = window.Wistia.api.all();
        allVideos.forEach(function(v) {
          if (v.hashedId() !== video.hashedId()) {
            v.pause();
          }
        });
      }
    });
  }
});

/* ============================================================
   PARTICLE SYSTEM
   ============================================================ */
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.smokeParticles = [];
        this.resize();
        this.init();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Floating particles
        for (let i = 0; i < 60; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.1,
                pulse: Math.random() * Math.PI * 2,
            });
        }

        // Smoke/fog particles
        for (let i = 0; i < 8; i++) {
            this.smokeParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 200 + 100,
                speedX: (Math.random() - 0.5) * 0.15,
                speedY: (Math.random() - 0.5) * 0.1,
                opacity: Math.random() * 0.03 + 0.01,
                pulse: Math.random() * Math.PI * 2,
            });
        }
    }

    update() {
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.01;
            p.opacity = (Math.sin(p.pulse) * 0.15) + 0.2;

            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
        });

        this.smokeParticles.forEach(s => {
            s.x += s.speedX;
            s.y += s.speedY;
            s.pulse += 0.005;
            s.opacity = (Math.sin(s.pulse) * 0.015) + 0.02;

            if (s.x < -s.radius) s.x = this.canvas.width + s.radius;
            if (s.x > this.canvas.width + s.radius) s.x = -s.radius;
            if (s.y < -s.radius) s.y = this.canvas.height + s.radius;
            if (s.y > this.canvas.height + s.radius) s.y = -s.radius;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw smoke
        this.smokeParticles.forEach(s => {
            const gradient = this.ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
            gradient.addColorStop(0, `rgba(0, 224, 255, ${s.opacity})`);
            gradient.addColorStop(1, 'transparent');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw particles
        this.particles.forEach(p => {
            this.ctx.fillStyle = `rgba(0, 224, 255, ${p.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw connecting lines
        this.particles.forEach((p, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 120) {
                    this.ctx.strokeStyle = `rgba(0, 224, 255, ${(1 - dist / 120) * 0.08})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            });
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

/* ============================================================
   DOM CONTENT LOADED
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const canvas = document.getElementById('particle-canvas');
    const ps = new ParticleSystem(canvas);
    ps.animate();

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== MOBILE NAV TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ===== SCROLL ANIMATIONS (IntersectionObserver) =====
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el, target) {
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // ===== PORTFOLIO GRID =====
    const portfolioGrid = document.getElementById('portfolioGrid');

    function renderPortfolio(filter = 'all') {
        const filtered = filter === 'all'
            ? portfolioData
            : portfolioData.filter(item => item.category === filter);

        portfolioGrid.innerHTML = '';

        filtered.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'portfolio-item animate-on-scroll';
            el.dataset.delay = index * 80;
            el.dataset.category = item.category;
            // Make all videos 9:16 ratio as requested
            el.style.aspectRatio = '9/16';

            if (item.video_url) {
                el.innerHTML = `
                    <iframe src="${item.video_url}" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen width="100%" height="100%"></iframe>
                    <div class="portfolio-overlay" style="pointer-events: none;">
                        <span class="portfolio-category">${item.category}</span>
                        <h3 class="portfolio-title">${item.title}</h3>
                    </div>
                `;
            } else {
                el.innerHTML = `
                    <div class="portfolio-thumbnail">
                        <div class="thumb-bg" style="background: ${item.gradient}"></div>
                        <i class="fas ${item.icon} thumb-icon"></i>
                    </div>
                    <div class="portfolio-overlay">
                        <span class="portfolio-category">${item.category}</span>
                        <h3 class="portfolio-title">${item.title}</h3>
                    </div>
                    <div class="portfolio-play">
                        <i class="fas fa-play"></i>
                    </div>
                `;
                el.addEventListener('click', () => openModal(item));
            }

            portfolioGrid.appendChild(el);

            if (window.VanillaTilt) {
                VanillaTilt.init(el, {
                    max: 8,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.2
                });
            }

            // Trigger animation
            requestAnimationFrame(() => {
                observer.observe(el);
            });
        });
    }

    renderPortfolio();

    // ===== PORTFOLIO FILTERS =====
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPortfolio(btn.dataset.filter);
        });
    });

    // ===== VIDEO MODAL =====
    const modal = document.getElementById('videoModal');
    const modalClose = document.getElementById('modalClose');
    const modalProjectName = document.getElementById('modalProjectName');
    const modalIframe = document.getElementById('modalIframe');
    const modalVideoArea = document.getElementById('modalVideoArea');

    function openModal(item) {
        modalProjectName.textContent = item.title;
        
        if (item.video_url) {
            modalIframe.src = item.video_url;
            modalIframe.style.display = 'block';
            modalVideoArea.style.display = 'none';
        } else {
            modalIframe.src = '';
            modalIframe.style.display = 'none';
            modalVideoArea.style.display = 'flex';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalIframe.src = ''; // Stop video playback when closed
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ===== VIRAL CAROUSEL =====
    const carousels = document.querySelectorAll('.carousel-wrapper');
    
    carousels.forEach(wrapper => {
        const container = wrapper.querySelector('.carousel-container');
        const dotsContainer = wrapper.querySelector('.carousel-dots');
        
        if (container && dotsContainer) {
            const slides = container.querySelectorAll('.carousel-slide');
            
            // Create dots based on number of slides
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => {
                    const slideWidth = slides[0].offsetWidth + 16; // width + gap
                    container.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
                });
                dotsContainer.appendChild(dot);
            });

            // Update active dot on scroll
            container.addEventListener('scroll', () => {
                const slideWidth = slides[0].offsetWidth + 16;
                const scrollPos = container.scrollLeft;
                const activeIndex = Math.round(scrollPos / slideWidth);
                
                dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeIndex);
                });
            });
        }
    });

    // ===== BEFORE/AFTER COMPARISON SLIDER =====
    const compSlider = document.getElementById('comparisonSlider');
    const sliderHandle = document.getElementById('sliderHandle');
    const beforeEl = compSlider.querySelector('.comparison-before');
    let isDragging = false;

    function updateSlider(x) {
        const rect = compSlider.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;
        position = Math.max(5, Math.min(95, position));
        beforeEl.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
        sliderHandle.style.left = `${position}%`;
    }

    compSlider.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSlider(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            e.preventDefault();
            updateSlider(e.clientX);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support
    compSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSlider(e.touches[0].clientX);
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            updateSlider(e.touches[0].clientX);
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('btn-submit');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');

            setTimeout(() => {
                submitBtn.classList.remove('success');
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2500);
        }, 1500);
    });

    // ===== SMOOTH SCROLL for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
