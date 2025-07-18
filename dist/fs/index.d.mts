interface FileStats {
    dev: number;
    ino: number;
    mode: number;
    nlink: number;
    uid: number;
    gid: number;
    rdev: number;
    size: number;
    blksize: number;
    blocks: number;
    atimeMs: number;
    mtimeMs: number;
    ctimeMs: number;
    birthtimeMs: number;
    atime: Date;
    mtime: Date;
    ctime: Date;
    birthtime: Date;
    isDirectory(): boolean;
    isFile(): boolean;
    isSymbolicLink(): boolean;
}

declare function access(path: string, mode?: number): Promise<void>;
declare function accessSync(path: string, mode?: number): void;
declare function unlink(path: string): Promise<void>;
declare function unlinkSync(path: string): void;
declare function rename(oldPath: string, newPath: string): Promise<void>;
declare function renameSync(oldPath: string, newPath: string): void;
declare function stat(path: string): Promise<FileStats>;
declare function statSync(path: string): FileStats;
declare function rm(path: string): Promise<void>;
declare function rmSync(path: string): void;

declare function mkdir(path: string, recursive?: boolean): Promise<void>;
declare function mkdirSync(path: string, recursive?: boolean): void;
declare function readDir(path: string): Promise<string[]>;
declare function readDirSync(path: string): string[];
declare function rmdir(path: string, force?: boolean): Promise<void>;
declare function rmdirSync(path: string, force?: boolean): void;

declare function readFile(path: string): Promise<ArrayBuffer>;
declare function readFileSync(path: string): ArrayBuffer;
declare function writeFile(path: string, data: ArrayBuffer | string): Promise<void>;
declare function writeFileSync(path: string, data: ArrayBuffer | string): void;
declare function appendFile(path: string, data: ArrayBuffer | string): Promise<void>;
declare function appendFileSync(path: string, data: ArrayBuffer | string): void;
declare function copyFile(src: string, dest: string): Promise<void>;
declare function copyFileSync(src: string, dest: string): void;
declare function truncate(path: string, length: number): Promise<void>;
declare function truncateSync(path: string, length: number): void;

export { access, accessSync, appendFile, appendFileSync, copyFile, copyFileSync, mkdir, mkdirSync, readDir, readDirSync, readFile, readFileSync, rename, renameSync, rm, rmSync, rmdir, rmdirSync, stat, statSync, truncate, truncateSync, unlink, unlinkSync, writeFile, writeFileSync };
