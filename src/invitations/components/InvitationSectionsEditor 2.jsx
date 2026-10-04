import { CanvasReplyTools } from './GuestCanvasControls.jsx';
import { useLanguage } from '../../localization/LanguageContext.jsx';

export default function InvitationSectionsEditor({ settings, onSettingsChange, noteSettings, dayPlan, planDraft, onAdd, onGo }) {
  const { t } = useLanguage();
  const names = { gallery: 'guestCards.gallery', details: 'guestCards.details', plan: 'guestCards.plan.title', rsvp: 'guestCards.rsvp.title', notes: 'guestCards.notes.title' };
  const ids = { gallery: 'guest-photos', details: 'guest-event-details', plan: 'guest-day-plan', rsvp: 'guest-rsvp', notes: 'guest-notes' };
  return <section className="invitation-sections-editor">
    <header><h2>{t('editor.sectionsTitle')}</h2><p>{t('editor.sectionsHint')}</p></header>
    {Object.entries(names).map(([key, title]) => {
      const added = key === 'notes' ? noteSettings.enabled : key === 'plan' ? dayPlan.length > 0 || planDraft : settings[key];
      return <div className="invitation-section-option" key={key}>
        <h3>{t(title)}</h3><p>{t(`guestCards.canvas.section.${key}`)}</p>
        {key === 'rsvp' && added && <CanvasReplyTools settings={settings} onChange={onSettingsChange} />}
        <button type="button" onClick={() => added ? onGo(ids[key]) : onAdd(key)}>{t(added ? 'editor.goSection' : 'editor.addSection')}</button>
      </div>;
    })}
  </section>;
}
