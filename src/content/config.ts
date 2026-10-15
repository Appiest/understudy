export const team = {
  productName: "Understudy",
  teamName: "Group 15",
  teamMembers: ["Brendan Giang", "Alex Tully", "Alexis Limary", "Oli Reyes"],
  figmaBoardLink: "https://www.figma.com/board/nSRJwQ2VQ1z9BM8juEXOqw/Understudy?node-id=0-1&t=1s1tUIOx2SNjlW9W-1",
  marketSizingDocLink: "https://docs.google.com/document/d/1sDwveJ5WIxz0KXWXTrl9OJGyEndpivdER_G1vZ94kIk/edit?usp=drivesdk",
  /** Path under /public, for example "/mind-map.png". Leave empty to show the drawn mind map. */
  mindMapImage: "/mind-map.png",
};

export function isPlaceholder(value: string) {
  return value.startsWith("[") && value.endsWith("]");
}
