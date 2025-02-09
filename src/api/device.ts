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
    api: vibrate.name,
    data: {
      type,
    },
  });
}

export function getClipboardData(): Promise<MResponseWithData<string>> {
  return jsBridge.callNative({
    api: getClipboardData.name,
  });
}

export function setClipboardData(
  data: string,
): Promise<MResponseWithData<string>> {
  return jsBridge.callNative({
    api: setClipboardData.name,
    data: {
      data,
    },
  });
}
