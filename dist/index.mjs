// src/model/response/index.ts
var MResponseStatusCode = /* @__PURE__ */ ((MResponseStatusCode2) => {
  MResponseStatusCode2[MResponseStatusCode2["SUCCESS"] = 0] = "SUCCESS";
  MResponseStatusCode2[MResponseStatusCode2["FAILED"] = 7] = "FAILED";
  return MResponseStatusCode2;
})(MResponseStatusCode || {});

// src/bridge/index.ts
var jsBridge;
if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.MinipNativeInteraction) {
  const _callNative = window.webkit.messageHandlers.MinipNativeInteraction;
  jsBridge = {
    callNative(req) {
      return _callNative.postMessage(JSON.stringify(req)).then((res) => JSON.parse(res)).then((res) => {
        if (res.code === 0 /* SUCCESS */) {
          return res;
        } else {
          throw new Error(res.msg ?? "Unknown error, res: ");
        }
      });
    },
    callNativeSync(req) {
      const res = prompt(JSON.stringify(req));
      if (res) {
        return JSON.parse(res);
      }
      return {
        code: 7 /* FAILED */,
        msg: "Unknown error"
      };
    }
  };
} else {
  jsBridge = {
    callNative() {
      return new Promise((_, reject) => {
        reject("Cannot find JavaScript Bridge!!!");
      });
    },
    callNativeSync() {
      return {
        code: 7 /* FAILED */,
        msg: "Cannot find JavaScript Bridge!!!"
      };
    }
  };
}
var bridge_default = jsBridge;

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
  return bridge_default.callNative({
    api: "showPicker",
    data: { type, data }
  });
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
      type
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
export {
  MResponseStatusCode,
  clearKVStorage,
  clearKVStorageSync,
  closeApp,
  deleteKVStorage,
  deleteKVStorageSync,
  disablePullDownRefresh,
  enablePullDownRefresh,
  getClipboardData,
  getInstalledAppList,
  getKVStorage,
  getKVStorageSync,
  hideHUD,
  installApp,
  navigateBack,
  navigateTo,
  onPullDownRefresh,
  openWebsite,
  previewImage,
  previewVideo,
  redirectTo,
  setClipboardData,
  setKVStorage,
  setKVStorageSync,
  setNavigationBarColor,
  setNavigationBarTitle,
  showAlert,
  showAppDetail,
  showHUD,
  showPicker,
  startPullDownRefresh,
  stopPullDownRefresh,
  vibrate
};
//# sourceMappingURL=index.mjs.map