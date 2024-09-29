export interface IProfilePicture {
  "150x150": string;
  "480x480": string;
  "1000x1000": string;
}

export interface ICoverPhoto {
  "640x": string;
  "2000x": string;
}

export interface IUserData {
  album_count: number;
  artist_pick_track_id: string;
  bio: string;
  cover_photo: ICoverPhoto;
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
  profile_picture: IProfilePicture;
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

export interface IUser {
  data: IUserData;
}
