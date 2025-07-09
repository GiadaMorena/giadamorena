document.addEventListener("DOMContentLoaded", function() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (!headerContainer || !footerContainer) {
        return;
    }

    const path = window.location.pathname;
    const isIndexPage = path.endsWith('/') || path.endsWith('index.html');

    const loadComponent = (url, container) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                container.innerHTML = data;
            })
            .catch(error => console.error(error));
    };

    const initializeMobileMenu = () => {
        const navToggle = document.querySelector('.mobile-nav-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const navClose = document.querySelector('.mobile-nav-close'); // Selettore per la X

        if (navToggle && mobileNav && navClose) {
            const toggleMenu = () => {
                const isOpened = document.body.classList.toggle('nav-open');
                navToggle.classList.toggle('is-active');
                mobileNav.setAttribute('aria-hidden', !isOpened);
            };

            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });

            mobileNav.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    toggleMenu();
                }
            });

            // Evento per il nuovo pulsante di chiusura "X"
            navClose.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });
        }
    };

    const handleSpecialLinks = () => {
        const contactLinks = document.querySelectorAll('a[href="#contact-placeholder"]');
        contactLinks.forEach(link => {
            if (isIndexPage) {
                link.setAttribute('href', '#contact');
            } else {
                link.setAttribute('href', 'index.html#contact');
            }
        });
    };
    
    Promise.all([
        loadComponent('header.html', headerContainer),
        loadComponent('footer.html', footerContainer)
    ]).then(() => {
        initializeMobileMenu();
        handleSpecialLinks();
    });
});