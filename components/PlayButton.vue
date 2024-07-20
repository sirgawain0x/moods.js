<script lang="ts" setup>
import {
  state,
  getPlaylist,
  addTrackToPlaylist,
  setPlaylistIndex,
} from "~/stores/playlist";

const playlist = computed({
  get: () => state.playlist,
  set: (value) => addTrackToPlaylist(value[0]),
});

const index = computed({
  get: () => state.playlistIndex,
  set: (value) => setPlaylistIndex(value),
});

const props = defineProps<{
  trackId: string;
}>();

const handleAddToPlaylist = (trackId: string) => {
  addTrackToPlaylist(trackId);
  console.log(state.playlist, state.playlistIndex);
};
</script>

<template>
  <a class="btn btn-primary" @click="handleAddToPlaylist(trackId)">
    <Icon name="ph:play-fill" />
  </a>
</template>
