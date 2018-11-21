type NotificationType = "success" | "info" | "warning" | "error";

export function showNotificationAction(payload: {
  notificationType: NotificationType;
  message: string;
  description: string;
}): void;

export function routeChangeAction(url: string): void;

export const setNavcolorOverrideAction = any;
