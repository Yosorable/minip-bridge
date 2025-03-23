import jsBridge from "../bridge";
import { AppInfo, MResponse, MResponseWithData } from "../types";

export function closeApp(): Promise<MResponse> {
  return jsBridge.callNative({
    api: "closeApp",
  });
}

export function showAppDetail(): Promise<MResponse> {
  return jsBridge.callNative({
    api: "showAppDetail",
  });
}

export function installApp(url: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: "installApp",
    data: {
      url,
    },
  });
}

export function getInstalledAppList(): Promise<MResponseWithData<AppInfo[]>> {
  return jsBridge.callNative({
    api: "getInstalledAppList",
  });
}
