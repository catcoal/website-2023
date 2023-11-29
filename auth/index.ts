export type Key = "UserInfos" | "Token";

export interface UserInfos {
  author: string;
  email: string;
  authorUrl: string;
}

// 定义一个映射类型，将每个 Key 映射到相应的数据类型
export interface KeyValueTypes {
  UserInfos: UserInfos;
  Token: string;
}

class MyLocalStorage {
  get<T extends Key>(key: T): KeyValueTypes[T] | null {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (err) {
      console.error(`Error getting data from localStorage key "${key}":`, err);
      return null;
    }
  }

  set<T extends Key>(key: T, value: KeyValueTypes[T]): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`Error setting localStorage key "${key}":`, err);
      return false;
    }
  }

  remove(key: Key): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error(`Error removing localStorage key "${key}":`, err);
      return false;
    }
  }
}

export default new MyLocalStorage();
