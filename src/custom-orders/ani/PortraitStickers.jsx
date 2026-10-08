const stickers = {
  card: [
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-sleepover.jpg",
      label: "A childhood photo of Ani at a sleepover",
      className: "sticker--card-one",
    },
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-little-explorer.jpg",
      label: "A childhood photo of Ani sitting outside",
      className: "sticker--card-two",
    },
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-pink-sweater.jpg",
      label: "A childhood photo of Ani in a pink sweater",
      className: "sticker--card-three",
    },
  ],
  music: [
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-pink-camera.jpg",
      label: "A childhood photo of Ani holding a pink camera",
      className: "sticker--music-one",
    },
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-first-day.jpg",
      label: "A childhood photo of Ani walking outside",
      className: "sticker--music-two",
    },
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-pink-sweater.jpg",
      label: "A childhood photo of Ani in a pink sweater",
      className: "sticker--music-three",
    },
  ],
  cake: [
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-pink-sweater.jpg",
      label: "A childhood photo of Ani in a pink sweater",
      className: "sticker--music-one",
    },
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-sleepover.jpg",
      label: "A childhood photo of Ani at a sleepover",
      className: "sticker--music-two",
    },
  ],
  album: [
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-sleepover.jpg",
      label: "A childhood photo of Ani at a sleepover",
      className: "sticker--album-one",
    },
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-pink-camera.jpg",
      label: "A childhood photo of Ani holding a pink camera",
      className: "sticker--album-two",
    },
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-little-explorer.jpg",
      label: "A childhood photo of Ani sitting outside",
      className: "sticker--album-three",
    },
  ],
  surprise: [
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-first-day.jpg",
      label: "A childhood photo of Ani walking outside",
      className: "sticker--surprise-one",
    },
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-pink-sweater.jpg",
      label: "A childhood photo of Ani in a pink sweater",
      className: "sticker--surprise-two",
    },
    {
      image:
        "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/stickers/ani-pink-camera.jpg",
      label: "A childhood photo of Ani holding a pink camera",
      className: "sticker--surprise-three",
    },
  ],
};

export default function PortraitStickers({ page }) {
  return (
    <div
      className={`portrait-stickers portrait-stickers--${page}`}
      aria-label="Little photo stickers of Ani"
    >
      {stickers[page].map((sticker) => (
        <figure
          className={`portrait-sticker ${sticker.className}`}
          key={sticker.image}
        >
          <img src={sticker.image} alt={sticker.label} />
        </figure>
      ))}
    </div>
  );
}
