
import { useState, useEffect } from "react";
import { FitnessAppList } from "./FitnessAppList";
import { DataSyncSettings } from "./DataSyncSettings";

interface FitnessAppIntegrationProps {
  user: { email: string; type: string; name?: string; plan?: string; };
}

export function FitnessAppIntegration({ user }: FitnessAppIntegrationProps) {
  const [googleFitConnected, setGoogleFitConnected] = useState(false);
  const [appleHealthConnected, setAppleHealthConnected] = useState(false);
  const [dataSync, setDataSync] = useState({
    steps: true,
    heartRate: true,
    sleep: true,
    workouts: true,
    bodyComposition: true,
    weight: true
  });

  // Load connection status from localStorage on component mount
  useEffect(() => {
    const storedGoogleFit = localStorage.getItem('googleFitConnected') === 'true';
    const storedAppleHealth = localStorage.getItem('appleHealthConnected') === 'true';
    
    setGoogleFitConnected(storedGoogleFit);
    setAppleHealthConnected(storedAppleHealth);
  }, []);

  // Update localStorage when connection status changes
  useEffect(() => {
    localStorage.setItem('googleFitConnected', googleFitConnected.toString());
    localStorage.setItem('appleHealthConnected', appleHealthConnected.toString());
  }, [googleFitConnected, appleHealthConnected]);

  // Handle toggling data sync options
  const toggleDataSync = (metric: keyof typeof dataSync) => {
    setDataSync({
      ...dataSync,
      [metric]: !dataSync[metric]
    });
  };

  return (
    <div className="space-y-6">
      <FitnessAppList 
        googleFitConnected={googleFitConnected}
        appleHealthConnected={appleHealthConnected}
        setGoogleFitConnected={setGoogleFitConnected}
        setAppleHealthConnected={setAppleHealthConnected}
      />

      {(googleFitConnected || appleHealthConnected) && (
        <DataSyncSettings 
          dataSync={dataSync} 
          toggleDataSync={toggleDataSync} 
          appName={googleFitConnected ? "Google Fit" : (appleHealthConnected ? "Apple Health" : undefined)}
        />
      )}
    </div>
  );
}
