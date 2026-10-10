import { captionValue } from "../../localization/captionValues.js";
const presetCaptionKeys = {
  "wedding": [
    {
      "id": "church",
      "captionKey": "moments.wedding.church"
    },
    {
      "id": "civil",
      "captionKey": "moments.wedding.civil"
    },
    {
      "id": "ceremony",
      "captionKey": "moments.wedding.ceremony"
    },
    {
      "id": "reception",
      "captionKey": "moments.wedding.reception"
    },
    {
      "id": "photos",
      "captionKey": "moments.wedding.photos"
    },
    {
      "id": "dinner",
      "captionKey": "moments.wedding.dinner"
    },
    {
      "id": "cake",
      "captionKey": "moments.wedding.cake"
    },
    {
      "id": "dance",
      "captionKey": "moments.wedding.dance"
    }
  ],
  "christening": [
    {
      "id": "baptism",
      "captionKey": "moments.christening.baptism"
    },
    {
      "id": "photos",
      "captionKey": "moments.christening.photos"
    },
    {
      "id": "reception",
      "captionKey": "moments.christening.reception"
    }
  ],
  "birthday": [
    {
      "id": "welcome",
      "captionKey": "moments.birthday.welcome"
    },
    {
      "id": "party",
      "captionKey": "moments.birthday.party"
    },
    {
      "id": "cake",
      "captionKey": "moments.birthday.cake"
    },
    {
      "id": "dance",
      "captionKey": "moments.birthday.dance"
    }
  ],
  "baby-kids": [
    {
      "id": "welcome",
      "captionKey": "moments.baby-kids.welcome"
    },
    {
      "id": "activity",
      "captionKey": "moments.baby-kids.activity"
    },
    {
      "id": "cake",
      "captionKey": "moments.baby-kids.cake"
    }
  ],
  "pre-wedding": [
    {
      "id": "welcome",
      "captionKey": "moments.pre-wedding.welcome"
    },
    {
      "id": "dinner",
      "captionKey": "moments.pre-wedding.dinner"
    },
    {
      "id": "party",
      "captionKey": "moments.pre-wedding.party"
    }
  ],
  "parties": [
    {
      "id": "welcome",
      "captionKey": "moments.parties.welcome"
    },
    {
      "id": "party",
      "captionKey": "moments.parties.party"
    },
    {
      "id": "dinner",
      "captionKey": "moments.parties.dinner"
    },
    {
      "id": "dance",
      "captionKey": "moments.parties.dance"
    }
  ],
  "gifts": [
    {
      "id": "surprise",
      "captionKey": "moments.gifts.surprise"
    },
    {
      "id": "gathering",
      "captionKey": "moments.gifts.gathering"
    }
  ],
  "corporate": [
    {
      "id": "welcome",
      "captionKey": "moments.corporate.welcome"
    },
    {
      "id": "presentation",
      "captionKey": "moments.corporate.presentation"
    },
    {
      "id": "dinner",
      "captionKey": "moments.corporate.dinner"
    },
    {
      "id": "networking",
      "captionKey": "moments.corporate.networking"
    }
  ]
};

export function getMomentPresets(category) { return (presetCaptionKeys[category] ?? presetCaptionKeys.parties).map(({ id, captionKey }) => [id, captionValue(captionKey, "en"), captionValue(captionKey, "ka")]); }

export function defaultMoments(category) {
  const list = getMomentPresets(category);
  const selected = category === "wedding" ? [list[2], list[3]] : [list[0]];
  return selected.map(([id, en, ka]) => ({ id, en, ka, time: "", unknownTime: false, venue: "", mapUrl: "" }));
}

export function normalizeMoments(value, category) {
  if (!Array.isArray(value)) return defaultMoments(category);
  return value.slice(0, 12).filter(item => item && typeof item.id === "string").map(item => ({
    id: item.id.slice(0, 80), en: String(item.en ?? "").slice(0, 100), ka: String(item.ka ?? "").slice(0, 100),
    time: /^([01]\d|2[0-3]):[0-5]\d$/.test(item.time) ? item.time : "",
    unknownTime: Boolean(item.unknownTime), venue: String(item.venue ?? "").slice(0, 160),
    mapUrl: /^https?:\/\//i.test(item.mapUrl) ? String(item.mapUrl).slice(0, 1000) : "",
  }));
}

export function momentMapUrl(moment, city = "") {
  if (/^https?:\/\//i.test(moment.mapUrl)) return moment.mapUrl;
  const query = [moment.venue, city].filter(Boolean).join(", ");
  return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : "";
}

// Unknown times follow the scheduled events; equal times retain their creation order.
export function sortMomentsByTime(moments) {
  const minutes = moment => !moment.unknownTime && /^([01]\d|2[0-3]):[0-5]\d$/.test(moment.time)
    ? Number(moment.time.slice(0, 2)) * 60 + Number(moment.time.slice(3)) : Infinity;
  return [...moments].sort((a, b) => {
    const first = minutes(a), second = minutes(b);
    return first === second ? 0 : first < second ? -1 : 1;
  });
}
