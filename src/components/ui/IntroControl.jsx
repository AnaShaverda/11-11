import { Link } from "react-router-dom";

export default function IntroControl() {
  return (
    <Link
      className="intro-control"
      to="/projects"
      aria-label="Explore projects — Make it count++"
    >
      <span>Make it count++</span>
      <span className="intro-control-arrow" aria-hidden="true">
        ›
      </span>
    </Link>
  );
}
