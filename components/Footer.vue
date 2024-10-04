<template>
  <footer
    class="footer footer-center p-10 bg-[#1A202C] text-primary-content pb-32 mt-4 border-t-2 border-base-300"
  >
    <aside>
      <img src="/Creative_logo-200.svg" class="w-28 h-28 block m-0" />
      <p class="font-bold text-gray-300">
        GENESIS is
        <span
          class="bg-gradient-to-r from-warning to-error bg-clip-text text-transparent"
          >Open Source</span
        ><br />
      </p>
      <p class="text-gray-300">
        Copyright © {{ currentYear }} Creative Organization DAO
      </p>
    </aside>
    <nav>
      <div class="grid grid-flow-col gap-4 text-3xl text-gray-300">
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
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
