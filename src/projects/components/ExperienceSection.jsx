export default function ExperienceSection({ id, label, title, description, children, className = "" }) {
  return (
    <section id={id} className={`experience-section ${className}`}>
      <div className="experience-section-heading">
        <div>{label ? <span className="section-label">{label}</span> : null}<h2>{title}</h2>{description ? <p>{description}</p> : null}</div>
      </div>
      {children}
    </section>
  );
}
