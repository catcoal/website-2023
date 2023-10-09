import { createVNode, render } from "vue";
// import message from './message/message';
import MenuConstructor from "./menu/menu.vue";

interface options {
  type: string;
}

const LemPop = (options: options) => {
  const id = "LEM-POP";
  if (process.client) {
    const container = document.createElement("div");
    container.id = id;
    const vm = createVNode(MenuConstructor, { id, ...options });
    render(vm, container);
    document.body.appendChild(container);
  }
};

export default LemPop;
