import type { Track } from "./getTrack";

export interface Repost {
  timestamp: string;
  item_type: string;
  item: Track;
}

export interface RepostResponse {
  data: Repost[];
}
