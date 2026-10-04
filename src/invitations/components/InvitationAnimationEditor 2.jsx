import { useId } from 'react';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import { entranceStyles, motionStyles, openingEffects, openingSpeeds } from '../data/guestCardDesign.js';
import { Choices } from './GuestCanvasControls.jsx';

export default function InvitationAnimationEditor({ settings, onChange, tab, onTabChange }) {
  const { t } = useLanguage();
  const id = useId();
  const tabs = ['opening', 'celebration', 'motion'];
  const active = {
    opening: { values: entranceStyles, value: settings.entrance, key: 'entrance', labels: 'guestCards.entrance', help: 'editor.entrance' },
    celebration: { values: openingEffects, value: settings.openingEffect, key: 'openingEffect', labels: 'guestCards.opening', help: 'editor.effect' },
    motion: { values: motionStyles, value: settings.motion, key: 'motion', labels: 'guestCards.motion', help: 'editor.motion' },
  }[tab];
  return <section className="invitation-animation-editor" aria-labelledby={`${id}-title`}>
    <header><h2 id={`${id}-title`}>{t('editor.animationTitle')}</h2><p>{t('editor.animationHint')}</p></header>
    <div className="invitation-animation-tabs" role="tablist" aria-label={t('editor.animations')}>
      {tabs.map(value => <button key={value} type="button" role="tab" id={`${id}-${value}`} aria-controls={`${id}-panel`} aria-selected={tab === value} tabIndex={tab === value ? 0 : -1}
        onClick={() => onTabChange(value)} onKeyDown={event => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1) : tabs[(tabs.indexOf(value) + (event.key === 'ArrowRight' ? 1 : 2)) % tabs.length];
          onTabChange(next); document.getElementById(`${id}-${next}`)?.focus();
        }}>{t(`editor.${value}`)}</button>)}
    </div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${tab}`}>
      <p className="invitation-animation-explainer">{t(`editor.${tab}Hint`)}</p>
      <Choices label={t(`editor.${tab}`)} values={active.values} value={active.value} onChange={value => onChange({ [active.key]: value })}
        getLabel={value => t(`${active.labels}.${value}`)} getDescription={value => t(`${active.help}.${value}`)} visual />
      {tab === 'celebration' && settings.openingEffect !== 'none' && <details className="invitation-extra-wording"><summary>{t('editor.fineTune')}</summary>
        <Choices label={t('guestCards.opening.density')} values={['subtle', 'celebration']} value={settings.openingIntensity} onChange={openingIntensity => onChange({ openingIntensity })} getLabel={v => t(`guestCards.opening.${v}`)} />
        <Choices label={t('guestCards.opening.speed')} values={openingSpeeds} value={settings.openingSpeed} onChange={openingSpeed => onChange({ openingSpeed })} getLabel={v => t(`guestCards.opening.speed.${v}`)} />
        <Choices label={t('guestCards.opening.duration')} values={[3, 5, 8, 12]} value={settings.openingDuration} onChange={openingDuration => onChange({ openingDuration })} getLabel={count => t('guestCards.opening.seconds', { count })} />
        <Choices label={t('guestCards.opening.colors')} values={['theme', 'gold', 'pastel']} value={settings.openingPalette} onChange={openingPalette => onChange({ openingPalette })} getLabel={v => t(`guestCards.opening.palette.${v}`)} />
      </details>}
    </div>
  </section>;
}
