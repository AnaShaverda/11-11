import iconsUrl from "../../assets/icons/ui-icons.svg";

export default function Icon({ name, size = 20, className = "" }) {
  return (
    <svg className={`ui-icon${className ? ` ${className}` : ""}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
      <use href={`${iconsUrl}#${name}`} />
    </svg>
  );
}
