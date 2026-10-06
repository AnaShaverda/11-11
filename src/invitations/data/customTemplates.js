export const customCategories = ["wedding", "baby-kids", "christening"];

const themes = {
  all: { category: "Other", color: "#7b5874", pattern: "contours", title: "Your celebration" },
  wedding: { category: "Wedding", color: "#76554b", pattern: "contours", title: "Our wedding" },
  christening: { category: "Other", color: "#637e80", pattern: "grid", title: "Christening celebration" },
  birthday: { category: "Birthday", color: "#7b5874", pattern: "deco", title: "Birthday celebration" },
  "baby-kids": { category: "Other", color: "#637e80", pattern: "grid", title: "A little celebration" },
  "pre-wedding": { category: "Other", color: "#986579", pattern: "contours", title: "The celebration begins" },
  parties: { category: "Other", color: "#253c56", pattern: "deco", title: "Let's celebrate" },
  gifts: { category: "Other", color: "#7b5874", pattern: "grid", title: "A special surprise" },
  corporate: { category: "Other", color: "#46594c", pattern: "plain", title: "You're invited" },
};

export function getCustomTemplate(category) {
  if (category === "baby-kids") category = "christening";
  const theme = themes[category];
  if (!theme) return null;
  return {
    slug: `custom-${category}`, isCustom: true, category: theme.category, subcategory: category,
    previewArt: "custom", visual: "custom", design: { palette: ["#fffaf4", "#302b30", theme.color, "#d9bca5"], pattern: "paper" },
    visualAssets: {}, defaultDesign: { color: theme.color, pattern: theme.pattern }, defaultTitle: theme.title,
  };
}
