(() => {
// Keep menu accessibility synchronized with each page's existing toggle.
const menuButton = document.getElementById('mobile-menu-btn');
const menuPanel = document.getElementById('mobile-menu');
if (menuButton && menuPanel) {
  const synchronizeMenu = () => {
    const open = menuPanel.classList.contains('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
  };
  new MutationObserver(synchronizeMenu).observe(menuPanel, {attributes:true, attributeFilter:['class']});
  synchronizeMenu();
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuPanel.classList.contains('open')) {
      menuButton.click(); menuButton.focus();
    }
  });
  menuPanel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    if (menuPanel.classList.contains('open')) menuButton.click();
  }));
}
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const image = document.getElementById('lightbox-img');
  let closeButton = document.getElementById('lightbox-close');
  const accessibleClose = document.createElement('button');
  accessibleClose.id = closeButton.id;
  accessibleClose.className = closeButton.className;
  accessibleClose.textContent = '×';
  accessibleClose.setAttribute('aria-label', 'Chiudi anteprima');
  closeButton.replaceWith(accessibleClose);
  closeButton = accessibleClose;
  let trigger;
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    Array.from(document.body.children).filter(el => el !== lightbox).forEach(el => el.inert = false);
    trigger?.focus();
  };
  document.querySelectorAll('.image-container img').forEach(photo => {
    photo.classList.add('photo-trigger');
    photo.tabIndex = 0;
    photo.setAttribute('role','button');
    photo.setAttribute('aria-label', 'Ingrandisci: ' + photo.alt);
    const open = () => {
      trigger = photo;
      image.src = photo.src; image.alt = photo.alt;
      lightbox.classList.add('active');
      Array.from(document.body.children).filter(el => el !== lightbox).forEach(el => el.inert = true);
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    };
    photo.addEventListener('click', open);
    photo.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {event.preventDefault();open();}
    });
  });
  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => {if (event.target === lightbox) closeLightbox();});
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'Tab') {event.preventDefault();closeButton.focus();}
  });
}

})();
