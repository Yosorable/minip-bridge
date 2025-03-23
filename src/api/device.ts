import jsBridge from "../bridge";
import { MResponse, MResponseWithData } from "../types";
import { DeviceInfo } from "../types/deviceinfo";

/**
 *
 * @param type medium as default
 */
export function vibrate(
  type?: "light" | "medium" | "heavy",
): Promise<MResponse> {
  return jsBridge.callNative({
    api: "vibrate",
    data: {
      type: type ?? "medium",
    },
  });
}

export function getClipboardData(): Promise<MResponseWithData<string>> {
  return jsBridge.callNative({
    api: "getClipboardData",
  });
}

export function setClipboardData(
  data: string,
): Promise<MResponseWithData<string>> {
  return jsBridge.callNative({
    api: "setClipboardData",
    data: {
      data,
    },
  });
}

export function scanQRCode(): Promise<
  MResponseWithData<string | undefined | null>
> {
  return jsBridge.callNative({ api: "scanQRCode" });
}

export function getDeviceInfo(): Promise<MResponseWithData<DeviceInfo>> {
  return jsBridge.callNative({ api: "getDeviceInfo" });
}

export function getDeviceInfoSync(): MResponseWithData<DeviceInfo> {
  return jsBridge.callNativeSync({ api: "getDeviceInfoSync" });
}
