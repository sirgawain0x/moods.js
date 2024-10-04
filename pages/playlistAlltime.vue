<script setup lang="ts">
import type { PlaylistResponse } from "~/types/playlists";

const { data: playlistData } = await useFetch<PlaylistResponse>(
  "https://audius-discovery-1.altego.net/v1/playlists/trending",
  {
    query: {
      time: "allTime",
      app_name: "GENESIS-TM",
    },
  }
);
</script>

<template>
  <div class="mx-2 lg:mx-8">
    <div class="grid grid-cols-2">
      <h1 class="text-3xl lg:text-4xl font-black mt-14">Top Playlists</h1>
      <NuxtLink
        to="/"
        class="self-end text-xl lg:text-2xl font-black mt-14 text-end"
      >
        Return Home
      </NuxtLink>
    </div>
    <div
      class="grid grid-cols-4 lg:grid-cols-10 mt-4 gap-4"
      v-if="playlistData"
    >
      <div
        class="relative"
        v-for="playlist in playlistData.data"
        :key="playlist?.id"
      >
        <img
          :src="playlist?.artwork?.['480x480']"
          :alt="playlist?.playlist_name || 'Playlist Artwork'"
          class="h-24 w-24 lg:w-32 lg:h-32 rounded-lg"
        />
        <div class="absolute bottom-2 right-2">
          <PlaylistButton :playlistId="playlist?.id" />
        </div>
      </div>
    </div>
  </div>
</template>
