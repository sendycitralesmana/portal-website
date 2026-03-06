import he from "he";

export function getFirstSentence(html: string): string {
  if (!html) return "";

  const rawText = html.replace(/<[^>]*>/g, " "); // buang semua tag
  const decoded = he.decode(rawText); // decode entity kayak &mdash;
  const cleaned = decoded.replace(/\s+/g, " ").trim(); // normalisasi spasi

  const sentence = cleaned.split(".")[0];
  return sentence ? sentence + "." : cleaned.slice(0, 200) + "...";
}
