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
interface SingleColumnPickerConfig {
    index: number;
    column: string[];
}
interface MultipleColumnsPickerConfig {
    index: number[];
    columns: string[][];
}
/**
 * @param dateFormat datetime format string, like: "yyyy-MM-dd", "HH:mm:ss"
 */
interface DateAndTimePickerConfig {
    start?: string;
    end?: string;
    value?: string;
    dateFormat?: string;
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

interface ShowAlertData {
    action: string;
    inputs: Record<string, string>;
}

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
    isSuccess(): boolean;
}
interface MResponseWithData<T> extends MResponse {
    data: T;
    hasData(): boolean;
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

interface DeviceInfo {
    language: string;
    model: string;
    system: string;
    screen: ScreenInfo;
    safeAreaInfo: SafeAreaInfo;
}
interface ScreenInfo {
    width: number;
    height: number;
}
interface SafeAreaInfo {
    left: number;
    right: number;
    top: number;
    bottom: number;
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
declare function openSettings(): Promise<MResponse>;

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
declare function showAlert(config: AlertConfig): Promise<MResponseWithData<ShowAlertData>>;
declare function previewImage(url: string): Promise<MResponse>;
declare function previewVideo(url: string): Promise<MResponse>;
declare function showPicker(type: "singleColumn", data: SingleColumnPickerConfig): Promise<MResponseWithData<number | null | undefined>>;
declare function showPicker(type: "multipleColumns", data: MultipleColumnsPickerConfig): Promise<MResponseWithData<number[] | null | undefined>>;
declare function showPicker(type: "date" | "time", data: DateAndTimePickerConfig): Promise<MResponseWithData<string | null | undefined>>;

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
declare function scanQRCode(): Promise<MResponseWithData<string | undefined | null>>;
declare function getDeviceInfo(): Promise<MResponseWithData<DeviceInfo>>;
declare function getDeviceInfoSync(): MResponseWithData<DeviceInfo>;

declare function sqliteOpenDB(path: string): Promise<MResponseWithData<{
    dbKey: number;
}>>;
declare function sqliteCloseDB(dbKey: number): Promise<MResponse>;
declare function sqlitePrepare(dbKey: number, sql: string): Promise<MResponseWithData<{
    stmtKey: number;
    reader: boolean;
}>>;
declare function sqliteStatementAll(dbKey: number, stmtKey: number, parameters: ReadonlyArray<unknown>): Promise<MResponseWithData<unknown[]>>;
declare function sqliteStatementRun(dbKey: number, stmtKey: number, parameters: ReadonlyArray<unknown>): Promise<MResponseWithData<{
    changes: number | bigint;
    lastInsertRowid: number | bigint;
}>>;
declare function sqliteExecute(dbKey: number, sql: string, parameters: ReadonlyArray<unknown>): Promise<MResponseWithData<{
    reader: boolean;
    runRes?: {
        changes: number | bigint;
        lastInsertRowid: number | bigint;
    };
    entityData?: unknown[];
}>>;
declare function sqliteCreateIterator(dbKey: number, stmtKey: number, parameters: ReadonlyArray<unknown>): Promise<MResponse>;
declare function sqliteIteratorNext(dbKey: number, stmtKey: number): Promise<MResponseWithData<unknown | undefined>>;
declare function sqliteIteratorRelease(dbKey: number, stmtKey: number): Promise<MResponse>;

declare function getMemoryStorage(key: string): Promise<MResponseWithData<string>>;
declare function setMemoryStorage(key: string, value: string): Promise<MResponse>;
declare function setMemoryStorageIfNotExist(key: string, value: string): Promise<MResponseWithData<boolean>>;
declare function removeMemoryStorage(key: string): Promise<MResponse>;
declare function clearMemoryStorage(): Promise<MResponse>;

interface WebKitCallable {
    postMessage: (data: string) => Promise<string>;
}
declare global {
    interface Window {
        webkit?: {
            messageHandlers?: {
                MinipNativeInteraction?: WebKitCallable;
            };
        };
    }
}

export { type AlertAction, type AlertConfig, type AppInfo, type DateAndTimePickerConfig, type DeviceInfo, type HUDType, type MRequest, type MRequestBase, type MRequestWithData, type MResponse, MResponseStatusCode, type MResponseWithData, type MultipleColumnsPickerConfig, type ShowAlertData, type ShowHUDRequest, type SingleColumnPickerConfig, clearKVStorage, clearKVStorageSync, clearMemoryStorage, closeApp, deleteKVStorage, deleteKVStorageSync, disablePullDownRefresh, enablePullDownRefresh, getClipboardData, getDeviceInfo, getDeviceInfoSync, getInstalledAppList, getKVStorage, getKVStorageSync, getMemoryStorage, hideHUD, installApp, navigateBack, navigateTo, onPullDownRefresh, openSettings, openWebsite, previewImage, previewVideo, redirectTo, removeMemoryStorage, scanQRCode, setClipboardData, setKVStorage, setKVStorageSync, setMemoryStorage, setMemoryStorageIfNotExist, setNavigationBarColor, setNavigationBarTitle, showAlert, showAppDetail, showHUD, showPicker, sqliteCloseDB, sqliteCreateIterator, sqliteExecute, sqliteIteratorNext, sqliteIteratorRelease, sqliteOpenDB, sqlitePrepare, sqliteStatementAll, sqliteStatementRun, startPullDownRefresh, stopPullDownRefresh, vibrate };
