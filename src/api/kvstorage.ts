import jsBridge from "../bridge";
import { MResponse, MResponseWithData } from "../model";

// async methods

export function getKVStorage(key: string): Promise<MResponseWithData<string>> {
  return jsBridge.callNative({
    api: "getKVStorage",
    data: { key },
  });
}

export function setKVStorage(key: string, value: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: "setKVStorage",
    data: { key, value },
  });
}

export function deleteKVStorage(key: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: "deleteKVStorage",
    data: { key },
  });
}

export function clearKVStorage(): Promise<MResponse> {
  return jsBridge.callNative({
    api: "clearKVStorage",
  });
}

// sync methods

export function getKVStorageSync(key: string): MResponseWithData<string> {
  return jsBridge.callNativeSync({
    api: "getKVStorageSync",
    data: { key },
  });
}

export function setKVStorageSync(key: string, value: string): MResponse {
  return jsBridge.callNativeSync({
    api: "setKVStorageSync",
    data: { key, value },
  });
}

export function deleteKVStorageSync(key: string): MResponse {
  return jsBridge.callNativeSync({
    api: "deleteKVStorageSync",
    data: { key },
  });
}

export function clearKVStorageSync(): MResponse {
  return jsBridge.callNativeSync({
    api: "clearKVStorageSync",
  });
}
