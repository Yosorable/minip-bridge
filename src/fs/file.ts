import jsBridge from "../bridge";
import { MResponseWithData } from "../types";

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

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