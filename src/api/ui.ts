import jsBridge from "../bridge";
import {
  AlertConfig,
  MResponse,
  MResponseWithData,
  ShowHUDRequest,
} from "../model";

// navigation bar

export function setNavigationBarTitle(title: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: "setNavigationBarTitle",
    data: {
      title,
    },
  });
}

export function setNavigationBarColor(config: {
  foregroundColor: string;
  backgroundColor: string;
}): Promise<MResponse> {
  return jsBridge.callNative({
    api: "setNavigationBarColor",
    data: config,
  });
}

// pulldown refresh

export function enablePullDownRefresh(): Promise<MResponse> {
  return jsBridge.callNative({
    api: "enablePullDownRefresh",
  });
}

export function disablePullDownRefresh(): Promise<MResponse> {
  return jsBridge.callNative({
    api: "disablePullDownRefresh",
  });
}

export function onPullDownRefresh(callback: (e: Event) => any) {
  window.addEventListener("pulldownrefresh", callback);
}

export function startPullDownRefresh(): Promise<MResponse> {
  return jsBridge.callNative({
    api: "startPullDownRefresh",
  });
}

export function stopPullDownRefresh(): Promise<MResponse> {
  return jsBridge.callNative({
    api: "stopPullDownRefresh",
  });
}

// HUD

export function showHUD(req: ShowHUDRequest): Promise<MResponse> {
  return jsBridge.callNative({
    api: "showHUD",
    data: req,
  });
}

export function hideHUD(): Promise<MResponse> {
  return jsBridge.callNative({
    api: "hideHUD",
  });
}

// alert
export function showAlert(
  config: AlertConfig,
): Promise<MResponseWithData<string>> {
  return jsBridge.callNative({
    api: "showAlert",
    data: config,
  });
}

// media
export function previewImage(url: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: "previewImage",
    data: {
      url,
    },
  });
}

export function previewVideo(url: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: "previewVideo",
    data: {
      url,
    },
  });
}
