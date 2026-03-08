import { 
  LayoutDashboard, 
  Tractor, 
  Sprout, 
  ShoppingCart, 
  BarChart3, 
  Bell, 
  Wallet, 
  Settings,
  Users,
  ShieldAlert,
  CreditCard,
  FileWarning,
  BrainCircuit,
  Activity,
  Map
} from 'lucide-react';
import { UserRole } from '@agriconnect/types';

export interface NavItem {
  name: string;
  href: string;
  icon: any;
  roles: UserRole[];
}

export const NAVIGATION_CONFIG: Record<UserRole, NavItem[]> = {
  farmer: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['farmer'] },
    { name: 'My Farms', href: '/farms', icon: Tractor, roles: ['farmer'] },
    { name: 'Crop Cycle', href: '/crops', icon: Sprout, roles: ['farmer'] },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart, roles: ['farmer'] },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['farmer'] },
    { name: 'Advisory', href: '/advisory', icon: Bell, roles: ['farmer'] },
    { name: 'Finance', href: '/finance', icon: Wallet, roles: ['farmer'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['farmer'] },
  ],
  buyer: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['buyer'] },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart, roles: ['buyer'] },
    { name: 'Orders', href: '/orders', icon: Wallet, roles: ['buyer'] },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['buyer'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['buyer'] },
  ],
  agro: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['agro'] },
    { name: 'Farmers', href: '/farmers', icon: Users, roles: ['agro'] },
    { name: 'Advisory Queue', href: '/advisory-queue', icon: Bell, roles: ['agro'] },
    { name: 'Risk Map', href: '/risk-map', icon: Map, roles: ['agro'] },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['agro'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['agro'] },
  ],
  admin: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'super_admin'] },
    { name: 'Users', href: '/admin/users', icon: Users, roles: ['admin', 'super_admin'] },
    { name: 'Moderation', href: '/admin/moderation', icon: ShieldAlert, roles: ['admin', 'super_admin'] },
    { name: 'Transactions', href: '/admin/transactions', icon: CreditCard, roles: ['admin', 'super_admin'] },
    { name: 'Disputes', href: '/admin/disputes', icon: FileWarning, roles: ['admin', 'super_admin'] },
    { name: 'AI Monitoring', href: '/admin/ai-monitoring', icon: BrainCircuit, roles: ['admin', 'super_admin'] },
    { name: 'System Health', href: '/admin/system-health', icon: Activity, roles: ['admin', 'super_admin'] },
  ],
  super_admin: [], // Inherits from admin
};

// Add super_admin specific items or combine
NAVIGATION_CONFIG.super_admin = [...NAVIGATION_CONFIG.admin];
