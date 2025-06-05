document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress bars animation
    initProgressBars();
    
    // Dark mode toggle
    initDarkMode();
    
    // Profile image upload
    initProfileImageUpload();
});

// Progress bars animation
function initProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(progress => {
                    const width = progress.getAttribute('data-width') || progress.style.width;
                    progress.style.width = '0';
                    setTimeout(() => {
                        progress.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.skills-container').forEach(container => {
        observer.observe(container);
    });
}

// Dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            // Update icon
            const icon = darkModeToggle.querySelector('i');
            icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }
}

// Profile image upload
function initProfileImageUpload() {
    const editImageBtn = document.querySelector('.edit-image-btn');
    const profileImage = document.getElementById('profile-image');

    if (editImageBtn && profileImage) {
        editImageBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        profileImage.src = event.target.result;
                        // Save to localStorage
                        localStorage.setItem('profileImage', event.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });

        // Load saved profile image
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            profileImage.src = savedImage;
        }
    }
}

// Print functionality
function printCV() {
    window.print();
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.software-item, .award-item, .interest-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 