// instant loading
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// theme stuff
function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
}

// navbar
function getNavbarContent() {
    const currentPath = window.location.pathname;
    const basePath = currentPath.includes('/papers/') ? '../' : '';
    const currentTheme = getTheme();
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    return `
        <nav>
            <a href="${basePath}index.html" id="nav-home">home</a>
            <a href="${basePath}papers.html" id="nav-papers">papers</a>
            <a href="https://github.com/getjared">github</a>
            <button class="theme-toggle" id="theme-toggle">${nextTheme}</button>
        </nav>
    `;
}

// footer
const footer = `
    <footer>
        <div class="divider"></div>
        <div class="footer-content">
            <a href="mailto:asaafox@gmail.com">email@jared</a>
            <span>crafted with catppuccin</span>
        </div>
    </footer>
`;

// toggle theme
function toggleTheme() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // set the new theme
    setTheme(newTheme);
    
    // update the button text to show the next theme
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.textContent = currentTheme;
    }
}

// inject everything and handle active states
function injectComponents() {
    // inject navbar with correct paths
    const navbarElement = document.getElementById('navbar');
    if (navbarElement) {
        navbarElement.innerHTML = getNavbarContent();
        // add click handler after injecting
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }
    
    // inject footer
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        footerElement.innerHTML = footer;
    }
    
    // set active nav item based on current page
    const currentPath = window.location.pathname;
    if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
        document.getElementById('nav-home')?.classList.add('active');
    } else if (currentPath.includes('papers')) {
        document.getElementById('nav-papers')?.classList.add('active');
    }
}

// start everything up
document.addEventListener('DOMContentLoaded', injectComponents);