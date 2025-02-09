import jsBridge from "../bridge";
import { MResponse, MResponseWithData } from "../model";

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
      type,
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
