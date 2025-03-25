
export function NotificationsSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-sm text-muted-foreground">Receive emails about your account</p>
          </div>
          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Session Reminders</h3>
            <p className="text-sm text-muted-foreground">Get reminded about upcoming sessions</p>
          </div>
          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Workout Notifications</h3>
            <p className="text-sm text-muted-foreground">Daily workout reminders</p>
          </div>
          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Marketing</h3>
            <p className="text-sm text-muted-foreground">Receive promotions and news</p>
          </div>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>
      </div>
    </div>
  );
}
