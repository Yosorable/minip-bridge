import { MResponseStatusCode } from "../model";
import { MRequest } from "../model/request";

interface Callable {
  postMessage: (data: string) => Promise<string>;
}

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        MinipNativeInteraction?: Callable;
      };
    };
  }
}

let jsBridge: {
  callNative: <T>(req?: MRequest<T>) => Promise<any>;
  callNativeSync: <T>(req?: MRequest<T>) => any;
};

// iOS
if (
  window.webkit &&
  window.webkit.messageHandlers &&
  window.webkit.messageHandlers.MinipNativeInteraction
) {
  const _callNative = window.webkit.messageHandlers.MinipNativeInteraction;
  jsBridge = {
    callNative(req) {
      return _callNative
        .postMessage(JSON.stringify(req))
        .then((res) => JSON.parse(res))
        .then((res) => {
          if (res.code && res.code === MResponseStatusCode.SUCCESS) {
            return res;
          }
          throw new Error(res.msg ?? "Unknown error");
        });
    },
    callNativeSync(req) {
      const res = prompt(JSON.stringify(req));
      if (res) {
        return JSON.parse(res);
      }
      return {
        code: MResponseStatusCode.FAILED,
        msg: "Unknown error",
      };
    },
  };
} else {
  // error
  jsBridge = {
    callNative() {
      return new Promise((_, reject) => {
        reject("Cannot find JavaScript Bridge!!!");
      });
    },
    callNativeSync() {
      return {
        code: MResponseStatusCode.FAILED,
        msg: "Cannot find JavaScript Bridge!!!",
      };
    },
  };
}

export default jsBridge;
