import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="inner-page copy-page">
      <h1>Page not found</h1>
      <p>That page isn’t here yet.</p>
      <Link className="text-link" to="/">
        Back to home <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
