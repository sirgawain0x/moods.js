<template>
  <div
    v-if="trackParsedData?.data"
    :class="[
      'card',
      'card-side',
      'border-primary-content',
      'border-2',
      'mt-2',
      cool ? 'bg-secondary' : 'bg-base-300',
    ]"
  >
    <figure class="hidden lg:flex">
      <img
        class="h-32 w-32 rounded-l-none hidden lg:flex"
        :src="trackParsedData.data?.artwork?.['480x480'] || '/music-banner.jpg'"
        :alt="trackParsedData.data?.title"
      />
    </figure>
    <div class="card-body col-span-2 p-2 lg:p-5">
      <NuxtLink :to="'/track/' + trackParsedData.data?.id">
        <h2 class="text-base lg:text-lg card-title">
          <Icon name="streamline:music-note-1-solid" />{{
            trackParsedData.data?.title
          }}
        </h2>
      </NuxtLink>
      <p class="font-normal">
        <NuxtLink :to="'/handle/' + trackParsedData.data?.user?.handle">
          <Icon name="ph:person-fill" />
          {{ trackParsedData.data?.user?.name }}
        </NuxtLink>
        <span class="font-black"> - </span>
        <Icon name="ph:disc-fill" />
        {{ trackParsedData.data?.genre }}
        <span class="font-black"> - </span>
        <Icon name="ph:clock-fill" />
        {{
          trackParsedData.data?.duration
            ? new Date(trackParsedData.data.duration * 1000)
                .toISOString()
                .substring(14, 19)
            : "00:00"
        }}
        <span class="font-black"> - </span>
        <Icon name="ph:play-fill" />
        {{ trackParsedData.data?.play_count }} Listenings
      </p>
    </div>
    <div class="mr-2 lg:mr-8 start-2 flex items-center">
      <PlayButton :trackId="trackParsedData.data?.id" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trackParsedData: {
      type: Object,
      required: true, // Ensure trackParsedData is required
    },
    cool: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
