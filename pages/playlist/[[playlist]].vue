<script lang="ts" setup>
import { state, addTrackToPlaylist } from "~/stores/playlist";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { BulkResponse } from "~/types/getBulkTracks";

let bulkList = Array<string>();
const route = useRoute();

const { data: playlistData } = (await useFetch(
  "https://discovery-us-01.audius.openplayer.org/v1/playlists/" +
    route.params.playlist +
    "?app_name=GENESIS-TM"
)) as { data: any };
const { data: playlistTracksData }: { data: any } = await useFetch(
  "https://discovery-us-01.audius.openplayer.org/v1/resolve?url=" +
    playlistData.value?.data[0].permalink +
    "&app_name=GENESIS-TM"
);

const getPlaylistTrackData = async (trackId: string) => {
  // {{ edit_4 }}
  try {
    const response = await fetch(
      "https://audius-discovery-6.cultur3stake.com/v1/tracks/" +
        trackId +
        "?app_name=GENESIS-TM",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data.data; // {{ edit_5 }}
  } catch (error) {
    console.error(error);
  }
};

const addAllToPlaylist = async () => {
  //console.log("Loading Playlist...");
  for (
    let i = 0;
    i < playlistTracksData.value?.data[0].playlist_contents.length;
    i++
  ) {
    const trackId =
      playlistTracksData.value?.data[0].playlist_contents[i].track_id;
    addTrackToPlaylist(trackId);
    const trackData = await getPlaylistTrackData(trackId);
    // You can process trackData here if needed
  }
  console.log("Playlist Loaded!");
};

for (
  let i = 0;
  i < playlistTracksData.value?.data[0].playlist_contents.length;
  i++
) {
  bulkList.push(
    playlistTracksData.value?.data[0].playlist_contents[i].track_id
  );
  bulkList.push("&id=");
}
const { data: bulkTracksData } = await useFetch<BulkResponse>(
  "https://discovery-us-01.audius.openplayer.org/v1/tracks?id=" +
    "".concat(...bulkList) +
    "&app_name=GENESIS-TM"
);
</script>

<template>
  <div
    class="w-full h-72 bg-center relative bg-cover bg-no-repeat -z-10"
    :style="`background-image: url(/music-banner.jpg);`"
  >
    <img
      class="absolute h-28 w-28 lg:h-32 lg:w-32 rounded-full bottom-0 left-4 lg:left-10 translate-y-5 z-10 overflow-auto"
      :src="playlistTracksData.data[0].artwork['480x480']"
      alt="Cover Image"
    />
    <h1
      class="absolute bottom-12 left-36 lg:left-44 font-bold text-xl lg:text-3xl"
    >
      {{ playlistTracksData.data[0].playlist_name }}
    </h1>
    <h2
      class="absolute bottom-3 left-36 lg:left-44 text-md lg:text-xl glass p-1 rounded-lg"
    >
      {{ playlistTracksData.data[0].play_count }} Listenings -
      {{ playlistTracksData.data[0].favorite_count }}
      Likes
    </h2>
    <h3
      class="absolute bottom-64 lg:bottom-2 right-1 lg:right-2 text-sm lg:text-md bg-primary p-1 rounded-lg text-primary-content"
    >
      <Icon name="streamline:sign-hashtag-solid" />
      {{ playlistTracksData.data[0].id }}
    </h3>
  </div>
  <div class="card m-8">
    <button
      class="btn btn-primary mx-10 rounded-lg"
      @click="addAllToPlaylist()"
    >
      <Icon name="streamline:add-layer-2-solid" /> Play Next
    </button>

    <p v-for="(track, index) in bulkTracksData?.data" :key="index">
      <SongCard
        :key="track?.id"
        :trackParsedData="bulkTracksData?.data[index]"
      />
    </p>
  </div>
</template>
