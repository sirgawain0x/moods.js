<script lang="ts" setup>
import type { UndergroundResponse } from "~/types/underground";

const itemsPerPage = 100; // Fetch all 100 results at once

const currentPage = ref(1);
const tracksPerPage = 100; // Number of tracks to display per page

const { data: undergroundData, refresh } = await useFetch<UndergroundResponse>(
  "https://discovery-us-01.audius.openplayer.org/v1/tracks/trending/underground",
  {
    query: {
      limit: itemsPerPage,
      offset: (currentPage.value - 1) * itemsPerPage,
      app_name: "GENESIS-TM",
    },
  }
);

const paginatedTracks = computed(() => {
  if (!undergroundData.value) return [];
  const start = (currentPage.value - 1) * tracksPerPage;
  const end = start + tracksPerPage;
  return undergroundData.value.data.slice(start, end);
});

const totalPages = computed(() => {
  if (!undergroundData.value) return 0;
  return Math.ceil(undergroundData.value.data.length / tracksPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="mx-2 lg:mx-8">
    <div class="grid grid-cols-2">
      <h1 class="text-3xl lg:text-4xl font-black mt-14">
        Trending Underground Tracks
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
      v-if="undergroundData"
    >
      <div class="relative" v-for="track in paginatedTracks" :key="track.id">
        <img
          :src="track?.artwork?.['480x480']"
          :alt="track?.title || 'Track Artwork'"
          class="h-24 w-24 lg:w-32 lg:h-32 rounded-lg"
        />
        <div class="absolute bottom-2 right-2">
          <PlayButton :trackId="track.id" />
        </div>
      </div>
    </div>
    <div class="mt-8 flex justify-between items-center">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>
