<template>
  <footer
    class="footer footer-center p-10 bg-primary text-primary-content pb-32 mt-4 border-t-2 border-base-300"
  >
    <aside>
      <img src="/Creative_logo-200.svg" class="w-28 h-28" />
      <p class="font-bold">
        GENESIS is
        <span
          class="bg-gradient-to-r from-warning to-error bg-clip-text text-transparent"
          >Open Source</span
        ><br />
      </p>
      <p>Copyright © 2024 Creative Organization DAO</p>
    </aside>
    <nav>
      <div class="grid grid-flow-col gap-4 text-3xl">
        <a href="https://github.com/creativeplatform" target="_blank">
          <Icon name="ph:github-logo-fill" />
        </a>
        <a href="https://creativeplatform.xyz" target="_blank">
          <Icon name="ph:planet-bold" />
        </a>
        <a href="https://discord.gg/2JagPsCp3n" target="_blank">
          <Icon name="mingcute:discord-fill" />
        </a>
      </div>
    </nav>
    <!-- <p class="text-primary" href="https://f.dreamclouds.fr/dreamcode">
      DreamCode: FLIXSAN
    </p> -->
  </footer>
</template>

<script lang="ts" setup>
const { data: hash } = await useFetch(
  "https://api.github.com/repos/creativeplatform/moods.js/commits/main"
);
</script>
