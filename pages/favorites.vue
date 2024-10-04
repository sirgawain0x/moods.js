<script lang="ts" setup>
import type { GetFavoritesResponse } from "~/types/getFavorites";
import type { BulkResponse } from "~/types/getBulkTracks";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { addTrackToPlaylist } from "~/stores/playlist";
const { $auth } = useNuxtApp();

const route = useRoute();
const user = ref(useCookie("user").value);
let bulkList = Array<string>();

const login = () => {
  $auth.login();
};

if (!user) {
  login();
}

const { data: favoritesData } = await useFetch<GetFavoritesResponse>(
  "https://discovery-us-01.audius.openplayer.org/v1/users/" +
    user?.value +
    "/favorites",
  {
    query: {
      app_name: "GENESIS-TM",
    },
  }
);

const addAllToPlaylist = () => {
  //console.log("Loading Playlist...");
  if (favoritesData?.value?.data) {
    favoritesData.value.data.forEach((item) => {
      if (item.favorite_item_id) {
        addTrackToPlaylist(item.favorite_item_id);
      }
    });
  }
  console.log("Playlist Loaded!");
};

if (favoritesData.value?.data) {
  for (const item of favoritesData.value.data) {
    if (item.favorite_type === "SaveType.track" && item.favorite_item_id) {
      bulkList.push(item.favorite_item_id);
      bulkList.push("&id=");
    }
  }
}
const { data: bulkTracksData } = await useFetch<BulkResponse>(
  "https://discovery-us-01.audius.openplayer.org/v1/tracks",
  {
    query: {
      id: bulkList,
      app_name: "GENESIS-TM",
    },
  }
);
</script>

<template>
  <div v-if="favoritesData">
    <h2 class="card-title mt-4 mx-12">
      My favorites
      <button
        class="btn btn-primary mx-10 rounded-lg"
        @click="addAllToPlaylist()"
      >
        <Icon name="streamline:add-layer-2-solid" /> Play All Next
      </button>
    </h2>

    <div class="mx-2 lg:mx-10" v-if="bulkTracksData">
      <p v-for="(track, index) in bulkTracksData.data" :key="index">
        <SongCard
          :key="track.id"
          :trackParsedData="bulkTracksData.data[index]"
        />
      </p>
    </div>
  </div>
</template>
