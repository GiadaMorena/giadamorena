// Funzione per l'effetto Spotlight che segue il mouse
const spotlight = document.querySelector('.spotlight');
if (spotlight) {
    window.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            spotlight.style.transform = `translate(${e.pageX - spotlight.offsetWidth / 2}px, ${e.pageY - spotlight.offsetHeight / 2}px)`;
        });
    });
}

// Funzione per l'animazione Fade-in delle sezioni allo scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 
});

sections.forEach(section => {
    if (section.id !== 'intro' && section.id !== 'gallery-intro' && section.id !== 'projects-intro') {
        observer.observe(section);
    } else {
        section.classList.add('visible');
    }
});

// Funzione per duplicare il contenuto del Marquee per un loop infinito
const marquee = document.querySelector('.marquee-inner');
if (marquee) {
    if (marquee.children.length === 5) {
        marquee.innerHTML += marquee.innerHTML;
    }
}

// Logica Galleria e Lightbox
const clickableItems = document.querySelectorAll('.photo-item, .mini-feed-item'); 
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

if (clickableItems.length > 0 && lightbox) {
    clickableItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if(lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// --- Logica Navigazione Mobile ---
const navToggle = document.querySelector('.mobile-nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (navToggle && mobileNav) {
    const toggleMenu = () => {
        const isOpened = document.body.classList.toggle('nav-open');
        navToggle.classList.toggle('is-active');
        mobileNav.setAttribute('aria-hidden', !isOpened);
    };

    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Chiude il menu se si clicca su un link
    mobileNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            toggleMenu();
        }
    });
}