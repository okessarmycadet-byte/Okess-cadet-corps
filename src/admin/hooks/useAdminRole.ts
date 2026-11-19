import { useMemo } from 'react'
import { hasPermission, type AdminPermission } from '../types/permissions'
import type { AdminRole } from '../../types'

export function useAdminRole(role: AdminRole | null) {
  return useMemo(() => ({
    role,
    can: (permission: AdminPermission) => hasPermission(role, permission),
  }), [role])
}
