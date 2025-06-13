document.addEventListener('DOMContentLoaded', () => {
    // --- Dark/Light Mode Toggle Functionality ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved dark mode preference in localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        // Update the toggle icon to sun if dark mode is enabled
        if (darkModeToggle) { // Check if the button exists before trying to update its content
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        // Default to moon icon if no preference or disabled
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Add event listener to the toggle button
    if (darkModeToggle) { // Ensure the button exists before adding listener
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode'); // Toggle the 'dark-mode' class on the body

            // Save the current mode to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
            }
        });
    }

    // --- Active Navbar Item on Scroll Functionality ---
    // Select all sections that have an ID (these are your scroll targets)
    const sections = document.querySelectorAll('section[id]');
    // Select all navigation items in your new navbar
    const navItems = document.querySelectorAll('.main-navbar-new .nav-item-new');

    function updateActiveNavItem() {
        let currentActiveSection = ''; // Variable to store the ID of the currently visible section

        // Loop through each section to determine which one is currently in view
        sections.forEach(section => {
            // Get the top position of the section relative to the viewport
            // Subtracting 150px provides an offset, so the highlight changes a bit before the section fully hits the top
            const sectionTop = section.offsetTop - 150;
            // Get the height of the section
            const sectionHeight = section.clientHeight;

            // Check if the current scroll position is within the bounds of the section
            // window.scrollY is the vertical scroll position of the window
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentActiveSection = section.getAttribute('id'); // Get the ID of the active section
            }
        });

        // Loop through each navigation item
        navItems.forEach(item => {
            item.classList.remove('active'); // Remove 'active' class from all nav items first

            // Check if the nav item's href matches the ID of the current active section
            // item.href includes the full URL, so we use .includes() or .endsWith()
            if (item.href.includes(`#${currentActiveSection}`)) {
                item.classList.add('active'); // Add 'active' class to the matching nav item
            }
        });
    }

    // Add event listener for scroll events to update the active nav item
    window.addEventListener('scroll', updateActiveNavItem);

    // Call the function once on page load to set the initial active state
    updateActiveNavItem();
});