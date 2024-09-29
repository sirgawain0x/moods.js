<script setup lang="ts">
import type { TrendingResponse } from "~/types/trending";

const { data: trendingData } = await useFetch<TrendingResponse>(
  "https://discovery-us-01.audius.openplayer.org/v1/tracks/trending",
  {
    query: {
      time: "week",
      limit: 20,
      app_name: "GENESIS-TM",
    },
  }
);
</script>

<template>
  <div class="mx-2 lg:mx-8">
    <div class="grid grid-cols-2">
      <h1 class="text-3xl lg:text-4xl font-black mt-14">
        Weekly Trending Tracks
      </h1>
      <NuxtLink
        to="/"
        class="self-end text-xl lg:text-2xl font-black mt-14 text-end"
      >
        Return Home
      </NuxtLink>
    </div>
    <div
      class="grid grid-cols-4 lg:grid-cols-10 mt-4 gap-4"
      v-if="trendingData"
    >
      <div class="relative" v-for="track in trendingData.data" :key="track?.id">
        <img
          :src="track?.artwork?.['480x480']"
          :alt="track?.title || 'Track Artwork'"
          class="h-24 w-24 lg:w-32 lg:h-32 rounded-lg"
        />
        <div class="absolute bottom-2 right-2">
          <PlayButton :trackId="String(track?.id)" />
        </div>
      </div>
    </div>
  </div>
</template>
