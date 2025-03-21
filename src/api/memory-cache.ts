import jsBridge from "../bridge";
import { MResponse, MResponseWithData } from "../model";

export function getMemoryStorage(
  key: string,
): Promise<MResponseWithData<string>> {
  return jsBridge.callNative({
    api: "getMemoryStorage",
    data: { key },
  });
}

export function setMemoryStorage(
  key: string,
  value: string,
): Promise<MResponse> {
  return jsBridge.callNative({
    api: "setMemoryStorage",
    data: { key, value },
  });
}
export function setMemoryStorageIfNotExist(
  key: string,
  value: string,
): Promise<MResponseWithData<boolean>> {
  return jsBridge.callNative({
    api: "setMemoryStorageIfNotExist",
    data: { key, value },
  });
}

export function removeMemoryStorage(key: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: "removeMemoryStorage",
    data: { key },
  });
}

export function clearMemoryStorage(): Promise<MResponse> {
  return jsBridge.callNative({
    api: "clearMemoryStorage",
  });
}
