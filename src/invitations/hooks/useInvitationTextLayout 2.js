import { useLayoutEffect } from 'react';
import { fitFontSize, textSlotHeight, flowContentBottom } from '../data/cardContentLayout.js';

const copySelector = [
  '.wedding-ink-copy', '.wedding-day-poster', '.retro-bridal-copy', '.bridal-line-copy',
  '.christening-card-copy', '.pool-birthday-copy', '.line-birthday-copy', '.pizza-birthday-copy',
  '.comic-birthday-copy', '.reveal-poster-copy', '.cobalt-poster-copy', '.ribbon-poster-copy',
  '.full-image-cover-copy', '.pastel-image-cover-copy', '.y2k-image-cover-copy', '.retro-image-cover-copy',
  '.invitation-preview-copy', '.invitation-preview-foot', '.photo-invitation-paper', '.retro-poster',
  '.cocktail-birthday-copy', '.selected-bridal-copy',
].join(',');
const textSelector = 'span, strong, em, p, b, h1, h2, h3';

export default function useInvitationTextLayout(root, contentKey, changedTexts) {
  useLayoutEffect(() => {
    const artwork = root.current;
    if (!artwork) return;
    const copies = [...artwork.querySelectorAll(copySelector)]
      .filter(copy => copy.closest('.invitation-art') === artwork);
    const originalSizes = new Map();
    let frame;
    let disposed = false;
    const fieldsOf = copy => [...copy.querySelectorAll(textSelector)].filter(field => {
      const hidden = field.closest('[aria-hidden="true"]');
      if (!field.textContent.trim() || (hidden && hidden !== artwork && artwork.contains(hidden))) return false;
      const style = getComputedStyle(field);
      // An absolute text field has its own authored slot. Other text belongs to
      // the existing flow composition, rather than receiving new coordinates.
      const parentText = field.parentElement.closest(textSelector);
      return style.display !== 'none' && (!parentText || parentText === copy || !copy.contains(parentText));
    });
    const remember = field => {
      if (!originalSizes.has(field)) originalSizes.set(field, {
        value: field.style.getPropertyValue('font-size'), priority: field.style.getPropertyPriority('font-size'),
        lineHeight: field.style.getPropertyValue('line-height'), linePriority: field.style.getPropertyPriority('line-height'),
      });
      field.classList.add('card-text-fit');
    };
    const restore = () => {
      for (const [field, old] of originalSizes) {
        if (old.value) field.style.setProperty('font-size', old.value, old.priority);
        else field.style.removeProperty('font-size');
        if (old.lineHeight) field.style.setProperty('line-height', old.lineHeight, old.linePriority);
        else field.style.removeProperty('line-height');
      }
    };
    const altered = field => changedTexts.some(text => text.trim() && field.textContent.replace(/\s/g, '').includes(text.replace(/\s/g, '')));
    const targetOf = field => {
      if (changedTexts.some(text => field.textContent.replace(/\s/g, '') === text.replace(/\s/g, ''))) return field;
      // Fit the edited name inside a compound heading independently of its age
      // or occasion. Do not reduce sibling text just because a name is long.
      const leaves = [...field.querySelectorAll(textSelector)].filter(child => !child.querySelector(textSelector) && altered(child));
      return leaves.length === 1 ? leaves[0] : field;
    };
    const fontTargets = target => [target, ...target.querySelectorAll(textSelector)].map(element => {
      remember(element);
      const metrics = getComputedStyle(element);
      const size = parseFloat(metrics.fontSize);
      const lineRatio = Math.max(1.12, Math.min(1.8, (parseFloat(metrics.lineHeight) || size * 1.2) / size));
      return { element, size, lineRatio };
    });
    const setScale = (targets, scale) => targets.forEach(({element, size, lineRatio}) => {
      element.style.setProperty('font-size', `${size * scale}px`, 'important');
      element.style.setProperty('line-height', String(lineRatio), 'important');
    });
    function fit() {
      restore();
      if (!changedTexts.length) { copies.flatMap(fieldsOf).forEach(remember); return; }
      const artRect = artwork.getBoundingClientRect();
      if (!artRect.height || !artRect.width) return;
      const rect = element => {
        const r = element.getBoundingClientRect();
        return { top: (r.top - artRect.top) / artRect.height * artwork.clientHeight,
          bottom: (r.bottom - artRect.top) / artRect.height * artwork.clientHeight,
          left: (r.left - artRect.left) / artRect.width * artwork.clientWidth,
          right: (r.right - artRect.left) / artRect.width * artwork.clientWidth,
          height: r.height / artRect.height * artwork.clientHeight };
      };
      const ornaments = [...artwork.querySelectorAll('.birthday-illustration, .birthday-component-group, .cocktail-birthday-illustration, .pizza-chef-illustration, .pizza-slice-illustration, .ivory-vows-attire, .selected-bride-foreground, .day-calendar, .day-poster-timeline, .heart-calendar-day')]
        .filter(element => element.closest('.invitation-art') === artwork
          && !element.closest('.selected-bride-stage')
          && !element.closest('.photo-invitation-paper')
          && !/frame|border|background|paper|tiles|checker|stripe|pool|envelope|bow/.test(element.getAttribute('src') ?? element.dataset.componentId ?? ''))
        .map(rect);
      const ornamentBlockers = box => ornaments.filter(other =>
        Math.min(box.right, other.right) - Math.max(box.left, other.left) > (box.right - box.left) * .45);
      const bottomAnchor = (field, bounds = rect(field)) => {
        const value = field.computedStyleMap?.().get('bottom');
        return value ? String(value) !== 'auto'
          : /details|footer|foot|caption|note|closing/.test(field.className) && bounds.bottom > artwork.clientHeight * .7;
      };
      const allFields = copies.flatMap(fieldsOf);
      allFields.forEach(remember);
      for (const field of allFields.filter(altered)) {
        const metrics = getComputedStyle(field);
        const line = parseFloat(metrics.lineHeight);
        const size = parseFloat(metrics.fontSize);
        if (line < size * 1.08 && field.offsetHeight > line * 1.5) field.style.setProperty('line-height', '1.12', 'important');
      }
      const fixed = allFields.filter(field => getComputedStyle(field).position === 'absolute');
      // Fit bottom-anchored fields first: their longer content must not grow up
      // into the field above. All ornament sizes and positions stay authored.
      for (const field of [...fixed].sort((a, b) => Number(bottomAnchor(b)) - Number(bottomAnchor(a)) || rect(b).top - rect(a).top)) {
        if (!altered(field)) continue;
        const start = rect(field);
        const bottomAnchored = bottomAnchor(field, start);
        const others = fixed.filter(other => other !== field && !field.contains(other) && !other.contains(field));
        const anchors = others.map(rect);
        let height = textSlotHeight(start, [...anchors, ...ornamentBlockers(start)], artwork.clientHeight * .97);
        // An overflowing title must not make an unchanged footer shrink. Reserve
        // a normal line at the preceding anchor, then fit that title in its own slot.
        const precedingLines = others.filter(other => bottomAnchor(other) ? rect(other).bottom < start.bottom : rect(other).top < (bottomAnchored ? start.bottom : start.top)).map(other => {
          if (bottomAnchor(other) || !altered(other)) return rect(other).bottom + 3;
          const metrics = getComputedStyle(other);
          const rows = Math.max(other.querySelectorAll('br').length + 1, other.textContent.split('\n').length);
          const tilt = Math.max(0, rect(other).height - other.offsetHeight);
          return rect(other).top + rows * (parseFloat(metrics.lineHeight) || parseFloat(metrics.fontSize) * 1.2) + tilt + 3;
        });
        const minimumTop = bottomAnchored ? Math.max(0, ...precedingLines, ...ornamentBlockers(start).filter(other => other.bottom < start.bottom).map(other => other.bottom + 3)) : start.top;
        if (bottomAnchored) height = Math.max(1, start.bottom - minimumTop);
        const target = targetOf(field);
        remember(target);
        const controls = fontTargets(target);
        const base = controls[0].size;
        const fits = () => {
          const now = rect(field);
          return now.height <= height + 1 && now.top >= minimumTop - 1
            && (field.clientWidth === 0 || field.scrollWidth <= field.clientWidth + 1);
        };
        fitFontSize(base, size => { if (size !== base) setScale(controls, size / base); return fits(); });
      }
      for (const copy of copies) {
        const fields = fieldsOf(copy).filter(field => getComputedStyle(field).position !== 'absolute');
        if (!fields.length) continue;
        const copyRect = rect(copy);
        const flowRect = rect(fields[0]);
        const constrained = copy.classList.contains('selected-bride-label');
        const blockers = [...ornamentBlockers(flowRect), ...fixed.map(rect)];
        const visual = [...artwork.classList].find(name => name.startsWith('preview-') && !['preview-layout', 'preview-birthday'].some(prefix => name.startsWith(prefix)))?.slice(8);
        const bottom = constrained ? copyRect.bottom : flowRect.top + textSlotHeight(flowRect, blockers, flowContentBottom(visual, artwork.clientHeight));
        const fits = () => fields.every(field => rect(field).bottom <= bottom + 1
          && (field.clientWidth === 0 || field.scrollWidth <= field.clientWidth + 1))
          && (!constrained || copy.scrollHeight <= copy.clientHeight + 1);
        // Give flexible text all available room first. When it cannot fit, only
        // the changed field yields font size; other copy retains its original type.
        const changed = fields.filter(altered);
        const candidates = changed.sort((a, b) => rect(b).height - rect(a).height);
        const targets = candidates.map(field => {
          const target = targetOf(field);
          remember(target);
          const size = parseFloat(getComputedStyle(target).fontSize);
          return { field, target, controls: fontTargets(target), base: size, size, minimum: size * .08 };
        });
        for (let step = 0; !fits() && step < 350; step++) {
          // Balance several edited fields by their line count. One long field
          // remains the only candidate when the rest of the wording is unchanged.
          const choice = targets.filter(item => item.size > item.minimum)
            .sort((a, b) => rect(b.field).height / b.size - rect(a.field).height / a.size)[0];
          if (!choice) break;
          choice.size = Math.max(choice.minimum, choice.size * .97);
          setScale(choice.controls, choice.size / choice.base);
        }
      }
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); };
    const observer = new ResizeObserver(schedule);
    observer.observe(artwork);
    fit();
    document.fonts.ready.then(() => { if (!disposed) schedule(); });
    document.fonts.addEventListener('loadingdone', schedule);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.fonts.removeEventListener('loadingdone', schedule);
      restore();
      for (const field of originalSizes.keys()) field.classList.remove('card-text-fit');
    };
    // changedTexts is derived from the sample represented by contentKey.
  }, [root, contentKey]);
}
