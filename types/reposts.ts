export interface Artwork {
  "150x150": string;
  "480x480": string;
  "1000x1000": string;
}

export interface User {
  album_count: number;
  artist_pick_track_id: string;
  bio: string;
  cover_photo: {
    "640x": string;
    "2000x": string;
  };
  followee_count: number;
  follower_count: number;
  does_follow_current_user: boolean;
  handle: string;
  id: string;
  is_verified: boolean;
  location: string;
  name: string;
  playlist_count: number;
  profile_picture: Artwork;
  repost_count: number;
  track_count: number;
  is_deactivated: boolean;
  is_available: boolean;
  erc_wallet: string;
  spl_wallet: string;
  supporter_count: number;
  supporting_count: number;
  total_audio_balance: number;
}

export interface Track {
  artwork: Artwork;
  description: string | null;
  genre: string;
  id: string;
  track_cid: string;
  mood: string;
  release_date: string;
  remix_of: {
    tracks: any; // Adjust this type as necessary
  };
  repost_count: number;
  favorite_count: number;
  tags: any; // Adjust this type as necessary
  title: string;
  user: User;
  duration: number;
  downloadable: boolean;
  play_count: number;
  permalink: string;
  is_streamable: boolean;
}

export interface Repost {
  timestamp: string;
  item_type: string;
  item: Track;
}

export interface RepostResponse {
  data: Repost[];
}
