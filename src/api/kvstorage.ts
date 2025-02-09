import jsBridge from "../bridge";
import { MResponse, MResponseWithData } from "../model";

// async methods

export function getKVStorage(key: string): Promise<MResponseWithData<String>> {
  return jsBridge.callNative({
    api: getKVStorage.name,
    data: { key },
  });
}

export function setKVStorage(key: string, value: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: setKVStorage.name,
    data: { key, value },
  });
}

export function deleteKVStorage(key: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: deleteKVStorage.name,
    data: { key },
  });
}

export function getKVStorageBatch(
  keys: string[],
): Promise<MResponseWithData<String>> {
  return jsBridge.callNative({
    api: getKVStorageBatch.name,
    data: { keys },
  });
}

export function setKVStorageBatch(
  data: Record<string, string>,
): Promise<MResponse> {
  return jsBridge.callNative({
    api: setKVStorageBatch.name,
    data: { data },
  });
}

export function deleteKVStorageBatch(keys: string[]): Promise<MResponse> {
  return jsBridge.callNative({
    api: deleteKVStorageBatch.name,
    data: { keys },
  });
}

export function clearKVStorage(): Promise<MResponse> {
  return jsBridge.callNative({
    api: clearKVStorage.name,
  });
}

// sync methods

export function getKVStorageSync(key: string): MResponseWithData<String> {
  return jsBridge.callNativeSync({
    api: getKVStorageSync.name,
    data: { key },
  });
}

export function setKVStorageSync(key: string, value: string): MResponse {
  return jsBridge.callNativeSync({
    api: setKVStorageSync.name,
    data: { key, value },
  });
}

export function deleteKVStorageSync(key: string): MResponse {
  return jsBridge.callNativeSync({
    api: deleteKVStorageSync.name,
    data: { key },
  });
}

export function getKVStorageBatchSync(
  keys: string[],
): MResponseWithData<String> {
  return jsBridge.callNativeSync({
    api: getKVStorageBatchSync.name,
    data: { keys },
  });
}

export function setKVStorageBatchSync(data: Record<string, string>): MResponse {
  return jsBridge.callNativeSync({
    api: setKVStorageBatchSync.name,
    data: { data },
  });
}

export function deleteKVStorageBatchSync(keys: string[]): MResponse {
  return jsBridge.callNativeSync({
    api: deleteKVStorageBatchSync.name,
    data: { keys },
  });
}

export function clearKVStorageSync(): MResponse {
  return jsBridge.callNativeSync({
    api: clearKVStorageSync.name,
  });
}
