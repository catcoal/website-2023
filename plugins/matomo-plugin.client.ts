import VueMatomo from "vue-matomo";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMatomo, {
    debug: true,
    host: "https://matomo.lemming.top/",
    siteId: 1,
    router: nuxtApp.$router,
    enableHeartBeatTimer: true,
    heartBeatTimerInterval: 5,
    enableLinkTracking: true,
    requireConsent: false,
    trackInitialView: true,
    disableCookies: true,
    requireCookieConsent: false,
  });
});