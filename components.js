// instant theme application before anything loads
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

// navbar with proper paths
function getNavbarContent() {
    const currentPath = window.location.pathname;
    const basePath = currentPath.includes('/papers/') ? '../' : '';
    const nextTheme = getTheme() === 'light' ? 'dark' : 'light';

    return `
        <nav>
            <a href="${basePath}index.html" id="nav-home">home</a>
            <a href="${basePath}papers.html" id="nav-papers">papers</a>
            <a href="${basePath}github.html" id="nav-github">github</a>
            <button class="theme-toggle" id="theme-toggle">${nextTheme}</button>
        </nav>
    `;
}

// footer with icons
const footer = `
    <footer>
        <div class="divider"></div>
        <div class="footer-content">
            <div class="footer-links">
                <a href="mailto:asaafox@gmail.com" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
                <span class="footer-separator">|</span>
                <a href="https://github.com/getjared" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
            </div>
            <span>crafted with catppuccin</span>
        </div>
    </footer>
`;

// toggle theme function
function toggleTheme() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.textContent = currentTheme;
    }
}

// inject everything and handle active states
function injectComponents() {
    const navbarElement = document.getElementById('navbar');
    if (navbarElement) {
        navbarElement.innerHTML = getNavbarContent();
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }
    
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        footerElement.innerHTML = footer;
    }
    
    const currentPath = window.location.pathname;
    if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
        document.getElementById('nav-home')?.classList.add('active');
    } else if (currentPath.includes('papers')) {
        document.getElementById('nav-papers')?.classList.add('active');
    } else if (currentPath.includes('github')) {
        document.getElementById('nav-github')?.classList.add('active');
    }
}

// start everything up
document.addEventListener('DOMContentLoaded', injectComponents);
