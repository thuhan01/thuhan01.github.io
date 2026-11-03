(() => {
  if (window.__sakuraClickEffect) return;
  window.__sakuraClickEffect = true;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const random = (min, max) => min + Math.random() * (max - min);
  let activePetals = 0;

  document.addEventListener('click', (event) => {
    if (reducedMotion.matches || activePetals >= 90) return;

    const rect = event.target instanceof Element ? event.target.getBoundingClientRect() : null;
    const originX = event.detail === 0 && rect ? rect.left + rect.width / 2 : event.clientX;
    const originY = event.detail === 0 && rect ? rect.top + rect.height / 2 : event.clientY;
    const count = Math.min(window.innerWidth < 600 ? 9 : 13, 90 - activePetals);

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('span');
      petal.className = 'sakura-click-petal';
      petal.setAttribute('aria-hidden', 'true');
      petal.style.filter = `hue-rotate(${random(-12, 10).toFixed(0)}deg)`;
      petal.style.setProperty('--petal-width', `${random(8, 14).toFixed(1)}px`);
      petal.style.setProperty('--petal-height', `${random(11, 18).toFixed(1)}px`);
      document.body.appendChild(petal);
      activePetals++;

      const x = originX + random(-18, 18);
      const y = originY + random(-12, 10);
      const spread = random(-65, 65);
      const sway = random(12, 38) * (Math.random() < 0.5 ? -1 : 1);
      const fall = random(135, 240);
      const spin = random(240, 660) * (Math.random() < 0.5 ? -1 : 1);
      const delay = random(0, 170);
      const duration = random(1700, 2700);
      const base = `translate3d(${x}px, ${y}px, 0)`;
      const animation = petal.animate([
        { transform: `${base} rotate(0deg) scale(.45)`, opacity: 0, offset: 0 },
        { transform: `translate3d(${x + spread * .25}px, ${y - random(15, 38)}px, 0) rotate(${spin * .18}deg) scale(1)`, opacity: .95, offset: .14 },
        { transform: `translate3d(${x + spread * .6 + sway}px, ${y + fall * .35}px, 0) rotate(${spin * .55}deg) scale(.88)`, opacity: .9, offset: .56 },
        { transform: `translate3d(${x + spread - sway * .35}px, ${y + fall}px, 0) rotate(${spin}deg) scale(.65)`, opacity: 0, offset: 1 }
      ], { duration, delay, easing: 'cubic-bezier(.22,.42,.4,1)', fill: 'forwards' });

      const cleanup = () => {
        petal.remove();
        activePetals--;
      };
      animation.finished.then(cleanup, cleanup);
    }
  }, { passive: true });
})();
