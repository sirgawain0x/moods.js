<template>
  <div>
    <!--div v-if="tracks.length > 0"-->
    <h1 class="text-center text-3xl lg:text-6xl font-black mt-8 mb-8">
      Search results for: {{ $route.query.query }}
    </h1>
    <div class="mx-2 lg:mx-10 flex justify-end">
      <button
        @click="openModal"
        class="self-end text-xl lg:text-2xl font-black mt-14 border-2 border-base-300 rounded-lg p-2"
      >
        Exit Search
      </button>
    </div>
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
          <SongCard
            v-for="track in tracks"
            :trackParsedData="track"
            v-bind:key="track.id"
          />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab"
          aria-label="Playlists"
        />
        <div role="tabpanel" class="tab-content" v-if="playlists.length != 0">
          <div v-for="playlist in playlists" v-bind:key="playlist.id">
            <PlaylistCard :trackParsedData="playlist" />
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab"
          aria-label="Albums"
        />
        <div role="tabpanel" class="tab-content" v-if="playlists.length != 0">
          <div v-for="playlist in albums" v-bind:key="playlist.id">
            <AlbumCard :trackParsedData="playlist" />
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
          <div v-for="user in users" v-bind:key="user.id">
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
import { ref } from "vue";

export default {
  data() {
    return {
      tracks: [],
      playlists: [],
      users: [],
    };
  },
  created() {
    this.fetchAll();
  },
  methods: {
    async fetchAll() {
      const { data } = await useFetch(
        `https://blockdaemon-audius-discovery-03.bdnodes.net/v1/full/search/full?query=${this.$route.query.query}&app_name=GENESIS-TM`
      );
      this.tracks = data.value.data.tracks;
      this.playlists = data.value.data.playlists;
      this.users = data.value.data.users;
      this.albums = data.value.data.albums;
    },
    openModal() {
      const modal = document.getElementById("menu_modal");
      if (modal) {
        modal.showModal();
      }
    },
  },
  watch: {
    "$route.query"() {
      this.fetchAll();
    },
  },
};
</script>
