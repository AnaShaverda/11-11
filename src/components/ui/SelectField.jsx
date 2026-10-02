import Icon from "./Icon.jsx";

export default function SelectField({ id, label, hideLabel = false, className = "", children, ...props }) {
  return (
    <div className={`ui-select-field ${className}`}>
      {!hideLabel && <label htmlFor={id}>{label}</label>}
      <div className="ui-select-wrap">
        <select {...props} id={id} aria-label={hideLabel ? label : undefined}>{children}</select>
        <Icon name="chevron-down" size={18} className="ui-select-arrow" />
      </div>
    </div>
  );
}
