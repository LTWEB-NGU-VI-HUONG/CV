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