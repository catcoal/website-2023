const TsSecret = 609;

// 生成虚假时间戳，用于判断是否为伪造请求
export const CreateTimestamp = (): string => {
  const timestamp = Date.now();
  const ts = timestamp - (timestamp % TsSecret) + TsSecret;
  return ts.toString();
};
