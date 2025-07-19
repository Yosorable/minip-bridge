import jsBridge from "../bridge";
import { MResponseWithData } from "../types";
import { FileStats } from "../types/FileStats";

export async function access(path: string, mode?: number): Promise<void> {
  return jsBridge
    .callNative({
      api: "fsAccess",
      data: {
        path,
        mode,
      },
    })
    .then((res) => {
      const r = res as MResponseWithData<boolean>;
      if (!r.hasData() || !r.data) {
        throw new Error(r.msg ?? "cannot access this file or directory");
      }
    });
}

export function accessSync(path: string, mode?: number) {
  const res = jsBridge.callNativeSync({
    api: "fsAccessSync",
    data: {
      path,
      mode,
    },
  }) as MResponseWithData<boolean>;
  if (!res.hasData() || !res.data) {
    throw new Error(res.msg ?? "cannot access this file or directory");
  }
}

export async function unlink(path: string) {
  await jsBridge.callNative({
    api: "fsUnlink",
    data: {
      path,
    },
  });
}

export function unlinkSync(path: string) {
  jsBridge.callNativeSync({
    api: "fsUnlinkSync",
    data: {
      path,
    },
  });
}

export async function rename(oldPath: string, newPath: string) {
  await jsBridge.callNative({
    api: "fsRename",
    data: {
      oldPath,
      newPath,
    },
  });
}

export function renameSync(oldPath: string, newPath: string) {
  jsBridge.callNativeSync({
    api: "fsRenameSync",
    data: {
      oldPath,
      newPath,
    },
  });
}

// todo: check !!!!!
export async function stat(path: string) {
  const res = (await jsBridge.callNative({
    api: "fsStat",
    data: {
      path,
    },
  })) as MResponseWithData<FileStats>;

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

export function statSync(path: string) {
  const res = jsBridge.callNativeSync({
    api: "fsStatSync",
    data: {
      path,
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

export async function rm(path: string) {
  await jsBridge.callNative({
    api: "fsRm",
    data: {
      path,
    },
  });
}

export function rmSync(path: string) {
  jsBridge.callNativeSync({
    api: "fsRmSync",
    data: {
      path,
    },
  });
}
