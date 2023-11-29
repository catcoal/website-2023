import MyLocalStorage, { UserInfos } from "~/auth/index";

export const useAuthStore = () => {
  const userInfos = useState<UserInfos | null>("userInfos");

  onMounted(() => {
    userInfos.value = MyLocalStorage.get("UserInfos");
  });

  const setUserInfos = (UserInfos: UserInfos) => {
    MyLocalStorage.set("UserInfos", UserInfos);
  };

  return { userInfos, setUserInfos };
};
