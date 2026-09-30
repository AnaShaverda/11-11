const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export default function ProjectIcon({ name }) {
  let drawing;
  switch (name) {
    case "smile":
      drawing = (
        <>
          <circle cx="24" cy="24" r="16" />
          <path d="M18 28c3 4 9 4 12 0M18 20h.01M30 20h.01" />
        </>
      );
      break;
    case "cake":
      drawing = (
        <>
          <path d="M12 27h24v12H12zM12 31c3 2 5-2 8 0s5 2 8 0 5 2 8 0M18 21v6M24 21v6M30 21v6M18 17h.01M24 17h.01M30 17h.01" />
        </>
      );
      break;
    case "rings":
      drawing = (
        <>
          <circle cx="19" cy="27" r="10" />
          <circle cx="29" cy="27" r="10" />
          <path d="m24 15-3-4h6z" />
        </>
      );
      break;
    case "briefcase":
      drawing = (
        <>
          <rect x="9" y="17" width="30" height="22" rx="2" />
          <path d="M19 17v-5h10v5M9 26c9 5 21 5 30 0M22 27h4v5h-4z" />
        </>
      );
      break;
    case "heart":
      drawing = <path d="M24 39 10 25C2 17 14 7 24 18c10-11 22-1 14 7Z" />;
      break;
    case "notes":
      drawing = (
        <>
          <path d="M13 10h17l6 6v24H13zM30 10v7h6M18 24h13M18 30h13M18 36h9" />
        </>
      );
      break;
    case "photo":
      drawing = (
        <>
          <rect x="9" y="11" width="30" height="27" rx="2" />
          <circle cx="19" cy="20" r="3" />
          <path d="m12 34 10-10 6 6 4-4 7 8" />
        </>
      );
      break;
    default:
      drawing = (
        <>
          <path d="m24 6 3.2 11.2L39 20l-11.8 3.2L24 35l-3.2-11.8L9 20l11.8-2.8zM35 33l1.3 3.7L40 38l-3.7 1.3L35 43l-1.3-3.7L30 38l3.7-1.3z" />
        </>
      );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...common}>
      {drawing}
    </svg>
  );
}
