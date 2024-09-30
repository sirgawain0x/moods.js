export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-09-30",
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/harlem",
    "nuxt-icon",
    "@nuxtjs/device",
  ],
  googleFonts: {
    families: {
      Lexend: "100..900",
    },
  },
  app: {
    head: {
      title: "Genesis™",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: "icon", href: "/favicon.png" },
        { rel: "manifest", href: "/manifest.json" },
      ],
      meta: [
        {
          property: "og:site_name",
          content: "Genesis™",
        },
        {
          name: "theme-color",
          content: "#d9934f",
        },
      ],
      htmlAttrs: {
        "data-theme": "cupcake",
      },
    },
  },
  router: {
    middleware: ["auth"],
  },
  buildModules: ["@nuxtjs/pwa"],
  pwa: {
    icon: {
      source: "/img/Genesis.png",
      purpose: "any",
    },
    meta: {
      theme_color: "#d9934f",
      mobileAppIOS: true,
      ogHost: "https://music.creativeplatform.xyz",
      ogImage: {
        path: "/img/Genesis.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
      twitterCard: "summary_large_image",
      twitterSite: "@creativecrtv",
      twitterCreator: "@0xsirgawain",
    },
    manifest: {
      name: "Genesis™",
      short_name: "Genesis",
      description:
        "Your new home for discovering new music. Discover new artists and take part in their evolution.",
      display: "standalone",
      background_color: "#ffffff",
      start_url: "/",
      useWebmanifestExtension: false,
    },
    workbox: {
      manifest: {
        crossOrigin: "use-credentials",
      },
      cachingExtensions: "@/plugins/workbox-range-request.js",
    },
  },
});
