/* ============================
   1. TỐI ƯU KHỞI TẠO TRANG
   ============================ */
document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    initSmoothScrolling();
    initStickyNavbar();
    initScrollSpy();
    initTimeGreeting();
});

/* ============================
   2. DARK MODE MỞ RỘNG
   ============================ */
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Áp dụng theme đã lưu
    const saved = localStorage.getItem('darkMode');
    if (saved === 'enabled') {
        body.classList.add('dark-mode');
        toggle.querySelector('i').className = 'fas fa-sun';
    } else {
        toggle.querySelector('i').className = 'fas fa-moon';
    }

    // Xử lý toggle
    toggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const enabled = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
        toggle.querySelector('i').className = enabled ? 'fas fa-sun' : 'fas fa-moon';
    });
}

/* ============================
   3. SMOOTH SCROLLING
   ============================ */
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.hash) {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                target?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ============================
   4. STICKY NAVBAR
   ============================ */
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    const trigger = document.querySelector('.banner')?.offsetHeight || 100;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('sticky', window.scrollY > trigger);
    });
}

/* ============================
   5. SCROLL SPY
   ============================ */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        sections.forEach(current => {
            const sectionTop = current.offsetTop - 100;
            const sectionHeight = current.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ============================
   6. TIME-BASED GREETING
   ============================ */
function initTimeGreeting() {
    const greetingEl = document.getElementById('greeting');
    if (!greetingEl) return;

    const hour = new Date().getHours();
    let message = 'Chào bạn!';

    if (hour < 12) message = 'Chúc bạn buổi sáng tốt lành!';
    else if (hour < 18) message = 'Chúc bạn buổi chiều vui vẻ!';
    else message = 'Chúc bạn buổi tối thư giãn!';

    greetingEl.textContent = message;
}
