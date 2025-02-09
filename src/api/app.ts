import jsBridge from "../bridge";
import { AppInfo, MResponse, MResponseWithData } from "../model";

export function closeApp(): Promise<MResponse> {
  return jsBridge.callNative({
    api: closeApp.name,
  });
}

export function showAppDetail(): Promise<MResponse> {
  return jsBridge.callNative({
    api: showAppDetail.name,
  });
}

export function installApp(url: string): Promise<MResponse> {
  return jsBridge.callNative({
    api: installApp.name,
    data: {
      url,
    },
  });
}

export function getInstalledAppList(): Promise<MResponseWithData<AppInfo>> {
  return jsBridge.callNative({
    api: getInstalledAppList.name,
  });
}
