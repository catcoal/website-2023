import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// 引入需要的图标 // https://fontawesome.com/icons
import {
  faChevronLeft,
  faCat,
  faLink,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
// 因为默认添加了 nuxt会造成一些错误，所以不自动添加样式
config.autoAddCss = false;
// defineNuxtPlugin 是全局的，不需要手动引入即可使用，不会报错
export default defineNuxtPlugin((nuxtApp) => {
  // 将图标添加到库中
  library.add(faChevronLeft);
  library.add(faLink);
  library.add(faCat);
  library.add(faEnvelope);
  library.add(faPaperPlane);
  library.add(faMessage);
  // 全局注册 font-awesome-icon 组件
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
});
