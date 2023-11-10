// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      meta: [
        {
          name: "author",
          content: "Lemming",
        },
        {
          name: "keywords",
          content:
            "Lem,Lem Blog,Lemming Blog,Blog,macOS,Windows,记录,分享,前端",
        },
        {
          name: "description",
          content: "分享开发者 Lemming 的无聊生活，不定时发布，欢迎关注",
        },
      ],
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
