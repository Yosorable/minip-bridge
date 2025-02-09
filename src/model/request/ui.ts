export type HUDType = "success" | "error" | "progress" | "label";
export interface ShowHUDRequest {
  type?: HUDType;
  title?: string;
  subTitle?: string;
  /**
   * ms
   */
  delay?: number;
}

/**
 * @param title use key if not set
 * @param key callback arg
 */
export interface AlertAction {
  title?: string;
  style?: "cancel" | "destructive";
  key: string;
}
export interface AlertConfig {
  title?: string;
  message?: string;
  preferredStyle?: "alert" | "actionSheet";
  actions: AlertAction[];
}
