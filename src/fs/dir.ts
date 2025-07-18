import jsBridge from "../bridge";
import { MResponseWithData } from "../types";

export async function mkdir(path: string, recursive: boolean = true) {
  await jsBridge.callNative({
    api: "fsMkdir",
    data: {
      path,
      recursive
    }
  })
}

export function mkdirSync(path: string, recursive: boolean = true) {
  jsBridge.callNativeSync({
    api: "fsMkdirSync",
    data: {
      path,
      recursive
    }
  })
}

export function readDir(path: string): Promise<string[]> {
  return jsBridge.callNative({
    api: "fsReadDir",
    data: {
      path
    }
  }).then(res => res as MResponseWithData<string[]>)
    .then(res => res.data)
}

export function readDirSync(path: string): string[] {
  const res = jsBridge.callNativeSync({
    api: "fsReadDirSync",
    data: {
      path
    }
  }) as MResponseWithData<string[]>
  return res.data
}

export async function rmdir(path: string, force?: boolean) {
  await jsBridge.callNative({
    api: "fsRmdir",
    data: {
      path,
      force
    }
  })
}

export function rmdirSync(path: string, force?: boolean) {
  jsBridge.callNativeSync({
    api: "fsRmdirSync",
    data: {
      path,
      force
    }
  })
}
