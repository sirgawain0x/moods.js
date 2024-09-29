export interface IArtwork {
  "150x150": string;
  "480x480": string;
  "1000x1000": string;
}

export interface IUser {
  album_count: number;
  artist_pick_track_id: string;
  bio: string;
  cover_photo: {
    "640x": string;
    "2000x": string;
  };
  followee_count: number;
  follower_count: number;
  handle: string;
  id: string;
  is_verified: boolean;
  twitter_handle: string;
  instagram_handle: string;
  tiktok_handle: string | null;
  verified_with_twitter: boolean;
  verified_with_instagram: boolean;
  verified_with_tiktok: boolean;
  website: string | null;
  donation: string | null;
  location: string;
  name: string;
  playlist_count: number;
  profile_picture: {
    "150x150": string;
    "480x480": string;
    "1000x1000": string;
  };
  repost_count: number;
  track_count: number;
  is_deactivated: boolean;
  is_available: boolean;
  erc_wallet: string;
  spl_wallet: string;
  supporter_count: number;
  supporting_count: number;
  total_audio_balance: number;
  wallet: string;
}

export interface IRemixOf {
  tracks: string[] | null; // Assuming tracks can be an array of strings or null
}

export interface ITrack {
  artwork: IArtwork;
  description: string;
  genre: string;
  id: string;
  track_cid: string;
  preview_cid: string | null;
  orig_file_cid: string;
  orig_filename: string;
  is_original_available: boolean;
  mood: string | null;
  release_date: string;
  remix_of: IRemixOf;
  repost_count: number;
  favorite_count: number;
  tags: string | null;
  title: string;
  user: IUser;
  duration: number;
  is_downloadable: boolean;
  play_count: number;
  permalink: string;
  is_streamable: boolean;
  ddex_app: string | null;
  playlists_containing_track: number[];
}

export interface ITrackResponse {
  data: ITrack[];
}
