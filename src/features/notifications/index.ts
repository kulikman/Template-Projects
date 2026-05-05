/**
 * Notifications feature — public API.
 */
export { NotificationsBell } from "./components/notifications-bell";
export { markAsRead, markAllAsRead, sendNotification } from "./api/actions";
export type { Notification, NotificationKind } from "./lib/types";
export { KIND_ICON } from "./lib/types";
