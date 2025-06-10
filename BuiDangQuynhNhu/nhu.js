/* ============================
   1. KHỞI TẠO TRANG
   ============================ */
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo Dark Mode
    initDarkMode();

    // Xử lý smooth scrolling cho navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Xử lý navbar sticky
    const navbar = document.querySelector('.navbar');
    const bannerHeight = document.querySelector('.banner').offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > bannerHeight) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
});

/* ============================
   2. QUẢN LÝ DARK MODE
   ============================ */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Kiểm tra và áp dụng theme đã lưu
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    // Xử lý sự kiện click vào nút toggle
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        
        // Cập nhật icon
        const icon = darkModeToggle.querySelector('i');
        icon.className = body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Thiết lập icon ban đầu
    const icon = darkModeToggle.querySelector('i');
    icon.className = body.classList.contains('dark-mode') ? 'fas fa-moon' : 'fas fa-sun';
}

/* ============================
   3. CHỨC NĂNG IN CV
   ============================ */
// Xóa phần in CV

/* ============================
   4. HIỆU ỨNG TƯƠNG TÁC
   ============================ */
// Thêm hiệu ứng hover cho các phần tử
document.querySelectorAll('.software-item, .award-item, .interest-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 

/* ============================
   5. HÀM HỖ TRỢ SCROLL
   ============================ */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

