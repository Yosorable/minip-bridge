import {
  bridge_default
} from "../chunk-PKXNS7QU.mjs";

// src/fs/common.ts
async function access(path, mode) {
  return bridge_default.callNative({
    api: "fsAccess",
    data: {
      path,
      mode
    }
  }).then((res) => {
    const r = res;
    if (!r.hasData() || !r.data) {
      throw new Error(r.msg ?? "cannot access this file or directory");
    }
  });
}
function accessSync(path, mode) {
  const res = bridge_default.callNativeSync({
    api: "fsAccessSync",
    data: {
      path,
      mode
    }
  });
  if (!res.hasData() || !res.data) {
    throw new Error(res.msg ?? "cannot access this file or directory");
  }
}
async function unlink(path) {
  await bridge_default.callNative({
    api: "fsUnlink",
    data: {
      path
    }
  });
}
function unlinkSync(path) {
  bridge_default.callNativeSync({
    api: "fsUnlinkSync",
    data: {
      path
    }
  });
}
async function rename(oldPath, newPath) {
  await bridge_default.callNative({
    api: "fsRename",
    data: {
      oldPath,
      newPath
    }
  });
}
function renameSync(oldPath, newPath) {
  bridge_default.callNativeSync({
    api: "fsRenameSync",
    data: {
      oldPath,
      newPath
    }
  });
}
async function stat(path) {
  const res = await bridge_default.callNative({
    api: "fsStat",
    data: {
      path
    }
  });
  const file = res.data;
  file.atime = new Date(file.atimeMs);
  file.mtime = new Date(file.mtimeMs);
  file.ctime = new Date(file.ctimeMs);
  file.birthtime = new Date(file.birthtimeMs);
  const S_IFDIR = 16384;
  const S_IFREG = 32768;
  const S_IFLNK = 40960;
  file.isDirectory = function() {
    return (this.mode & S_IFDIR) === S_IFDIR;
  };
  file.isFile = function() {
    return (this.mode & S_IFREG) === S_IFREG;
  };
  file.isSymbolicLink = function() {
    return (this.mode & S_IFLNK) === S_IFLNK;
  };
  return file;
}
function statSync(path) {
  const res = bridge_default.callNativeSync({
    api: "fsStatSync",
    data: {
      path
    }
  });
  const file = res.data;
  file.atime = new Date(file.atimeMs);
  file.mtime = new Date(file.mtimeMs);
  file.ctime = new Date(file.ctimeMs);
  file.birthtime = new Date(file.birthtimeMs);
  const S_IFDIR = 16384;
  const S_IFREG = 32768;
  const S_IFLNK = 40960;
  file.isDirectory = function() {
    return (this.mode & S_IFDIR) === S_IFDIR;
  };
  file.isFile = function() {
    return (this.mode & S_IFREG) === S_IFREG;
  };
  file.isSymbolicLink = function() {
    return (this.mode & S_IFLNK) === S_IFLNK;
  };
  return file;
}
async function rm(path) {
  await bridge_default.callNative({
    api: "fsRm",
    data: {
      path
    }
  });
}
function rmSync(path) {
  bridge_default.callNativeSync({
    api: "fsRmSync",
    data: {
      path
    }
  });
}

// src/fs/dir.ts
async function mkdir(path, recursive = true) {
  await bridge_default.callNative({
    api: "fsMkdir",
    data: {
      path,
      recursive
    }
  });
}
function mkdirSync(path, recursive = true) {
  bridge_default.callNativeSync({
    api: "fsMkdirSync",
    data: {
      path,
      recursive
    }
  });
}
function readDir(path) {
  return bridge_default.callNative({
    api: "fsReadDir",
    data: {
      path
    }
  }).then((res) => res).then((res) => res.data);
}
function readDirSync(path) {
  const res = bridge_default.callNativeSync({
    api: "fsReadDirSync",
    data: {
      path
    }
  });
  return res.data;
}
async function rmdir(path, force) {
  await bridge_default.callNative({
    api: "fsRmdir",
    data: {
      path,
      force
    }
  });
}
function rmdirSync(path, force) {
  bridge_default.callNativeSync({
    api: "fsRmdirSync",
    data: {
      path,
      force
    }
  });
}

// src/fs/file.ts
function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function readFile(path) {
  return bridge_default.callNative({
    api: "fsReadFile",
    data: {
      path
    }
  }).then((res) => res.data).then((res) => base64ToArrayBuffer(res));
}
function readFileSync(path) {
  const res = bridge_default.callNativeSync({
    api: "fsReadFileSync",
    data: {
      path
    }
  });
  return base64ToArrayBuffer(res.data);
}
async function writeFile(path, data) {
  let base64 = "";
  if (data instanceof ArrayBuffer) {
    base64 = arrayBufferToBase64(data);
  } else {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);
    const arrayBuffer = uint8Array.buffer;
    base64 = arrayBufferToBase64(arrayBuffer);
  }
  await bridge_default.callNative({
    api: "fsWriteFile",
    data: {
      path,
      data: base64
    }
  });
}
function writeFileSync(path, data) {
  let base64 = "";
  if (data instanceof ArrayBuffer) {
    base64 = arrayBufferToBase64(data);
  } else {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);
    const arrayBuffer = uint8Array.buffer;
    base64 = arrayBufferToBase64(arrayBuffer);
  }
  bridge_default.callNativeSync({
    api: "fsWriteFileSync",
    data: {
      path,
      data: base64
    }
  });
}
async function appendFile(path, data) {
  let base64 = "";
  if (data instanceof ArrayBuffer) {
    base64 = arrayBufferToBase64(data);
  } else {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);
    const arrayBuffer = uint8Array.buffer;
    base64 = arrayBufferToBase64(arrayBuffer);
  }
  await bridge_default.callNative({
    api: "fsAppendFile",
    data: {
      path,
      data: base64
    }
  });
}
function appendFileSync(path, data) {
  let base64 = "";
  if (data instanceof ArrayBuffer) {
    base64 = arrayBufferToBase64(data);
  } else {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);
    const arrayBuffer = uint8Array.buffer;
    base64 = arrayBufferToBase64(arrayBuffer);
  }
  bridge_default.callNativeSync({
    api: "fsAppendFileSync",
    data: {
      path,
      data: base64
    }
  });
}
async function copyFile(src, dest) {
  await bridge_default.callNative({
    api: "fsCopyFile",
    data: {
      src,
      dest
    }
  });
}
function copyFileSync(src, dest) {
  bridge_default.callNativeSync({
    api: "fsCopyFileSync",
    data: {
      src,
      dest
    }
  });
}
async function truncate(path, length) {
  await bridge_default.callNative({
    api: "fsTruncate",
    data: {
      path,
      length
    }
  });
}
function truncateSync(path, length) {
  bridge_default.callNativeSync({
    api: "fsTruncateSync",
    data: {
      path,
      length
    }
  });
}
export {
  access,
  accessSync,
  appendFile,
  appendFileSync,
  copyFile,
  copyFileSync,
  mkdir,
  mkdirSync,
  readDir,
  readDirSync,
  readFile,
  readFileSync,
  rename,
  renameSync,
  rm,
  rmSync,
  rmdir,
  rmdirSync,
  stat,
  statSync,
  truncate,
  truncateSync,
  unlink,
  unlinkSync,
  writeFile,
  writeFileSync
};
//# sourceMappingURL=index.mjs.map