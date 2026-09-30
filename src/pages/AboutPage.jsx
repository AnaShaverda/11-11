import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <section className="inner-page copy-page">
      <h1>About 11:11</h1>
      <p>
        11:11 is a space for the moments, people, and celebrations you want to
        remember.
      </p>
      <Link className="text-link" to="/projects">
        Explore projects <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
