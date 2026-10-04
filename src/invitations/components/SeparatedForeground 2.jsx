import BirthdayIllustrations from "./BirthdayIllustrations.jsx";

// Match the original square artwork's contain fit inside its responsive layout box.
export default function SeparatedForeground({ assets, className, eager = false, style, aspectRatio = 1 }) {
  return <div className={`${className} separated-foreground`} style={style}>
    <div className="separated-foreground-canvas" style={aspectRatio !== 1 ? { width: `min(100cqw, ${100 * aspectRatio}cqh)`, height: `min(${100 / aspectRatio}cqw, 100cqh)` } : undefined}>
      <BirthdayIllustrations assets={assets} slot="component" eager={eager} />
    </div>
  </div>;
}
