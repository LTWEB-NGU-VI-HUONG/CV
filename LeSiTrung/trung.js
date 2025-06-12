// script.js

// 1. Hiệu ứng gõ chữ cho banner
document.addEventListener('DOMContentLoaded', () => {
    const bannerTitle = document.querySelector('.banner h1');
    const bannerSubtitle = document.querySelector('.banner p');
    const originalTitleText = bannerTitle.textContent;
    const originalSubtitleText = bannerSubtitle.textContent;

    bannerTitle.textContent = ''; // Xóa nội dung ban đầu
    bannerSubtitle.textContent = ''; // Xóa nội dung ban đầu

    let i = 0;
    let j = 0;

    function typeWriterTitle() {
        if (i < originalTitleText.length) {
            bannerTitle.textContent += originalTitleText.charAt(i);
            i++;
            setTimeout(typeWriterTitle, 80); // Tốc độ gõ chữ
        } else {
            // Sau khi gõ xong tiêu đề, bắt đầu gõ phụ đề
            setTimeout(typeWriterSubtitle, 300);
        }
    }

    function typeWriterSubtitle() {
        if (j < originalSubtitleText.length) {
            bannerSubtitle.textContent += originalSubtitleText.charAt(j);
            j++;
            setTimeout(typeWriterSubtitle, 50); // Tốc độ gõ chữ
        }
    }

    typeWriterTitle(); // Bắt đầu hiệu ứng gõ chữ cho tiêu đề
});

// 2. Hiệu ứng cuộn mượt khi nhấp vào liên kết Navbar
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ 'a'

        const targetId = this.getAttribute('href').substring(1); // Lấy ID của phần cần cuộn đến
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('.navbar').offsetHeight, // Trừ đi chiều cao navbar để không bị che
                behavior: 'smooth' // Cuộn mượt
            });
        }
    });
});

// 3. Hiệu ứng xuất hiện khi cuộn (Fade-in on scroll)
const cards = document.querySelectorAll('.card');

const observerOptions = {
    root: null, // Dùng viewport làm root
    rootMargin: '0px',
    threshold: 0.1 // Khi 10% phần tử hiển thị trong viewport thì kích hoạt
};

const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in'); // Thêm class để kích hoạt CSS animation
            observer.unobserve(entry.target); // Ngừng quan sát sau khi đã xuất hiện
        }
    });
}, observerOptions);

cards.forEach(card => {
    cardObserver.observe(card); // Bắt đầu quan sát từng card
    card.classList.add('hidden-card'); // Thêm class ẩn ban đầu cho card
});