export type SocialPlatform = "instagram" | "tiktok" | "youtube";

export interface SosialMedia {
  id: number;
  platform: SocialPlatform;
  embed_url: string;
}