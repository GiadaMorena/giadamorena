(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const options = {
    social: ['Dal piano editoriale al match-day.', 'Esplora Calcio Femminile Italia e Real Meda: identità, contenuti e comunicazione sul campo.', 'progetti.html', 'Guarda i progetti social'],
    photo: ['Dentro il momento.', 'Sport e shooting: una selezione di immagini da esplorare, senza ritagli.', 'fotografia.html', 'Entra nella galleria'],
    web: ['Un’identità che prende forma online.', 'Scopri i siti e i progetti digitali che ho realizzato.', 'siti-web.html', 'Esplora i siti web']
  };
  document.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-direction]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const result = document.querySelector('.discovery-result');
      const [title, description, url, label] = options[button.dataset.direction];
      result.replaceChildren();
      const heading = document.createElement('h3'); heading.textContent = title;
      const text = document.createElement('p'); text.textContent = description;
      const link = document.createElement('a'); link.href = url; link.textContent = `${label} ↗`;
      result.append(heading, text, link);
      if (!reduced.matches) result.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.22,1,.36,1)'});
    });
  });
  if (reduced.matches) return;
  const timing = {duration:1000,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'};
  document.querySelectorAll('#hero-title .stagger-word').forEach((word,index) => {
    word.animate([{opacity:0,transform:'translateY(45px)',clipPath:'inset(100% 0 0 0)'},{opacity:1,transform:'translateY(0)',clipPath:'inset(0 0 0 0)'}],{...timing,delay:120+index*160});
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.animate([{opacity:0,transform:'translateY(32px)'},{opacity:1,transform:'translateY(0)'}],timing);
      observer.unobserve(entry.target);
    });
  },{threshold:.12});
  document.querySelectorAll('.project-discovery,.work-card,.data-grid article,#esperienza .exp-card,main>section>h2').forEach(element=>observer.observe(element));
  const progress = document.createElement('div'); progress.className='reading-progress'; progress.setAttribute('aria-hidden','true'); document.body.append(progress);
  let queued = false;
  const update = () => {
    const distance = document.documentElement.scrollHeight-window.innerHeight;
    progress.style.transform=`scaleX(${distance>0?window.scrollY/distance:0})`;
    queued=false;
  };
  window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true}); update();
})();
