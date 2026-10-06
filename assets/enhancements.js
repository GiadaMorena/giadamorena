(() => {
// Use vector arrows for static labels and dynamically inserted chat actions.
const arrowPaths = {'\u2197':'M7 17 17 7M7 7h10v10','\u2192':'M4 12h16m-6-6 6 6-6 6','arrow_forward':'M4 12h16m-6-6 6 6-6 6','arrow_outward':'M7 17 17 7M7 7h10v10','expand_more':'m6 9 6 6 6-6'};
function vectorArrow(path) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  for (const [key,value] of Object.entries({class:'arrow-icon',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'1.8','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true',focusable:'false'})) svg.setAttribute(key,value);
  const line = document.createElementNS(svg.namespaceURI,'path'); line.setAttribute('d',path); svg.append(line); return svg;
}
function replaceArrows(root) {
  if (root.nodeType !== 1 || root.closest('svg,script,style')) return;
  root.querySelectorAll('.material-symbols-outlined').forEach(icon => {
    const path = arrowPaths[icon.textContent.trim()];
    if (path) icon.replaceWith(vectorArrow(path));
  });
  const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes = []; while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (node.parentElement.closest('svg,script,style') || !/[\u2197\u2192]/.test(node.textContent)) return;
    const fragment = document.createDocumentFragment();
    node.textContent.split(/([\u2197\u2192])/).forEach(part => fragment.append(arrowPaths[part]?vectorArrow(arrowPaths[part]):document.createTextNode(part)));
    node.replaceWith(fragment);
  });
}
replaceArrows(document.body);
new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>replaceArrows(node.nodeType===1?node:node.parentElement)))).observe(document.body,{childList:true,subtree:true});
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
