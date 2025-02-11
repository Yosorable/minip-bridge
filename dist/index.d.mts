type HUDType = "success" | "error" | "progress" | "banner";
/**
 * @param title works only in banner type,
 * otherwise it will be concatenated with the message parameter using "\n"
 * @param delay ms, doesn't work in banner and progress type
 * @param interaction enable or disable hud background mask, default value is true (hide mask),
 * doesn't work in banner type
 */
interface ShowHUDRequest {
    type: HUDType;
    title?: string;
    message?: string;
    delay?: number;
    interaction?: boolean;
}
/**
 * @param title use key if not set
 * @param key callback arg
 */
interface AlertAction {
    title?: string;
    style?: "cancel" | "destructive";
    key: string;
}
interface AlertConfig {
    title?: string;
    message?: string;
    preferredStyle?: "alert" | "actionSheet";
    actions: AlertAction[];
}

interface MRequestBase {
    /**
     * Api name.
     */
    api: string;
}
interface MRequestWithData<T> extends MRequestBase {
    data?: T;
}
type MRequest<T> = MRequestBase | MRequestWithData<T>;

declare enum MResponseStatusCode {
    SUCCESS = 0,
    FAILED = 7
}
interface MResponse {
    /**
     * Integer, 0 for succeeded, other for failed.
     * Auto reject in promise when failed.
     */
    code: MResponseStatusCode;
    /**
     * Error msg or other info.
     */
    msg?: string;
}
interface MResponseWithData<T> extends MResponse {
    data: T;
}

interface AppInfo {
    name: string;
    appId: string;
    author?: string;
    website?: string;
    icon?: string;
    version?: string;
    description?: string;
    homepage: string;
    title?: string;
    pages?: PageConfig[];
    tabs?: TabConfig[];
    navigationBarStatus?: string;
    colorScheme?: string;
    backgroundColor?: string;
    navigationBarColor?: string;
    tintColor?: string;
    webServerEnabled?: boolean;
    landscape?: boolean;
    files?: File[];
}
interface PageConfig {
    path: string;
    title?: string;
    scrollable?: boolean;
    backgroundColor?: string;
    navigationBarColor?: string;
}
interface TabConfig {
    path: string;
    title: string;
    systemImage: string;
}
interface File {
    name: string;
    path: string;
    hash: string;
}

declare function navigateTo(data: {
    page: string;
    title?: string;
}): Promise<MResponse>;
declare function navigateBack(delta?: number): Promise<MResponse>;
declare function redirectTo(data: {
    page: string;
    title?: string;
}): Promise<MResponse>;
declare function openWebsite(url: string): Promise<MResponse>;

declare function closeApp(): Promise<MResponse>;
declare function showAppDetail(): Promise<MResponse>;
declare function installApp(url: string): Promise<MResponse>;
declare function getInstalledAppList(): Promise<MResponseWithData<AppInfo[]>>;

declare function setNavigationBarTitle(title: string): Promise<MResponse>;
declare function setNavigationBarColor(config: {
    foregroundColor: string;
    backgroundColor: string;
}): Promise<MResponse>;
declare function enablePullDownRefresh(): Promise<MResponse>;
declare function disablePullDownRefresh(): Promise<MResponse>;
declare function onPullDownRefresh(callback: (e: Event) => any): void;
declare function startPullDownRefresh(): Promise<MResponse>;
declare function stopPullDownRefresh(): Promise<MResponse>;
declare function showHUD(req: ShowHUDRequest): Promise<MResponse>;
declare function hideHUD(): Promise<MResponse>;
declare function showAlert(config: AlertConfig): Promise<MResponseWithData<string>>;
declare function previewImage(url: string): Promise<MResponse>;
declare function previewVideo(url: string): Promise<MResponse>;

declare function getKVStorage(key: string): Promise<MResponseWithData<string>>;
declare function setKVStorage(key: string, value: string): Promise<MResponse>;
declare function deleteKVStorage(key: string): Promise<MResponse>;
declare function clearKVStorage(): Promise<MResponse>;
declare function getKVStorageSync(key: string): MResponseWithData<string>;
declare function setKVStorageSync(key: string, value: string): MResponse;
declare function deleteKVStorageSync(key: string): MResponse;
declare function clearKVStorageSync(): MResponse;

/**
 *
 * @param type medium as default
 */
declare function vibrate(type?: "light" | "medium" | "heavy"): Promise<MResponse>;
declare function getClipboardData(): Promise<MResponseWithData<string>>;
declare function setClipboardData(data: string): Promise<MResponseWithData<string>>;

interface Callable {
    postMessage: (data: string) => Promise<string>;
}
declare global {
    interface Window {
        webkit?: {
            messageHandlers?: {
                MinipNativeInteraction?: Callable;
            };
        };
    }
}

export { type AlertAction, type AlertConfig, type AppInfo, type HUDType, type MRequest, type MRequestBase, type MRequestWithData, type MResponse, MResponseStatusCode, type MResponseWithData, type ShowHUDRequest, clearKVStorage, clearKVStorageSync, closeApp, deleteKVStorage, deleteKVStorageSync, disablePullDownRefresh, enablePullDownRefresh, getClipboardData, getInstalledAppList, getKVStorage, getKVStorageSync, hideHUD, installApp, navigateBack, navigateTo, onPullDownRefresh, openWebsite, previewImage, previewVideo, redirectTo, setClipboardData, setKVStorage, setKVStorageSync, setNavigationBarColor, setNavigationBarTitle, showAlert, showAppDetail, showHUD, startPullDownRefresh, stopPullDownRefresh, vibrate };
