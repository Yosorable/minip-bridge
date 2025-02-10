import jsBridge from "../bridge";
import { MResponse } from "../model";

export function navigateTo(data: {
  page: string;
  title?: string;
}): Promise<MResponse> {
  return jsBridge.callNative({
    api: "navigateTo",
    data: data,
  });
}

export function navigateBack(delta: number = 1): Promise<MResponse> {
  return jsBridge.callNative({
    api: "navigateBack",
    data: {
      delta,
    },
  });
}

export function redirectTo(data: {
  page: string;
  title?: string;
}): Promise<MResponse> {
  return jsBridge.callNative({
    api: "redirectTo",
    data: data,
  });
}

export function openWebsite(url: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: "openWebsite",
    data: { url },
  });
}
