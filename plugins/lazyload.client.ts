import { Debounce } from "~/utils/utils";
export default defineNuxtPlugin((nuxtApp) => {
  // 定义一个接口，表示懒加载图像的配置
  interface LazyLoadConfig {
    loadingImage?: string;
    errorImage?: string;
    placeholderImage?: string;
    debounceDelay?: number;
    root?: HTMLElement;
    threshold?: number;
  }

  // 定义一个接口，表示懒加载图像的信息
  interface LazyImage {
    el: HTMLImageElement;
    src: string;
  }

  // 定义懒加载配置
  const lazyLoadConfig: LazyLoadConfig = {
    // loadingImage: "/path/to/loading.gif",
    // errorImage: "/path/to/error.png",
    // placeholderImage: "/path/to/placeholder.png",
    debounceDelay: 0,
    threshold: 0.2,
  };

  // 用于存储需要懒加载的图像
  const lazyImages: LazyImage[] = [];

  // 创建带有可控参数的 IntersectionObserver 实例
  function createLazyLoadObserver(
    config: LazyLoadConfig
  ): IntersectionObserver {
    const observer = new IntersectionObserver(
      Debounce((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            const lazyImageInfo = lazyImages.find(
              (info) => info.el === lazyImage
            );

            if (lazyImageInfo) {
              lazyImage.src = lazyImageInfo.src || "";
              lazyImages.splice(lazyImages.indexOf(lazyImageInfo), 1);
              observer.unobserve(lazyImage);
            }
          }
        });
      }, config.debounceDelay || 0), // 默认为 0ms 防抖延迟
      {
        root: config.root,
        threshold: config.threshold || 0.1, // 默认为 0.1，表示当目标元素 10% 进入视口时触发回调
      }
    );

    return observer;
  }

  // 将图像添加到带有防抖的懒加载列表
  function addDebouncedLazyImage(
    el: HTMLImageElement,
    src: string,
    observer: IntersectionObserver
  ): void {
    const lazyImage: LazyImage = { el, src };
    lazyImages.push(lazyImage);
    observer.observe(el);
  }

  function init() {
    // 获取所有带有 "lazyload" 类的图像元素
    const lazyLoadImages = document.querySelectorAll(".lazyload");
    // 将图像添加到懒加载列表，传入懒加载配置
    const observer = createLazyLoadObserver(lazyLoadConfig);
    lazyLoadImages.forEach((img) => {
      addDebouncedLazyImage(
        img as HTMLImageElement,
        (img as HTMLImageElement).dataset.src || "",
        observer
      );
    });
  }

  nuxtApp.hook("app:created", () => {
    init();
  });

  // 此处理是解决404错误页面跳转回来未触发的问题
  // TODO 此次会执行两次
  nuxtApp.hook("page:finish", async () => {
    init();
  });

  nuxtApp.hook("page:transition:finish", () => {
    init();
  });
});
