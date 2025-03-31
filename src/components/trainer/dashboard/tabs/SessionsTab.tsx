
import { useState } from "react";
import { TrainerSessionItem } from "@/types/sessions";
import { SessionsTabContent } from "./sessions/SessionsTabContent";

interface SessionsTabProps {
  upcomingSessions?: TrainerSessionItem[];
}

export function SessionsTab({ upcomingSessions = [] }: SessionsTabProps) {
  // Use the provided sessions directly without any additional logic
  // This ensures consistency with sessions shown in the overview area
  
  return <SessionsTabContent upcomingSessions={upcomingSessions} />;
}
