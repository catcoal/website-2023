// 图片质量返回
export const OptimizeImageURL = (url: string, size: number) => {
  if (size <= 20) {
    return url + "!v1/scale/20/quality/30";
  } else if (size <= 50) {
    return url + "!v1/scale/30/quality/50";
  } else if (size <= 80) {
    return url + "!v1/scale/40/quality/80";
  } else if (size <= 100) {
    return url;
  }
};
