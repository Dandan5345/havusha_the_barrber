/* =============================================
   Havusha The Barber — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Loading Screen ----
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 500);
            }, 800);
        });
        // Fallback: remove loader after 3s
        setTimeout(() => {
            if (loader && !loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 500);
            }
        }, 3000);
    }

    // ---- Hamburger Menu ----
    const hamburger = document.getElementById('hamburgerBtn');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMenu() {
        hamburger?.classList.add('active');
        sideMenu?.classList.add('active');
        menuOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger?.classList.remove('active');
        sideMenu?.classList.remove('active');
        menuOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', () => {
        if (sideMenu?.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuOverlay?.addEventListener('click', closeMenu);

    // Close menu on nav link click
    document.querySelectorAll('.side-menu-nav a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            closeBookingModal();
        }
    });

    // ---- Theme Toggle (Dark / Light Mode) ----
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // 1. בדיקה אם המשתמש כבר בחר מצב בעבר (ברירת מחדל - בהיר)
    const savedTheme = localStorage.getItem('havusha_theme');
    if (savedTheme === 'light' || !savedTheme) {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // 2. לחיצה על כפתור ההחלפה
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');

            // בדיקה באיזה מצב אנחנו עכשיו ועדכון האייקון והזיכרון הדפדפן
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('havusha_theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon'); // משנה לירח כדי שיוכל לחזור לכהה
            } else {
                localStorage.setItem('havusha_theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun'); // משנה לשמש
            }
        });
    }


    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    if (navbar && !navbar.classList.contains('scrolled')) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ---- Booking Modal ----
    const bookingModal = document.getElementById('bookingModal');
    const closeModalBtn = document.getElementById('closeModal');

    window.openBookingModal = function () {
        bookingModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeBookingModal = function () {
        bookingModal?.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeModalBtn?.addEventListener('click', closeBookingModal);
    bookingModal?.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });

    // ---- Scroll Animations (Intersection Observer) ----
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-right, .fade-in-left');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    // ---- Shop Filter (for shop page) ----
    const filterButtons = document.querySelectorAll('.shop-filter');
    const shopGrid = document.getElementById('shopGrid');

    if (filterButtons.length > 0 && shopGrid) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(b => {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-outline');
                });
                btn.classList.remove('btn-outline');
                btn.classList.add('btn-primary');
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                const cards = shopGrid.querySelectorAll('.product-card');

                cards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = '';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ---- Contact Form ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value;
            const phone = document.getElementById('phone')?.value;
            const message = document.getElementById('message')?.value;

            // For now, open WhatsApp with the message
            const whatsappText = `שלום אריאל, שמי ${name}.\nטלפון: ${phone}\n${message}`;
            const whatsappUrl = `https://wa.me/972507660332?text=${encodeURIComponent(whatsappText)}`;

            window.open(whatsappUrl, '_blank');

            // Show success message
            contactForm.innerHTML = `
        <div style="text-align:center; padding:40px;">
          <i class="fas fa-check-circle" style="font-size:3rem; color:var(--primary); margin-bottom:20px;"></i>
          <h3 style="color:var(--primary); margin-bottom:10px;">ההודעה נשלחה!</h3>
          <p style="color:var(--text-muted);">תודה שפניתם אלינו. נחזור אליכם בהקדם.</p>
        </div>
      `;
        });
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                closeMenu();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ---- Add fadeInUp keyframe dynamically ----
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
