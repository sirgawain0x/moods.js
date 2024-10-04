<script lang="ts" setup>
import { useRoute } from "vue-router";
import type { RepostResponse } from "@/types/reposts";
import type { BulkResponse } from "@/types/getBulkTracks";
import type { IUser } from "@/types/getUser";
import type { ITrackResponse } from "~/types/getArtistData";

const route = useRoute();

const { data: requestData } = await useFetch<IUser>(
  "https://discovery-us-01.audius.openplayer.org/v1/users/handle/" +
    route.params.handle,
  {
    query: {
      app_name: "GENESIS-TM",
    },
  }
);
const { data: artistData } = await useFetch<ITrackResponse>(
  "https://discoveryprovider2.audius.co/v1/users/" +
    requestData?.value?.data.id +
    "/tracks",
  {
    query: {
      limit: 100,
      sort: "plays",
      app_name: "GENESIS-TM",
    },
  }
);
const { data: pinnedData } = await useFetch<BulkResponse>(
  "https://discoveryprovider2.audius.co/v1/tracks/" +
    requestData?.value?.data.artist_pick_track_id,
  {
    query: {
      app_name: "GENESIS-TM",
    },
  }
);
const { data: repostData } = await useFetch<RepostResponse>(
  "https://discoveryprovider2.audius.co/v1/users/" +
    requestData?.value?.data.id +
    "/reposts",
  {
    query: {
      limit: 100,
      app_name: "GENESIS-TM",
    },
  }
);
</script>

<template>
  <div
    v-if="requestData?.data"
    class="w-full h-72 bg-center relative bg-cover bg-no-repeat"
    :style="`background-image: url(${requestData.data.cover_photo['2000x']});`"
  >
    <img
      class="absolute h-32 w-32 rounded-full bottom-0 left-10 translate-y-5"
      :src="requestData.data.profile_picture['480x480']"
      alt="Cover Image"
    />
    <h1
      class="absolute bottom-12 left-44 font-bold text-pink-600 text-xl lg:text-3xl"
    >
      {{ requestData.data.handle }}
      <div
        v-if="requestData.data.is_verified"
        class="tooltip"
        data-tip="Verified Artist"
      >
        <Icon name="ri:verified-badge-fill" class="text-emerald-500" />
      </div>
      <div
        v-if="requestData.data.id === 'aY1Alz'"
        class="tooltip"
        data-tip="GENESIS™ Pick"
      >
        <Icon name="ri:verified-badge-fill" class="text-cyan-300" />
      </div>
    </h1>
    <h2
      class="absolute bottom-3 left-44 text-md text-slate-300 lg:text-xl glass p-1 col rounded-lg"
    >
      {{ requestData.data.follower_count }} Followers -
      {{ requestData.data.track_count }} Tracks
    </h2>
    <h3
      class="absolute bottom-64 lg:bottom-2 right-1 lg:right-2 text-sm lg:text-md bg-primary p-1 rounded-lg text-primary-content"
    >
      <Icon name="streamline:sign-hashtag-solid" /> {{ requestData.data.id }}
    </h3>
  </div>
  <div class="card my-8">
    <h2 class="card-title mx-12">Bio</h2>
    <p
      v-html="requestData?.data.bio"
      class="mx-12"
      style="white-space: pre"
    ></p>

    <div v-if="requestData?.data.artist_pick_track_id">
      <h2 class="card-title mt-4 mx-12">Most Popular Track</h2>
      <div class="mx-2 lg:mx-10" v-if="pinnedData?.data">
        <SongCard
          v-if="pinnedData?.data"
          :trackParsedData="pinnedData?.data"
          :cool="true"
        />
      </div>
    </div>

    <div class="mx-2 lg:mx-10 flex justify-end">
      <NuxtLink
        to="/"
        class="self-end text-xl lg:text-2xl font-black mt-14 border-2 border-base-300 rounded-lg p-2"
      >
        Return Home
      </NuxtLink>
    </div>

    <div role="tablist" class="tabs tabs-bordered mx-10 tabs-lg font-bold mt-4">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab"
        aria-label="Tracks"
        checked
      />
      <div role="tabpanel" class="tab-content" v-if="artistData?.data">
        <p>
          <SongCard
            v-for="(track, index) in artistData.data"
            :key="index"
            :trackParsedData="track"
          />
        </p>
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab"
        aria-label="Reposts"
      />
      <div role="tabpanel" class="tab-content" v-if="repostData?.data">
        <p v-for="(track, index) in repostData.data" :key="index">
          <SongCard
            v-if="track?.item_type === 'track'"
            :key="track?.item?.id"
            :trackParsedData="track?.item"
          />
          <PlaylistCard
            v-if="track?.item_type === 'playlist'"
            :key="track?.item?.id"
            :trackParsedData="track.item"
          />
        </p>
      </div>
    </div>
  </div>
</template>
