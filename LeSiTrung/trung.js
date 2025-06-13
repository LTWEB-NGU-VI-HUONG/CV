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
// Khởi tạo dark mode khi trang web được load
document.addEventListener('DOMContentLoaded', () => {
    // Lấy nút dark mode đã có sẵn
    const darkModeBtn = document.querySelector('.dark-mode-toggle');
    
    // Kiểm tra theme từ hệ thống và localStorage
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');

    // Áp dụng dark mode nếu đã được lưu hoặc theo cài đặt hệ thống
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkMode.matches)) {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Xử lý khi click vào nút dark mode
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Cập nhật icon tương ứng
        darkModeBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Lưu theme vào localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Tạo hiệu ứng animation cho các card
        const cards = document.querySelectorAll('.member-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
            }, index * 50);
        });
    });

    // Cập nhật theme khi cài đặt hệ thống thay đổi
    prefersDarkMode.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
                darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.body.classList.remove('dark-mode');
                darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    });
}); 

