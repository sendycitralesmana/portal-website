export type SocialPlatform = "instagram" | "tiktok" | "youtube" | "twitter" | "facebook";

export interface SosialMedia {
  id: number;
  platform: SocialPlatform;
  embed_url: string;
}