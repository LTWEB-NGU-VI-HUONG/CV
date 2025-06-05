// Khởi tạo các chức năng khi trang web được tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo hiệu ứng cho các thanh tiến trình
    initProgressBars();
    
    // Khởi tạo chức năng chuyển đổi chế độ tối/sáng
    initDarkMode();
});

// Hàm khởi tạo hiệu ứng cho các thanh tiến trình
function initProgressBars() {
    // Tạo observer để theo dõi khi các thanh tiến trình xuất hiện trong viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Lấy tất cả các thanh tiến trình trong phần tử đang được quan sát
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(progress => {
                    // Lấy giá trị chiều rộng từ thuộc tính data hoặc style
                    const width = progress.getAttribute('data-width') || progress.style.width;
                    // Đặt chiều rộng về 0 trước khi bắt đầu hiệu ứng
                    progress.style.width = '0';
                    // Tạo hiệu ứng tăng dần chiều rộng
                    setTimeout(() => {
                        progress.style.width = width;
                    }, 100);
                });
                // Ngừng theo dõi sau khi đã xử lý
                observer.unobserve(entry.target);
            }
        });
    });

    // Bắt đầu theo dõi các container chứa thanh tiến trình
    document.querySelectorAll('.skills-container').forEach(container => {
        observer.observe(container);
    });
}

// Hàm khởi tạo chức năng chuyển đổi chế độ tối/sáng
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Xử lý sự kiện click vào nút chuyển đổi
        darkModeToggle.addEventListener('click', () => {
            // Thêm hoặc xóa class dark-mode
            document.body.classList.toggle('dark-mode');
            // Lưu trạng thái chế độ tối vào localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            // Cập nhật biểu tượng mặt trời/mặt trăng
            const icon = darkModeToggle.querySelector('i');
            icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        });

        // Kiểm tra và áp dụng chế độ tối đã lưu
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }
}

// Hàm in CV
function printCV() {
    window.print();
}

// Xử lý cuộn mượt cho các liên kết điều hướng
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Cuộn đến phần tử đích một cách mượt mà
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Thêm hiệu ứng hover cho các phần tử tương tác
document.querySelectorAll('.software-item, .award-item, .interest-item').forEach(item => {
    // Hiệu ứng khi di chuột vào
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    // Hiệu ứng khi di chuột ra
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 