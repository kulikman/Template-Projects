/**
 * Notifications feature — public API.
 */
export { NotificationsBell } from "@/features/notifications/components/notifications-bell";
export { markAsRead, markAllAsRead, sendNotification } from "@/features/notifications/api/actions";
export type { Notification, NotificationKind } from "@/features/notifications/lib/types";
export { KIND_ICON } from "@/features/notifications/lib/types";
