import React from 'react';
import { Bell, Briefcase, Zap, AlertTriangle, ShieldAlert, CheckCircle } from 'lucide-react';
import { Card, Badge, cn } from '@agriconnect/ui';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'advisory' | 'marketplace' | 'system' | 'alert';
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Advisory: New Pest Alert',
    description: 'Bollworm activity detected in nearby Wheat plots. Check advisory page.',
    time: '2m ago',
    type: 'advisory',
    read: false,
  },
  {
    id: '2',
    title: 'Marketplace Update',
    description: 'New bid received for your Wheat (PBW-343) listing.',
    time: '1h ago',
    type: 'marketplace',
    read: false,
  },
  {
    id: '3',
    title: 'System Update',
    description: 'Platform maintenance scheduled for Sunday, 02:00 AM.',
    time: '5h ago',
    type: 'system',
    read: true,
  },
];

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-80 md:w-96 z-50 overflow-hidden shadow-2xl rounded-2xl border border-border bg-card/80 backdrop-blur-xl"
          >
            <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Notifications</h3>
              <Badge variant="destructive" size="sm">2 New</Badge>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {MOCK_NOTIFICATIONS.length > 0 ? (
                MOCK_NOTIFICATIONS.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={cn(
                      "p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer group flex gap-3",
                      !notif.read && "bg-primary/5"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-xl h-fit",
                      notif.type === 'advisory' ? "bg-yellow-500/10 text-yellow-600" :
                      notif.type === 'alert' ? "bg-red-500/10 text-red-600" :
                      notif.type === 'marketplace' ? "bg-green-500/10 text-green-600" :
                      "bg-blue-500/10 text-blue-600"
                    )}>
                      {notif.type === 'advisory' && <Zap className="w-4 h-4" />}
                      {notif.type === 'marketplace' && <Briefcase className="w-4 h-4" />}
                      {notif.type === 'alert' && <ShieldAlert className="w-4 h-4" />}
                      {notif.type === 'system' && <Bell className="w-4 h-4" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className="text-sm font-bold text-foreground truncate pr-2">{notif.title}</p>
                        <span className="text-[10px] text-muted-foreground font-medium shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{notif.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-muted-foreground">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p className="text-sm font-medium">All caught up!</p>
                </div>
              )}
            </div>

            <div className="p-3 bg-muted/30 text-center">
              <button className="text-xs font-bold text-primary hover:underline" onClick={onClose}>View all activity history</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
