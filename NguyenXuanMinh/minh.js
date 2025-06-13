// Cuộn mượt đến các phần
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Thanh điều hướng cố định khi cuộn
window.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const spacer = document.querySelector('.navbar-spacer');
  const navbarTop = navbar.offsetTop; // Vị trí ban đầu của navbar

  function onScroll() {
    if (window.pageYOffset >= navbarTop) {
      // Khi cuộn xuống quá vị trí navbar ban đầu
      if (!navbar.classList.contains('fixed-navbar')) {
        navbar.classList.add('fixed-navbar');
        spacer.style.height = navbar.offsetHeight + 'px'; // Tạo khoảng trống để nội dung không bị nhảy
      }
    } else {
      // Khi cuộn lên trên vị trí navbar ban đầu
      if (navbar.classList.contains('fixed-navbar')) {
        navbar.classList.remove('fixed-navbar');
        spacer.style.height = '0'; // Loại bỏ khoảng trống
      }
    }
  }

  window.addEventListener('scroll', onScroll);
});

// Chức năng chuyển đổi chế độ sáng/tối
document.addEventListener('DOMContentLoaded', () => {
    const darkModeBtn = document.querySelector('.dark-mode-toggle');

    // Kiểm tra và áp dụng chế độ từ localStorage hoặc hệ thống
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');

    const applyTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Icon mặt trời
        } else {
            document.body.classList.remove('dark-mode');
            darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Icon mặt trăng
        }
    };

    // Áp dụng chủ đề khi tải trang
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkMode.matches)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    // Xử lý sự kiện click vào nút
    darkModeBtn.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        applyTheme(isDarkMode); // Cập nhật chủ đề và icon
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Lưu trạng thái
    });

    // Theo dõi thay đổi chế độ hệ thống (chỉ khi không có theme được lưu trong localStorage)
    prefersDarkMode.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Chỉ thay đổi nếu người dùng chưa tự đặt theme
            applyTheme(e.matches);
        }
    });
});