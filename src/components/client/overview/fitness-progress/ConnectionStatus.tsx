
interface ConnectionStatusProps {
  progressDataExists: boolean;
  connectedApps: {
    googleFit: boolean;
    appleHealth: boolean;
  };
}

export function ConnectionStatus({ progressDataExists, connectedApps }: ConnectionStatusProps) {
  if (!progressDataExists || (connectedApps.googleFit || connectedApps.appleHealth)) {
    return null;
  }
  
  return (
    <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
      <p className="flex items-center gap-1">
        <span>⚠️</span> Connect a fitness app in Settings to automatically update your progress.
      </p>
    </div>
  );
}
