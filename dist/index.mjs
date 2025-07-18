import {
  sqliteCloseDB,
  sqliteCreateIterator,
  sqliteExecute,
  sqliteIteratorNext,
  sqliteIteratorRelease,
  sqliteOpenDB,
  sqlitePrepare,
  sqliteStatementAll,
  sqliteStatementRun
} from "./chunk-P6PQVD6M.mjs";
import {
  bridge_default
} from "./chunk-PRRQDQWO.mjs";

// src/api/route.ts
function navigateTo(data) {
  return bridge_default.callNative({
    api: "navigateTo",
    data
  });
}
function navigateBack(delta = 1) {
  return bridge_default.callNative({
    api: "navigateBack",
    data: {
      delta
    }
  });
}
function redirectTo(data) {
  return bridge_default.callNative({
    api: "redirectTo",
    data
  });
}
function openWebsite(url) {
  return bridge_default.callNative({
    api: "openWebsite",
    data: { url }
  });
}
function openSettings() {
  return bridge_default.callNative({
    api: "openSettings"
  });
}

// src/api/app.ts
function closeApp() {
  return bridge_default.callNative({
    api: "closeApp"
  });
}
function showAppDetail() {
  return bridge_default.callNative({
    api: "showAppDetail"
  });
}
function installApp(url) {
  return bridge_default.callNative({
    api: "installApp",
    data: {
      url
    }
  });
}
function getInstalledAppList() {
  return bridge_default.callNative({
    api: "getInstalledAppList"
  });
}

// src/api/ui.ts
function setNavigationBarTitle(title) {
  return bridge_default.callNative({
    api: "setNavigationBarTitle",
    data: {
      title
    }
  });
}
function setNavigationBarColor(config) {
  return bridge_default.callNative({
    api: "setNavigationBarColor",
    data: config
  });
}
function enablePullDownRefresh() {
  return bridge_default.callNative({
    api: "enablePullDownRefresh"
  });
}
function disablePullDownRefresh() {
  return bridge_default.callNative({
    api: "disablePullDownRefresh"
  });
}
function onPullDownRefresh(callback) {
  window.addEventListener("pulldownrefresh", callback);
}
function startPullDownRefresh() {
  return bridge_default.callNative({
    api: "startPullDownRefresh"
  });
}
function stopPullDownRefresh() {
  return bridge_default.callNative({
    api: "stopPullDownRefresh"
  });
}
function showHUD(req) {
  return bridge_default.callNative({
    api: "showHUD",
    data: req
  });
}
function hideHUD() {
  return bridge_default.callNative({
    api: "hideHUD"
  });
}
function showAlert(config) {
  return bridge_default.callNative({
    api: "showAlert",
    data: config
  });
}
function previewImage(url) {
  return bridge_default.callNative({
    api: "previewImage",
    data: {
      url
    }
  });
}
function previewVideo(url) {
  return bridge_default.callNative({
    api: "previewVideo",
    data: {
      url
    }
  });
}
function showPicker(type, data) {
  let res;
  if ((type === "time" || type === "date") && !data.dateFormat) {
    res = bridge_default.callNative({
      api: "showPicker",
      data: {
        type,
        data: {
          ...data,
          dateFormat: type === "date" ? "yyyy-MM-dd" : "HH:mm:ss"
        }
      }
    });
  } else {
    res = bridge_default.callNative({
      api: "showPicker",
      data: { type, data }
    });
  }
  return res;
}

// src/api/kvstorage.ts
function getKVStorage(key) {
  return bridge_default.callNative({
    api: "getKVStorage",
    data: { key }
  });
}
function setKVStorage(key, value) {
  return bridge_default.callNative({
    api: "setKVStorage",
    data: { key, value }
  });
}
function deleteKVStorage(key) {
  return bridge_default.callNative({
    api: "deleteKVStorage",
    data: { key }
  });
}
function clearKVStorage() {
  return bridge_default.callNative({
    api: "clearKVStorage"
  });
}
function getKVStorageSync(key) {
  return bridge_default.callNativeSync({
    api: "getKVStorageSync",
    data: { key }
  });
}
function setKVStorageSync(key, value) {
  return bridge_default.callNativeSync({
    api: "setKVStorageSync",
    data: { key, value }
  });
}
function deleteKVStorageSync(key) {
  return bridge_default.callNativeSync({
    api: "deleteKVStorageSync",
    data: { key }
  });
}
function clearKVStorageSync() {
  return bridge_default.callNativeSync({
    api: "clearKVStorageSync"
  });
}

// src/api/device.ts
function vibrate(type) {
  return bridge_default.callNative({
    api: "vibrate",
    data: {
      type: type ?? "medium"
    }
  });
}
function getClipboardData() {
  return bridge_default.callNative({
    api: "getClipboardData"
  });
}
function setClipboardData(data) {
  return bridge_default.callNative({
    api: "setClipboardData",
    data: {
      data
    }
  });
}
function scanQRCode() {
  return bridge_default.callNative({ api: "scanQRCode" });
}
function getDeviceInfo() {
  return bridge_default.callNative({ api: "getDeviceInfo" });
}
function getDeviceInfoSync() {
  return bridge_default.callNativeSync({ api: "getDeviceInfoSync" });
}

// src/api/memory-cache.ts
function getMemoryStorage(key) {
  return bridge_default.callNative({
    api: "getMemoryStorage",
    data: { key }
  });
}
function setMemoryStorage(key, value) {
  return bridge_default.callNative({
    api: "setMemoryStorage",
    data: { key, value }
  });
}
function setMemoryStorageIfNotExist(key, value) {
  return bridge_default.callNative({
    api: "setMemoryStorageIfNotExist",
    data: { key, value }
  });
}
function removeMemoryStorage(key) {
  return bridge_default.callNative({
    api: "removeMemoryStorage",
    data: { key }
  });
}
function clearMemoryStorage() {
  return bridge_default.callNative({
    api: "clearMemoryStorage"
  });
}
export {
  clearKVStorage,
  clearKVStorageSync,
  clearMemoryStorage,
  closeApp,
  deleteKVStorage,
  deleteKVStorageSync,
  disablePullDownRefresh,
  enablePullDownRefresh,
  getClipboardData,
  getDeviceInfo,
  getDeviceInfoSync,
  getInstalledAppList,
  getKVStorage,
  getKVStorageSync,
  getMemoryStorage,
  hideHUD,
  installApp,
  navigateBack,
  navigateTo,
  onPullDownRefresh,
  openSettings,
  openWebsite,
  previewImage,
  previewVideo,
  redirectTo,
  removeMemoryStorage,
  scanQRCode,
  setClipboardData,
  setKVStorage,
  setKVStorageSync,
  setMemoryStorage,
  setMemoryStorageIfNotExist,
  setNavigationBarColor,
  setNavigationBarTitle,
  showAlert,
  showAppDetail,
  showHUD,
  showPicker,
  sqliteCloseDB,
  sqliteCreateIterator,
  sqliteExecute,
  sqliteIteratorNext,
  sqliteIteratorRelease,
  sqliteOpenDB,
  sqlitePrepare,
  sqliteStatementAll,
  sqliteStatementRun,
  startPullDownRefresh,
  stopPullDownRefresh,
  vibrate
};
//# sourceMappingURL=index.mjs.map