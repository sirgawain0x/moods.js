export interface FavoriteTrack {
  favorite_item_id: string;
  favorite_type: string;
  user_id: string;
  created_at: string;
}

export interface GetFavoritesResponse {
  data: FavoriteTrack[];
}
