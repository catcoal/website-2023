// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    head:{
      script:[
        {
          // IconLord
          src:"https://cdn.lordicon.com/bhenfmcm.js",
        }
      ]
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
