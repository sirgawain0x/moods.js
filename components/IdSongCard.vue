<script lang="ts" setup>
import type { Track } from "~/types/getTrack";
</script>

<template>
  <div
    class="card card-side bg-base-300 border-2 border-primary-content mx-2 lg:mx-10 mt-2"
  >
    <figure>
      <img
        class="h-32 w-32 rounded-l-none"
        :src="trackParsedData?.artwork?.['480x480']"
        alt="Cover Image"
      />
    </figure>
    <div class="card-body">
      <NuxtLink :to="'/track/' + trackParsedData?.id">
        <h2 class="card-title">{{ trackParsedData.title }}</h2>
      </NuxtLink>
      <p>
        <NuxtLink :to="'/handle/' + trackParsedData?.user?.handle">
          <Icon name="ph:person-fill" />
          {{ trackParsedData.user.name }}
        </NuxtLink>
        <span class="font-black"> - </span>
        <Icon name="ph:disc-fill" />
        {{ trackParsedData.genre }}
        <span class="font-black"> - </span>
        <Icon name="ph:clock-fill" />
        {{
          new Date(trackParsedData.duration * 1000)
            .toISOString()
            .substring(14, 19)
        }}
        <span class="font-black"> - </span>
        <Icon name="ph:play-fill" />
        {{ trackParsedData.play_count }} Plays
      </p>
    </div>
    <figure class="mr-8">
      <PlayButton :key="trackParsedData.id" :trackId="trackParsedData.id" />
    </figure>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    id: String,
  },
  created() {
    this.fetchTracks(this.id as string);
  },
  data() {
    return {
      trackParsedData: {} as Track,
    };
  },

  methods: {
    async fetchTracks(trackId: string) {
      const { data: trackData } = await useFetch(
        "https://discovery-us-01.audius.openplayer.org/v1/tracks/" + trackId,
        {
          query: {
            app_name: "GENESIS-TM",
          },
        }
      );
      this.trackParsedData = (trackData.value as { data: any })?.data;
    },
  },
};
</script>
