<template>
  <div>
    <!--div v-if="tracks.length > 0"-->
    <h1 class="text-center text-3xl lg:text-6xl font-black mt-8 mb-8">
      Search results for: {{ $route.query.query }}
    </h1>
    <div class="mx-2 lg:mx-10">
      <div role="tablist" class="tabs lg:tabs-lg font-bold mt-4 w-full">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab"
          aria-label="Tracks"
          checked
        />
        <div
          role="tabpanel"
          class="tab-content"
          v-if="tracks.length != 0"
          tab-active
        >
          <div v-for="track in tracks" :key="track.id">
            <SongCard :trackParsedData="track" />
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab"
          aria-label="Playlists"
        />
        <div role="tabpanel" class="tab-content" v-if="playlists.length != 0">
          <div v-for="playlist in playlists" :key="playlist.id">
            <PlaylistCard :playlistParsedData="playlist" />
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab"
          aria-label="Albums"
        />
        <div role="tabpanel" class="tab-content" v-if="albums.length != 0">
          <div v-for="album in albums" :key="album.id">
            <AlbumCard :trackParsedData="album" />
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab"
          aria-label="Users"
        />

        <div role="tabpanel" class="tab-content" v-if="users.length != 0">
          <div v-for="user in users" :key="user.id">
            <UserCard :userParsedData="user" />
          </div>
        </div>
      </div>

      <!--p class="text-lg text-center mb-32">Icon Lib:
          <br>
          <Icon name="streamline:song-recommendation-solid" />
          <br>
          <Icon name="streamline:music-folder-song-solid" />
          <br>
          <Icon name="ph:playlist-bold" />
          <br>
      </p-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tracks: [],
      playlists: [],
      albums: [],
      users: [],
    };
  },
  created() {
    this.fetchAll();
  },
  methods: {
    async fetchAll() {
      const { data } = await useFetch(
        `https://audius-nodes.com/v1/full/search/full?query=${this.$route.query.query}&app_name=GENESIS-TM`
      );
      this.tracks = data?.value?.data?.tracks || []; // Ensure tracks are assigned correctly
      this.playlists = data?.value?.data?.playlists || [];
      this.users = data?.value?.data?.users || [];
      this.albums = data?.value?.data?.albums || [];
    },
  },
  watch: {
    "$route.query"() {
      this.fetchAll();
    },
  },
};
</script>
