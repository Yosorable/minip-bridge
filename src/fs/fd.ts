import jsBridge from "../bridge";
import { MResponseWithData } from "../types";
import { FileStats } from "../types/filestats";
import { arrayBufferToBase64, base64SetToArrayBuffer } from "../utils/utils";

export enum OpenFlags {
  O_RDONLY = 0,
  O_WRONLY = 1,
  O_RDWR = 2,
  O_CREAT = 64,
  O_EXCL = 128,
  O_TRUNC = 512,
  O_APPEND = 1024,
}

export function open(path: string, flags: OpenFlags | number, mode?: number) {
  return jsBridge.callNative({
    api: "fsOpen",
    data: {
      path,
      flags,
      mode,
    },
  }).then(res => (res as MResponseWithData<number>).data);
}

export function openSync(path: string, flags: OpenFlags | number, mode?: number) {
  const res = jsBridge.callNativeSync({
    api: "fsOpenSync",
    data: {
      path,
      flags,
      mode,
    },
  }) as MResponseWithData<number>
  return res.data
}

export async function close(fd: number) {
  await jsBridge.callNative({
    api: "fsClose",
    data: {
      fd,
    },
  })
}

export function closeSync(fd: number) {
  jsBridge.callNativeSync({
    api: "fsCloseSync",
    data: {
      fd,
    },
  })
}

export async function fstat(fd: number) {
  const res = await jsBridge.callNative({
    api: "fsFstat",
    data: {
      fd,
    },
  }) as MResponseWithData<FileStats>;

  const file = res.data;

  file.atime = new Date(file.atimeMs);
  file.mtime = new Date(file.mtimeMs);
  file.ctime = new Date(file.ctimeMs);
  file.birthtime = new Date(file.birthtimeMs);

  const S_IFDIR = 0o040000;
  const S_IFREG = 0o100000;
  const S_IFLNK = 0o120000;

  file.isDirectory = function () {
    return (this.mode & S_IFDIR) === S_IFDIR;
  };

  file.isFile = function () {
    return (this.mode & S_IFREG) === S_IFREG;
  };

  file.isSymbolicLink = function () {
    return (this.mode & S_IFLNK) === S_IFLNK;
  };

  return file;
}

export function fstatSync(fd: number) {
  const res = jsBridge.callNativeSync({
    api: "fsFstatSync",
    data: {
      fd,
    },
  }) as MResponseWithData<FileStats>;

  const file = res.data;

  file.atime = new Date(file.atimeMs);
  file.mtime = new Date(file.mtimeMs);
  file.ctime = new Date(file.ctimeMs);
  file.birthtime = new Date(file.birthtimeMs);

  const S_IFDIR = 0o040000;
  const S_IFREG = 0o100000;
  const S_IFLNK = 0o120000;

  file.isDirectory = function () {
    return (this.mode & S_IFDIR) === S_IFDIR;
  };

  file.isFile = function () {
    return (this.mode & S_IFREG) === S_IFREG;
  };

  file.isSymbolicLink = function () {
    return (this.mode & S_IFLNK) === S_IFLNK;
  };

  return file;
}

export async function ftruncate(fd: number, length: number) {
  await jsBridge.callNative({
    api: "fsFtruncate",
    data: {
      fd,
      length
    }
  })
}

export function ftruncateSync(fd: number, length: number) {
  jsBridge.callNativeSync({
    api: "fsFtruncateSync",
    data: {
      fd,
      length
    }
  })
}

export async function read(fd: number, buffer: ArrayBuffer, offset: number, length: number, position?: number) {
  const res = await jsBridge.callNative({
    api: "fsRead",
    data: {
      fd,
      length,
      position,
    }
  }) as MResponseWithData<string>;
  return base64SetToArrayBuffer(res.data, buffer, offset);
}

export function readSync(fd: number, buffer: ArrayBuffer, offset: number, length: number, position?: number) {
  const res = jsBridge.callNativeSync({
    api: "fsReadSync",
    data: {
      fd,
      length,
      position,
    }
  }) as MResponseWithData<string>;
  return base64SetToArrayBuffer(res.data, buffer, offset);
}

export function write(fd: number, buffer: ArrayBuffer, offset: number, length: number, position?: number) {
  const base64 = arrayBufferToBase64(buffer, offset, length);

  return jsBridge.callNative({
    api: "fsWrite",
    data: {
      fd,
      data: base64,
      position,
    }
  }).then(res => (res as MResponseWithData<number>).data);
}

export function writeSync(fd: number, buffer: ArrayBuffer, offset: number, length: number, position?: number) {
  const base64 = arrayBufferToBase64(buffer, offset, length);

  return (jsBridge.callNativeSync({
    api: "fsWriteSync",
    data: {
      fd,
      data: base64,
      position,
    }
  }) as MResponseWithData<number>).data;
}