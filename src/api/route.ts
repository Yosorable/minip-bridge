import jsBridge from "../bridge";
import { MResponse } from "../model";

export function navigateTo(data: {
  page: string;
  title: string;
}): Promise<MResponse> {
  return jsBridge.callNative({
    api: navigateTo.name,
    data: data,
  });
}

export function navigateBack(delta: number = 1): Promise<MResponse> {
  return jsBridge.callNative({
    api: navigateBack.name,
    data: {
      delta,
    },
  });
}

export function redirectTo(data: {
  page: string;
  title: string;
}): Promise<MResponse> {
  return jsBridge.callNative({
    api: redirectTo.name,
    data: data,
  });
}

export function openWebsite(url: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: openWebsite.name,
    data: { url },
  });
}
