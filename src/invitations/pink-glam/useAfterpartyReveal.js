import { useEffect } from 'react';

export default function useAfterpartyReveal(root) {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = [...root.current.querySelectorAll('[data-afterparty-reveal]')];
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('ap-pending'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    function setup() {
      targets.forEach(target => {
        target.classList.remove('ap-pending');
        if (!media.matches && target.getBoundingClientRect().top > window.innerHeight) { target.classList.add('ap-pending'); observer.observe(target); }
      });
    }
    setup(); media.addEventListener('change', setup);
    return () => { observer.disconnect(); targets.forEach(target => target.classList.remove('ap-pending')); media.removeEventListener('change', setup); };
  }, [root]);
}
