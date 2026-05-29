import { createContext, useContext, ReactNode } from "react";

export type TrainerPlan = "basic" | "essential" | "pro";

const TrainerPlanContext = createContext<TrainerPlan>("pro");

export function TrainerPlanProvider({
  plan,
  children,
}: {
  plan: TrainerPlan;
  children: ReactNode;
}) {
  return (
    <TrainerPlanContext.Provider value={plan}>
      {children}
    </TrainerPlanContext.Provider>
  );
}

export function useTrainerPlan(): TrainerPlan {
  return useContext(TrainerPlanContext);
}
