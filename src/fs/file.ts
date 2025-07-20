import jsBridge from "../bridge";
import { MResponseWithData } from "../types";
import { base64ToArrayBuffer } from "../utils/utils";
import { arrayBufferToBase64 } from "../utils/utils";

export function readFile(path: string): Promise<ArrayBuffer> {
  return jsBridge.callNative({
    api: "fsReadFile",
    data: {
      path
    }
  }).then(res => (res as MResponseWithData<string>).data)
    .then(res => base64ToArrayBuffer(res))
}

export function readFileSync(path: string): ArrayBuffer {
  const res = jsBridge.callNativeSync({
    api: "fsReadFileSync",
    data: {
      path
    }
  }) as MResponseWithData<string>
  return base64ToArrayBuffer(res.data)
}

export async function writeFile(path: string, data: ArrayBuffer | string) {
  let base64 = ""
  if (data instanceof ArrayBuffer) {
    base64 = arrayBufferToBase64(data)
  } else {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);
    const arrayBuffer = uint8Array.buffer;
    base64 = arrayBufferToBase64(arrayBuffer as ArrayBuffer)
  }


  await jsBridge.callNative({
    api: "fsWriteFile",
    data: {
      path,
      data: base64
    }
  })
}

export function writeFileSync(path: string, data: ArrayBuffer | string) {
  let base64 = ""
  if (data instanceof ArrayBuffer) {
    base64 = arrayBufferToBase64(data)
  } else {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);
    const arrayBuffer = uint8Array.buffer;
    base64 = arrayBufferToBase64(arrayBuffer as ArrayBuffer)
  }

  jsBridge.callNativeSync({
    api: "fsWriteFileSync",
    data: {
      path,
      data: base64
    }
  })
}

export async function appendFile(path: string, data: ArrayBuffer | string) {
  let base64 = ""
  if (data instanceof ArrayBuffer) {
    base64 = arrayBufferToBase64(data)
  } else {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);
    const arrayBuffer = uint8Array.buffer;
    base64 = arrayBufferToBase64(arrayBuffer as ArrayBuffer)
  }

  await jsBridge.callNative({
    api: "fsAppendFile",
    data: {
      path,
      data: base64
    }
  })
}

export function appendFileSync(path: string, data: ArrayBuffer | string) {
  let base64 = ""
  if (data instanceof ArrayBuffer) {
    base64 = arrayBufferToBase64(data)
  } else {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);
    const arrayBuffer = uint8Array.buffer;
    base64 = arrayBufferToBase64(arrayBuffer as ArrayBuffer)
  }

  jsBridge.callNativeSync({
    api: "fsAppendFileSync",
    data: {
      path,
      data: base64
    }
  })
}

export async function copyFile(src: string, dest: string) {
  await jsBridge.callNative({
    api: "fsCopyFile",
    data: {
      src,
      dest
    }
  })
}

export function copyFileSync(src: string, dest: string) {
  jsBridge.callNativeSync({
    api: "fsCopyFileSync",
    data: {
      src,
      dest
    }
  })
}

export async function truncate(path: string, length: number) {
  await jsBridge.callNative({
    api: "fsTruncate",
    data: {
      path,
      length
    }
  })
}

export function truncateSync(path: string, length: number) {
  jsBridge.callNativeSync({
    api: "fsTruncateSync",
    data: {
      path,
      length
    }
  })
}