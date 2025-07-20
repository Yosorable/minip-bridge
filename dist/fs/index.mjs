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
async function cp(src, dest, recursive) {
  await bridge_default.callNative({
    api: "fsCp",
    data: {
      src,
      dest,
      recursive
    }
  });
}
function cpSync(src, dest, recursive) {
  bridge_default.callNativeSync({
    api: "fsCpSync",
    data: {
      src,
      dest,
      recursive
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

// src/utils/utils.ts
function arrayBufferToBase64(buffer, offset = 0, length = 0) {
  if (length === 0) {
    length = buffer.byteLength;
  }
  const arrayBuffer = offset === 0 && length === buffer.byteLength ? buffer : buffer.slice(offset, offset + length);
  let binary = "";
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
function base64SetToArrayBuffer(base64, buffer, offset) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[offset + i] = binaryString.charCodeAt(i);
  }
  return binaryString.length;
}

// src/fs/file.ts
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

// src/fs/fd.ts
var OpenFlags = /* @__PURE__ */ ((OpenFlags2) => {
  OpenFlags2[OpenFlags2["O_RDONLY"] = 0] = "O_RDONLY";
  OpenFlags2[OpenFlags2["O_WRONLY"] = 1] = "O_WRONLY";
  OpenFlags2[OpenFlags2["O_RDWR"] = 2] = "O_RDWR";
  OpenFlags2[OpenFlags2["O_CREAT"] = 64] = "O_CREAT";
  OpenFlags2[OpenFlags2["O_EXCL"] = 128] = "O_EXCL";
  OpenFlags2[OpenFlags2["O_TRUNC"] = 512] = "O_TRUNC";
  OpenFlags2[OpenFlags2["O_APPEND"] = 1024] = "O_APPEND";
  return OpenFlags2;
})(OpenFlags || {});
function open(path, flags, mode) {
  return bridge_default.callNative({
    api: "fsOpen",
    data: {
      path,
      flags,
      mode
    }
  }).then((res) => res.data);
}
function openSync(path, flags, mode) {
  const res = bridge_default.callNativeSync({
    api: "fsOpenSync",
    data: {
      path,
      flags,
      mode
    }
  });
  return res.data;
}
async function close(fd) {
  await bridge_default.callNative({
    api: "fsClose",
    data: {
      fd
    }
  });
}
function closeSync(fd) {
  bridge_default.callNativeSync({
    api: "fsCloseSync",
    data: {
      fd
    }
  });
}
async function fstat(fd) {
  const res = await bridge_default.callNative({
    api: "fsFstat",
    data: {
      fd
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
function fstatSync(fd) {
  const res = bridge_default.callNativeSync({
    api: "fsFstatSync",
    data: {
      fd
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
async function ftruncate(fd, length) {
  await bridge_default.callNative({
    api: "fsFtruncate",
    data: {
      fd,
      length
    }
  });
}
function ftruncateSync(fd, length) {
  bridge_default.callNativeSync({
    api: "fsFtruncateSync",
    data: {
      fd,
      length
    }
  });
}
async function read(fd, buffer, offset, length, position) {
  const res = await bridge_default.callNative({
    api: "fsRead",
    data: {
      fd,
      length,
      position
    }
  });
  return base64SetToArrayBuffer(res.data, buffer, offset);
}
function readSync(fd, buffer, offset, length, position) {
  const res = bridge_default.callNativeSync({
    api: "fsReadSync",
    data: {
      fd,
      length,
      position
    }
  });
  return base64SetToArrayBuffer(res.data, buffer, offset);
}
function write(fd, buffer, offset, length, position) {
  const base64 = arrayBufferToBase64(buffer, offset, length);
  return bridge_default.callNative({
    api: "fsWrite",
    data: {
      fd,
      data: base64,
      position
    }
  }).then((res) => res.data);
}
function writeSync(fd, buffer, offset, length, position) {
  const base64 = arrayBufferToBase64(buffer, offset, length);
  return bridge_default.callNativeSync({
    api: "fsWriteSync",
    data: {
      fd,
      data: base64,
      position
    }
  }).data;
}
export {
  OpenFlags,
  access,
  accessSync,
  appendFile,
  appendFileSync,
  close,
  closeSync,
  copyFile,
  copyFileSync,
  cp,
  cpSync,
  fstat,
  fstatSync,
  ftruncate,
  ftruncateSync,
  mkdir,
  mkdirSync,
  open,
  openSync,
  read,
  readDir,
  readDirSync,
  readFile,
  readFileSync,
  readSync,
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
  write,
  writeFile,
  writeFileSync,
  writeSync
};
//# sourceMappingURL=index.mjs.map