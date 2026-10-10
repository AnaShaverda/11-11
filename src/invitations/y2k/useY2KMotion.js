import { useEffect } from 'react';

export default function useY2KMotion(root, theme, enabled) {
  useEffect(() => {
    const element = root.current;
    if (!element || !enabled || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('y2k-pending');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    const targets = [...element.querySelectorAll('[data-y2k-reveal]')];
    for (const target of targets) {
      if (target.getBoundingClientRect().top > window.innerHeight - 24) target.classList.add('y2k-pending');
      observer.observe(target);
    }
    return () => { observer.disconnect(); targets.forEach(target => target.classList.remove('y2k-pending')); };
  }, [root, theme, enabled]);
}
