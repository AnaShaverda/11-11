export default function BirthdayIllustrations({ assets, slot, eager = false }) {
  const images = Array.isArray(assets) ? assets : assets ? [assets] : [];
  return images.map((src, index) => (
    <img
      key={`${src}-${index}`}
      className={`birthday-illustration birthday-illustration--${slot}-${index + 1}`}
      src={src}
      alt=""
      aria-hidden="true"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
    />
  ));
}
