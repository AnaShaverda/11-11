import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <section className="inner-page copy-page">
      <h1>Contact Us</h1>
      <p>We’re getting this space ready. Come back soon to get in touch.</p>
      <Link className="text-link" to="/">
        Back to home <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
