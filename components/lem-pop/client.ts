import lpop from "./index";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      lpop,
    },
  };
});
