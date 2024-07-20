const STATE = {
  playlist: [] as string[],
  playlistIndex: -1,
};

export const { state, getter, mutation, ...store } = createStore(
  "playlist",
  STATE
);

export const getPlaylist = getter("getPlaylist", (state) => {
  return state.playlist;
});

export const getPlaylistIndex = getter("getPlaylistIndex", (state) => {
  return state.playlistIndex;
});

export const addTrackToPlaylist = mutation<string>(
  "addTrackToPlaylist",
  (state, payload) => {
    state.playlist.push(payload);
  }
);

export const addPlaylistIndex = mutation<string>(
  "addPlaylistIndex",
  (state) => {
    state.playlistIndex += 1;
  }
);

export const setPlaylistIndex = mutation<number>(
  "setPlaylistIndex",
  (state, payload) => {
    state.playlistIndex = payload;
  }
);
