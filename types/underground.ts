export interface UndergroundTrack {
  id: string;
  artwork?: {
    "150x150": string;
    "480x480": string;
    "1000x1000": string;
  };
  description?: string;
  genre?: string;
  track_cid?: string;
  preview_cid?: string;
  orig_file_cid?: string;
  orig_filename?: string;
  is_original_available?: boolean;
  mood?: string;
  release_date?: string;
  remix_of?: {
    tracks: [parent_track_id: string];
  };
  repost_count: number;
  favorite_count: number;
  title: string;
  user: {
    bio?: string;
    artist_pick_track_id?: string;
    cover_photo?: {
      "640x": string;
      "2000x": string;
    };
    twitter_handle?: string;
    instagram_handle?: string;
    tiktok_handle?: string;
    album_count: number;
    followee_count: number;
    follower_count: number;
    handle: string;
    id: string;
    is_verified: boolean;
    verified_with_twitter: boolean;
    verified_instagram: boolean;
    verified_tiktok: boolean;
    website?: string;
    donation?: string;
    location?: string;
    name: string;
    profile_picture?: {
      "150x150": string;
      "480x480": string;
      "1000x1000": string;
    };
    playlist_count: number;
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
  };
  duration: number;
  play_count: number;
  is_streamable: boolean;
  ddex_app: string;
  playlists_containing_track: number[];
}

export interface UndergroundResponse {
  data: UndergroundTrack[];
}
