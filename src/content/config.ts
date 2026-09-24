export const team = {
  productName: "Understudy",
  teamName: "Group 15",
  teamMembers: ["Brendan Giang", "Alex Tully", "Alexis Limary", "Oli Reyes"],
  figmaBoardLink: "[FIGMA BOARD LINK]",
  /** Path under /public, for example "/mind-map.png". Leave empty to show the drawn mind map. */
  mindMapImage: "",
};

export function isPlaceholder(value: string) {
  return value.startsWith("[") && value.endsWith("]");
}
