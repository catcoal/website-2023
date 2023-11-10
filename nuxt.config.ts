// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/image"],
  image: {},
  ssr: false,
  app: {
    head: {
      script: [
        {
          src: "",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  plugins: [
    {
      src: "~/components/lem-pop/client",
    },
  ],
});
