
import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { NotificationCenter } from './NotificationCenter';
import { useNotifications } from '@/hooks/useNotifications';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const [contactPending, setContactPending] = useState(0);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('trainer-contact-requests');
        const all = raw ? JSON.parse(raw) : [];
        setContactPending(
          Array.isArray(all)
            ? all.filter((r: { status?: string }) => r.status === 'pending').length
            : 0,
        );
      } catch {
        setContactPending(0);
      }
    };
    load();
    window.addEventListener('trainer-contact-requests-changed', load);
    return () =>
      window.removeEventListener('trainer-contact-requests-changed', load);
  }, []);

  const totalCount = unreadCount + contactPending;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {totalCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalCount > 9 ? '9+' : totalCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <NotificationCenter onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
