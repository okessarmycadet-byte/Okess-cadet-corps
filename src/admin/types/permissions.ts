import type { AdminRole } from '../../types'

export type AdminPermission =
  | 'view_dashboard'
  | 'manage_memories'
  | 'manage_history'
  | 'manage_generations'
  | 'manage_leadership'
  | 'manage_honours'
  | 'manage_events'
  | 'manage_media'
  | 'manage_donations'
  | 'manage_messages'
  | 'manage_users'
  | 'manage_settings'
  | 'view_analytics'
  | 'view_audit_logs'

export const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  super_admin: [
    'view_dashboard','manage_memories','manage_history',
    'manage_generations','manage_leadership','manage_honours',
    'manage_events','manage_media','manage_donations',
    'manage_messages','manage_users','manage_settings',
    'view_analytics','view_audit_logs'
  ],
  administrator: [
    'view_dashboard','manage_memories','manage_history',
    'manage_generations','manage_leadership','manage_honours',
    'manage_events','manage_media','manage_messages',
    'view_analytics','view_audit_logs'
  ],
  editor: [
    'view_dashboard','manage_memories','manage_history',
    'manage_events','manage_generations'
  ],
  media_officer: [
    'view_dashboard','manage_media','manage_events'
  ],
  historian: [
    'view_dashboard','manage_history','manage_memories',
    'manage_generations','manage_leadership'
  ],
  viewer: [
    'view_dashboard','view_analytics'
  ]
}

export function hasPermission(
  role: AdminRole | null | undefined,
  permission: AdminPermission
): boolean {
  if (!role) return false
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}
