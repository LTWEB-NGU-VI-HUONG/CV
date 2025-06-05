document.addEventListener('DOMContentLoaded', () => {
    // Lấy nút dark mode đã có sẵn
    const darkModeBtn = document.querySelector('.dark-mode-toggle');
    
    // Kiểm tra và áp dụng chế độ từ localStorage
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark' || (!storedTheme && prefersDarkMode.matches)) {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Xử lý sự kiện click vào nút
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Cập nhật icon
        darkModeBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Lưu trạng thái vào localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Thêm hiệu ứng chuyển đổi
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

    // Theo dõi thay đổi chế độ hệ thống
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