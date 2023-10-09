export const useAppStore = () => {
  const isMenuShow = useState("isMenuShow", () => false);

  const showMenu = () => {
    isMenuShow.value = true;
  };

  const hidenMenu = () => {
    isMenuShow.value = false;
  };

  return {
    isMenuShow,
    showMenu,
    hidenMenu,
  };
};
